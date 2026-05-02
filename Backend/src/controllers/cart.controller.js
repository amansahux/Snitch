import mongoose from "mongoose";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import cartModel from "../models/cart.model.js";
import VariantModel from "../models/varient.model.js";
import { createOrder } from "../services/payment.service.js";
import { getCartDetails } from "../dao/cart.dao.js";

const cartPopulateOptions = [
  { path: "items.productId", select: "title category coverImage" },
  {
    path: "items.variantId",
    select: "sku size color fit material price stock images",
  },
];

const resolveUserId = (req) => {
  const userId = req?.user?.id || req?.user?._id || req?.user?.userId;
  if (!userId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }
  return userId.toString();
};

const cartUserQuery = (userId) => ({
  $or: [{ user: userId }, { userId }],
});

const ensureCartForUser = async (userId) => {
  try {
    return await cartModel.findOneAndUpdate(
      cartUserQuery(userId),
      { $setOnInsert: { user: userId, userId, items: [] } },
      {
        returnDocument: "after",
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      },
    );
  } catch (error) {
    // Handles concurrent upserts: if another request inserted first, fetch existing cart.
    if (error?.code === 11000) {
      const existingCart = await cartModel.findOne(cartUserQuery(userId));
      if (existingCart) return existingCart;
    }
    throw error;
  }
};
export const getMyCart = asyncHandler(async (req, res) => {
  const userId = resolveUserId(req);

  // Ensure cart exists
  await ensureCartForUser(userId);

  let cartData = await getCartDetails(userId);

  const cart =
    cartData.length > 0
      ? cartData[0]
      : { items: [], totalSelling: 0, totalMrp: 0, totalDiscount: 0 };

  return res.status(200).json({
    success: true,
    message: "Cart fetched successfully",
    data: cart,
    error: null,
  });
});

export const addItemToCart = asyncHandler(async (req, res, next) => {
  const userId = resolveUserId(req);
  const { productId, variantId, quantity = 1 } = req.body;

  const variant =
    await VariantModel.findById(variantId).select("product stock");
  if (!variant) {
    const error = new Error("Variant not found");
    error.statusCode = 404;
    return next(error);
  }

  if (variant.product.toString() !== String(productId)) {
    const error = new Error("Variant does not belong to the provided product");
    error.statusCode = 400;
    return next(error);
  }

  const cart = await ensureCartForUser(userId);

  const existingItem = cart.items.find(
    (item) => item.variantId.toString() === variantId,
  );

  const nextQuantity = existingItem
    ? existingItem.quantity + quantity
    : quantity;

  if (nextQuantity > variant.stock) {
    const error = new Error("Requested quantity exceeds available stock");
    error.statusCode = 400;
    return next(error);
  }

  if (existingItem) {
    existingItem.quantity = nextQuantity;
  } else {
    cart.items.push({ productId, variantId, quantity });
  }

  await cart.save();
  await cart.populate(cartPopulateOptions);

  return res.status(200).json({
    success: true,
    message: "Item added to cart successfully",
    data: cart,
    error: null,
  });
});

export const updateCartItem = asyncHandler(async (req, res, next) => {
  const userId = resolveUserId(req);
  const { itemId } = req.params;
  const { quantity } = req.body;

  const cart = await cartModel.findOne(cartUserQuery(userId));
  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    return next(error);
  }

  const item = cart.items.id(itemId);
  if (!item) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;
    return next(error);
  }

  const variant = await VariantModel.findById(item.variantId).select("stock");
  if (!variant) {
    const error = new Error("Variant not found for this cart item");
    error.statusCode = 404;
    return next(error);
  }

  if (quantity > variant.stock) {
    const error = new Error("Requested quantity exceeds available stock");
    error.statusCode = 400;
    return next(error);
  }

  item.quantity = quantity;
  await cart.save();
  await cart.populate(cartPopulateOptions);

  return res.status(200).json({
    success: true,
    message: "Cart item updated successfully",
    data: cart,
    error: null,
  });
});

export const removeCartItem = asyncHandler(async (req, res, next) => {
  const userId = resolveUserId(req);
  const { itemId } = req.params;

  const cart = await cartModel.findOne(cartUserQuery(userId));
  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    return next(error);
  }

  const item = cart.items.id(itemId);
  if (!item) {
    const error = new Error("Cart item not found");
    error.statusCode = 404;
    return next(error);
  }

  item.deleteOne();
  await cart.save();
  await cart.populate(cartPopulateOptions);

  return res.status(200).json({
    success: true,
    message: "Cart item removed successfully",
    data: cart,
    error: null,
  });
});

export const clearCart = asyncHandler(async (req, res) => {
  const userId = resolveUserId(req);
  const cart = await ensureCartForUser(userId);

  cart.items = [];
  await cart.save();

  return res.status(200).json({
    success: true,
    message: "Cart cleared successfully",
    data: cart,
    error: null,
  });
});

export const createCartPaymentOrder = asyncHandler(async (req, res) => {
  const userId = resolveUserId(req);
  const cartData = await getCartDetails(userId);
  const cart =
    cartData.length > 0
      ? cartData[0]
      : { items: [], totalSelling: 0, totalMrp: 0, totalDiscount: 0 };

  const order = await createOrder({
    amount: cart.totalSelling,
    currency: cart?.currency || "INR",
  });
  return res.status(200).json({
    success: true,
    message: "Order created successfully",
    data: order,
    error: null,
  });
});
