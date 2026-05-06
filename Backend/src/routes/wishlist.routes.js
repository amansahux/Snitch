import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller.js";

const WishlistRouter = Router();


WishlistRouter.get("/", authenticateUser, getWishlist);
WishlistRouter.post("/:productId", authenticateUser, addToWishlist);
WishlistRouter.delete("/:productId", authenticateUser, removeFromWishlist);

export default WishlistRouter;
