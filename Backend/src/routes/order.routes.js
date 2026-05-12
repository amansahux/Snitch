import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/zod.middleware.js";
import { orderSchema } from "../validators/order.validator.js";
import {
  createOrderController,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  verifyOrderPayment,
  getSellerOrders,
  updatePaymentStatus,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post(
  "/create",
  authenticateUser,
  validate(orderSchema),
  createOrderController,
);
orderRouter.post("/order/verify-order", authenticateUser, verifyOrderPayment);
orderRouter.get("/my-orders", authenticateUser, getUserOrders);
orderRouter.get("/my-orders/:id", authenticateUser, getOrderById);
orderRouter.put("/my-orders/:id/status", authenticateUser, updateOrderStatus);
orderRouter.put("/payment/:id/status", authenticateUser, updatePaymentStatus);
orderRouter.get("/seller", authenticateUser, getSellerOrders);

export default orderRouter;
