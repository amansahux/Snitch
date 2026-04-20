import { Router } from "express";
import { validate } from "../middlewares/zod.middleware.js";
import { VariantSchema } from "../validators/variant.validator.js";
import upload from "../middlewares/multer.middleware.js";
import { createVariantController, getVariantController } from "../controllers/variant.controller.js";

const VariantRouter = Router();

VariantRouter.post(
  "/create/:productId",
  upload.array("images", 7),
  validate(VariantSchema),
  createVariantController,
);

VariantRouter.get("/get-variants/:productId", getVariantController);
export default VariantRouter;
