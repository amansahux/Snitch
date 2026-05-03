import orderModel from "../models/order.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import cartModel from "../models/cart.model.js";
import addressModel from "../models/address.model.js";
import { getCartDetails } from "../dao/cart.dao.js";
import { createOrder } from "../services/payment.service.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import config from "../config/config.js";

const resolveUserId = (req) => {
  const userId = req?.user?.id || req?.user?._id || req?.user?.userId;
  if (!userId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }
  return userId.toString();
};

export const createOrderController = asyncHandler(async (req, res, next) => {
  const userId = resolveUserId(req);
  const requestBody = req.body || {};
  const {
    paymentStatus = "pending",
    orderStatus = "pending",
    isDelivered = false,
    deliveredAt,
    isCancelled = false,
    cancelledAt,
    shippingAddress: shippingAddressId,
  } = requestBody;

  const cartData = await getCartDetails(userId);
  const cart = cartData[0];
  const shippingAddress = shippingAddressId
    ? await addressModel.findOne({ _id: shippingAddressId, user: userId })
    : await addressModel.findOne({ user: userId, isDefault: true });

  if (!cart || !cart.items || cart.items.length === 0) {
    const error = new Error("Cart is empty");
    error.statusCode = 400;
    return next(error);
  }
  if (!shippingAddress) {
    const error = new Error("Shipping address not found");
    error.statusCode = 404;
    return next(error);
  }

  const razorpayOrder = await createOrder({
    amount: cart.totalSelling,
    currency: cart.currency || "INR",
  });

  const productOrder = await orderModel.create({
    user: userId,
    items: cart.items.map((item) => ({
      product: item.productId._id,
      variant: item.variantId._id,
      quantity: item.quantity,
      price: item.variantId.price.mrp,
      discountedPrice: item.variantId.price.selling,
      size: item.variantId.size,
      color: item.variantId.color,
      images: item.variantId.images,
    })),
    totalAmount: cart.totalSelling,
    shippingAddress: shippingAddress._id,
    paymentStatus,
    orderStatus,
    isDelivered,
    deliveredAt,
    isCancelled,
    cancelledAt,
    razorpay: {
      orderId: razorpayOrder.id,
    },
  });

  return res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: {
      order: productOrder,
      razorpayOrder,
    },
    error: null,
  });
});
export const verifyOrderPayment = asyncHandler(async (req, res, next) => {
  const userId = resolveUserId(req);
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    paymentStatus: requestedPaymentStatus,
  } = req.body || {};

  if (!razorpay_order_id) {
    const error = new Error("razorpay_order_id is required");
    error.statusCode = 400;
    return next(error);
  }

  const order = await orderModel.findOne({
    user: userId,
    "razorpay.orderId": razorpay_order_id,
  });

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  if (order.paymentStatus === "paid") {
    return res.status(200).json({
      success: true,
      message: "Payment already verified",
      data: order,
      error: null,
    });
  }

  if (requestedPaymentStatus === "failed") {
    order.paymentStatus = "failed";
    order.orderStatus = "cancelled";
    order.cancelledAt = new Date();
    order.isCancelled = true;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment marked as failed",
      data: order,
      error: null,
    });
  }

  const isPaymentValid = validatePaymentVerification(
    {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
    },
    razorpay_signature,
    config.RAZORPAY_KEY_SECRET,
  );
  if (!isPaymentValid) {
    order.paymentStatus = "failed";
    order.orderStatus = "cancelled";
    order.cancelledAt = new Date();
    order.isCancelled = true;
    await order.save();

    return res.status(400).json({
      success: false,
      message: "Invalid payment",
      data: order,
      error: null,
    });
  }

  order.paymentStatus = "paid";
  order.orderStatus = "placed";
  order.razorpay.paymentId = razorpay_payment_id;
  order.razorpay.signature = razorpay_signature;
  await order.save();

  await cartModel.updateOne({ user: userId }, { $set: { items: [] } });

  return res.status(200).json({
    success: true,
    message: "Payment verified successfully",
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
