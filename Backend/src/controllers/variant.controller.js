import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import productModel from "../models/product.model.js";
import VariantModel from "../models/varient.model.js";
import uploadFile from "../services/storage.service.js";

export const createVariantController = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await productModel.findById(productId);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  const { size, color, fit, material, price, stock } = req.body;

  // Check if variant already exists for this product with same size and color
  const existingVariant = await VariantModel.findOne({
    product: productId,
    size,
    color,
  });

  if (existingVariant) {
    const error = new Error("Variant with this size and color already exists for this product");
    error.statusCode = 400;
    return next(error);
  }

  // Handle Image Uploads
  let variantImages = [];
  if (req.files && req.files.length > 0) {
    const uploadedFiles = await Promise.all(
      req.files.map((file) => {
        return uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
          folder: "/Snich/variants",
        });
      }),
    );
    variantImages = uploadedFiles.map((file) => ({
      url: file.url,
    }));
  }

  const variant = await VariantModel.create({
    product: productId,
    size,
    color,
    fit,
    material,
    stock: Number(stock),
    price,
    images: variantImages,
  });

  // Also update the variants array in the Product model
  await productModel.findByIdAndUpdate(productId, {
    $push: { variants: variant._id }
  });

  return res.status(201).json({
    success: true,
    message: "Variant created successfully",
    variant,
  });
});
