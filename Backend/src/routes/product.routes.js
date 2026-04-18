import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getSellerProducts,
} from "../controllers/product.controller.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/zod.middleware.js";
import { createProductSchema } from "../validators/product.validator.js";

const productRouter = Router();

productRouter.post(
  "/create",
  authenticateSeller,
  upload.array("images", 7),
  validate(createProductSchema),
  createProduct,
);

productRouter.get("/seller", authenticateSeller, getSellerProducts);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
export default productRouter;
