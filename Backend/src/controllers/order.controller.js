import orderModel from "../models/order.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import cartModel from "../models/cart.model.js";

const resolveUserId = (req) => {
  const userId = req?.user?.id || req?.user?._id || req?.user?.userId;
  if (!userId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }
  return userId.toString();
};

export const createOrder = asyncHandler(async (req, res, next) => {
  const userId = resolveUserId(req);
  const cart = await cartModel.findOne({ $or: [{ user: userId }, { userId }] });
  const address = await addressModel.findOne({
    user: userId,
    isDefault: true,
  });

  if (!cart) {
    const error = new Error("Cart not found");
    error.statusCode = 404;
    return next(error);
  }

  const { items, totalAmount, shippingAddress, paymentStatus, razorpay } =
    req.body;

  if (!items || items.length === 0) {
    const error = new Error("No order items provided");
    error.statusCode = 400;
    return next(error);
  }

  const order = await orderModel.create({
    user: userId,
    items,
    totalAmount,
    shippingAddress,
    paymentStatus,
    razorpay,
  });

  // Clear the user's cart after successfully creating an order

  if (cart) {
    cart.items = [];
    await cart.save();
  }

  return res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: order,
    error: null,
  });
});

export const getUserOrders = asyncHandler(async (req, res, next) => {
  const userId = resolveUserId(req);

  const orders = await orderModel
    .find({ user: userId })
    .populate("items.product", "title coverImage category")
    .populate("items.variant", "color size images")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: orders,
    error: null,
  });
});

export const getOrderById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await orderModel
    .findById(id)
    .populate("user", "name email")
    .populate("items.product", "title coverImage category")
    .populate("items.variant", "color size images")
    .populate("shippingAddress");

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  const userId = resolveUserId(req);
  if (order.user._id.toString() !== userId && req.user?.role !== "admin") {
    const error = new Error("Not authorized to view this order");
    error.statusCode = 403;
    return next(error);
  }

  return res.status(200).json({
    success: true,
    message: "Order fetched successfully",
    data: order,
    error: null,
  });
});

export const updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  const order = await orderModel.findById(id);

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  order.orderStatus = orderStatus;

  if (orderStatus === "delivered") {
    order.isDelivered = true;
    order.deliveredAt = new Date();
  } else if (orderStatus === "cancelled") {
    order.isCancelled = true;
    order.cancelledAt = new Date();
  }

  await order.save();

  return res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: order,
    error: null,
  });
});
