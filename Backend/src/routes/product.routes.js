import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getSellerProducts,
  similarProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/zod.middleware.js";
import { createProductSchema, updateProductSchema } from "../validators/product.validator.js";

const productRouter = Router();

productRouter.post(
  "/create",
  authenticateSeller,
  upload.array("images", 7),
  validate(createProductSchema),
  createProduct,
);
productRouter.delete("/delete/:id", authenticateSeller, deleteProduct)
productRouter.post("/update/:id", authenticateSeller, upload.array("images", 7), validate(updateProductSchema), updateProduct )
productRouter.get("/seller", authenticateSeller, getSellerProducts);
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.get("/similar/:id", similarProduct)
export default productRouter;
