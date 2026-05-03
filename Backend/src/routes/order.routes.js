import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/zod.middleware.js";
import { orderSchema } from "../validators/order.validator.js";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post(
  "/create",
  authenticateUser,
  validate(orderSchema),
  createOrder,
);
orderRouter.get("/my-orders", authenticateUser, getUserOrders);
orderRouter.get("/:id", authenticateUser, getOrderById);
orderRouter.put("/:id/status", authenticateUser, updateOrderStatus); 

export default orderRouter;
