import { Router } from "express";
import {
  addItemToCart,
  clearCart,
  getMyCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/cart.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/zod.middleware.js";
import {
  addCartItemSchema,
  updateCartItemSchema,
} from "../validators/cart.validator.js";

const cartRouter = Router();

cartRouter.use(authenticateUser);

cartRouter.get("/", getMyCart);
cartRouter.post("/items", validate(addCartItemSchema), addItemToCart);
cartRouter.patch(
  "/items/:itemId",
  validate(updateCartItemSchema),
  updateCartItem,
);
cartRouter.delete("/items/:itemId", removeCartItem);
cartRouter.delete("/", clearCart);

export default cartRouter;
