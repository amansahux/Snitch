import orderModel from "../models/order.model.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import cartModel from "../models/cart.model.js";
import addressModel from "../models/address.model.js";
import { getCartDetails } from "../dao/cart.dao.js";
import { createOrder } from "../services/payment.service.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import config from "../config/config.js";
import VariantModel from "../models/varient.model.js";
import productModel from "../models/product.model.js";
import { sendEmail } from "../services/mail.service.js";

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

  const hasOwnProduct = cart.items.some(
    (item) => item.productId.seller.toString() === userId,
  );

  if (hasOwnProduct) {
    const error = new Error("You cannot purchase your own product");
    error.statusCode = 403;
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
  const orderItemsHtml = cart.items
    .map(
      (item) => `
    <div style="display: flex; align-items: center; padding: 20px 0; border-bottom: 1px solid #F3EEE8;">
      <img src="${item.variantId.images?.[0]?.url || "https://placehold.co/100x130?text=Product"}" alt="${item.productId.title}" style="width: 70px; height: 95px; object-fit: cover; border-radius: 12px; margin-right: 25px; border: 1px solid #F3EEE8;">
      <div style="flex: 1;">
        <h4 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 15px; color: #1B1C1A; font-weight: 700;">${item.productId.title}</h4>
        <p style="margin: 6px 0 0; font-family: 'Inter', sans-serif; font-size: 11px; color: #7A6E63; text-transform: uppercase; letter-spacing: 1px;">Size: ${item.variantId.size} | Qty: ${item.quantity}</p>
        <p style="margin: 8px 0 0; font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: #1B1C1A;">₹${item.variantId.price.selling.toLocaleString("en-IN")}</p>
      </div>
    </div>
  `,
    )
    .join("");

  const subject = `The Snitch Manifest: Order #SN-${razorpayOrder.id.slice(-6).toUpperCase()} Confirmed`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
    </head>
    <body style="margin: 0; padding: 0; background-color: #FBF9F6; font-family: 'Inter', sans-serif; color: #1B1C1A; -webkit-font-smoothing: antialiased;">
      <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #FBF9F6;">
        <tr>
          <td align="center" style="padding: 50px 20px;">
            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 40px; overflow: hidden; box-shadow: 0 40px 80px rgba(27,28,26,0.05);">
              <!-- Brand Header -->
              <tr>
                <td align="center" style="padding: 50px 0; border-bottom: 1px solid #F3EEE8;">
                  <h1 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 32px; letter-spacing: 8px; text-transform: uppercase; color: #1B1C1A;">SNITCH</h1>
                  <div style="width: 40px; h-px; background-color: #C9A96E; margin: 15px auto;"></div>
                  <p style="margin: 0; font-size: 10px; letter-spacing: 4px; color: #C9A96E; font-weight: 700; text-transform: uppercase;">Atelier Edition</p>
                </td>
              </tr>
              
              <!-- Content Body -->
              <tr>
                <td style="padding: 60px 50px;">
                  <h2 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 36px; line-height: 1.2; color: #1B1C1A;">Your manifest is <br/><span style="color: #C9A96E; font-style: italic;">officially confirmed.</span></h2>
                  <p style="margin: 25px 0 0; font-size: 15px; line-height: 1.8; color: #7A6E63; font-weight: 400;">
                    Greetings from the Atelier. We've received your selection and our curators are now preparing your order for a seamless delivery. Welcome to the elite circle of Snitch.
                  </p>
                  
                  <!-- Order Summary Box -->
                  <div style="margin-top: 50px; padding: 35px; background-color: #FBF9F6; border-radius: 30px; border: 1px solid #F3EEE8;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <p style="margin: 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #7A6E63; font-weight: 700;">Reference No.</p>
                          <p style="margin: 8px 0 0; font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #1B1C1A;">#SN-${razorpayOrder.id.slice(-8).toUpperCase()}</p>
                        </td>
                        <td align="right">
                          <p style="margin: 0; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #7A6E63; font-weight: 700;">Amount Secured</p>
                          <p style="margin: 8px 0 0; font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #C9A96E;">₹${cart.totalSelling.toLocaleString("en-IN")}</p>
                        </td>
                      </tr>
                    </table>
                  </div>
                  
                  <!-- Items Display -->
                  <div style="margin-top: 60px;">
                    <h3 style="margin: 0 0 30px; font-family: 'Playfair Display', serif; font-size: 22px; color: #1B1C1A;">Your Curated Selection</h3>
                    ${orderItemsHtml}
                  </div>
                  
                  <!-- Action Button -->
                  <div style="margin-top: 60px; text-align: center;">
                    <a href="https://snitch.co.in/profile/orders" style="display: inline-block; padding: 22px 50px; background-color: #1B1C1A; color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; box-shadow: 0 20px 40px rgba(27,28,26,0.15);">View Live Status</a>
                  </div>
                </td>
              </tr>
              
              <!-- Footer Section -->
              <tr>
                <td style="padding: 60px 50px; background-color: #1B1C1A; color: #ffffff; text-align: center;">
                  <p style="margin: 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #C9A96E; font-weight: 700;">The Heritage of Quality</p>
                  <p style="margin: 15px 0 0; font-size: 13px; line-height: 1.6; opacity: 0.7; font-weight: 300; max-width: 400px; margin-left: auto; margin-right: auto;">
                    Every Snitch piece is a testament to contemporary design and timeless craftsmanship. Thank you for your continued trust.
                  </p>
                  <div style="margin-top: 40px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 40px;">
                    <p style="margin: 0; font-size: 10px; opacity: 0.4; letter-spacing: 1px;">© 2024 SNITCH ATELIER. ALL RIGHTS RESERVED.</p>
                  </div>
                </td>
              </tr>
            </table>
            
            <!-- Support Link -->
            <p style="margin-top: 30px; font-size: 12px; color: #7A6E63; font-weight: 500;">
              Need assistance? <a href="mailto:support@snitch.co.in" style="color: #1B1C1A; text-decoration: none; border-bottom: 1px solid #1B1C1A;">Contact Our Concierge</a>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
  await sendEmail(req.user?.email, subject, "", html);
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

  // Reduce stock for each item in the order
  const bulkOps = order.items.map((item) => ({
    updateOne: {
      filter: { _id: item.variant },
      update: { $inc: { stock: -item.quantity } },
    },
  }));

  if (bulkOps.length > 0) {
    await VariantModel.bulkWrite(bulkOps);
  }

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

export const updatePaymentStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;

  const order = await orderModel.findById(id);

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  order.paymentStatus = paymentStatus;

  await order.save();

  return res.status(200).json({
    success: true,
    message: "Payment status updated successfully",
    data: order,
    error: null,
  });
});

export const getSellerOrders = asyncHandler(async (req, res, next) => {
  const userId = resolveUserId(req);

  const sellerProducts = await productModel
    .find({ seller: userId })
    .select("_id");
  const productIds = sellerProducts.map((p) => p._id);

  const orders = await orderModel
    .find({ "items.product": { $in: productIds } })
    .populate("user", "name email fullname")
    .populate("items.product", "title coverImage category")
    .populate("items.variant", "color size images")
    .populate("shippingAddress")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: orders,
    error: null,
  });
});

export const orderCancelByUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const order = await orderModel.findById(id);

  if (!order) {
    const error = new Error("Order not found");
    error.statusCode = 404;
    return next(error);
  }

  const userId = resolveUserId(req);

  if (order.user._id.toString() !== userId && req.user?.role !== "admin") {
    const error = new Error("Not authorized to cancel this order");
    error.statusCode = 403;
    return next(error);
  }

  if (order.orderStatus === "delivered" || order.orderStatus === "cancelled") {
    const error = new Error("Order cannot be cancelled");
    error.statusCode = 400;
    return next(error);
  }

  order.orderStatus = "cancelled";
  order.isCancelled = true;
  order.cancelledAt = new Date();

  await order.save();

  return res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: order,
    error: null,
  });
});
