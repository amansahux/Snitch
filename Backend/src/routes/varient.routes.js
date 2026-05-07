import { Router } from "express";
import { validate } from "../middlewares/zod.middleware.js";
import { VariantSchema } from "../validators/variant.validator.js";
import upload from "../middlewares/multer.middleware.js";
import {
  createVariantController,
  getVariantController,
  updateVariantController,
  deleteVariantController
} from "../controllers/variant.controller.js";

const VariantRouter = Router();

VariantRouter.post(
  "/create/:productId",
  upload.array("images", 7),
  validate(VariantSchema),
  createVariantController,
);

VariantRouter.get("/get-variants/:productId", getVariantController);
VariantRouter.put(
  "/update-variant/:variantId",
  upload.array("images", 7),
  validate(VariantSchema),
  updateVariantController,
);
VariantRouter.delete(
  "/delete-variant/:variantId",
  deleteVariantController,
);
export default VariantRouter;
