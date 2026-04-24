import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import cartModel from "../models/cart.model.js";
import VariantModel from "../models/varient.model.js";

const cartPopulateOptions = [
  { path: "items.productId", select: "title category coverImage" },
  { path: "items.variantId", select: "sku size color fit material price stock images" },
];

const ensureCartForUser = async (userId) => {
  return await cartModel.findOneAndUpdate(
    { userId },
    { $setOnInsert: { userId, items: [] } },
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    },
  );
};

export const getMyCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const cart = await ensureCartForUser(userId);
  await cart.populate(cartPopulateOptions);

  return res.status(200).json({
    success: true,
    message: "Cart fetched successfully",
    data: cart,
    error: null,
  });
});

export const addItemToCart = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { productId, variantId, quantity = 1 } = req.body;

  const variant = await VariantModel.findById(variantId).select("product stock");
  if (!variant) {
    const error = new Error("Variant not found");
    error.statusCode = 404;
    return next(error);
  }

  if (variant.product.toString() !== productId) {
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
  const userId = req.user.id;
  const { itemId } = req.params;
  const { quantity } = req.body;

  const cart = await cartModel.findOne({ userId });
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
  const userId = req.user.id;
  const { itemId } = req.params;

  const cart = await cartModel.findOne({ userId });
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
  const userId = req.user.id;
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
