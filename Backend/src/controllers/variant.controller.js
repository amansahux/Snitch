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

  // Generate a stable SKU for the variant to avoid null/duplicate unique index errors.
  // SKU format: <productId>-<size>-<color>
  const sku = `${productId}-${size || "NA"}-${(color || "NA").replace(/\s+/g, "_")}`;

  // Check if variant already exists for this product with same size and color
  const existingVariant = await VariantModel.findOne({
    product: productId,
    size,
    color,
  });

  if (existingVariant) {
    const error = new Error(
      "Variant with this size and color already exists for this product",
    );
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
    sku,
    size,
    color,
    fit,
    material,
    stock: Number(stock),
    price,
    images: variantImages,
    isDefault: false,
  });

  return res.status(201).json({
    success: true,
    message: "Variant created successfully",
    variant,
  });
});

export const getVariantController = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await productModel.findById(productId);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  const variants = await VariantModel.find({ product: productId });

  return res.status(200).json({
    success: true,
    message: "Variants fetched successfully",
    variants,
  });
});
export const updateVariantController = asyncHandler(async (req, res, next) => {
  const { variantId } = req.params;
  const { size, color, fit, material, price, stock, existingImages } = req.body;

  const existingVariant = await VariantModel.findById(variantId);

  if (!existingVariant) {
    const error = new Error("Variant not found");
    error.statusCode = 404;
    return next(error);
  }

  // Parse existingImages if it's sent as a string (from FormData)
  let imagesToKeep = [];
  if (existingImages) {
    try {
      imagesToKeep = typeof existingImages === "string" ? JSON.parse(existingImages) : existingImages;
    } catch (e) {
      imagesToKeep = [];
    }
  }

  let updateData = {
    size,
    color,
    fit,
    material,
    price: typeof price === "string" ? JSON.parse(price) : price,
    stock,
  };

  // Handle new image uploads
  let newImages = [];
  if (req.files && req.files.length > 0) {
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        return await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
          folder: "/Snich/variants",
        });
      }),
    );
    newImages = uploadedImages.map((image) => ({ url: image.url }));
  }

  // Combine kept images with new ones
  // existingImages should be an array of { url: string }
  updateData.images = [...imagesToKeep, ...newImages];

  // Recalculate SKU if size or color changes to maintain unique index integrity
  if (size || color) {
    updateData.sku = `${existingVariant.product}-${size || existingVariant.size}-${(color || existingVariant.color).replace(/\s+/g, "_")}`;
  }

  const variant = await VariantModel.findByIdAndUpdate(
    variantId,
    { $set: updateData },
    { new: true },
  );

  return res.status(200).json({
    success: true,
    message: "Variant updated successfully",
    variant,
  });
});
export const deleteVariantController = asyncHandler(async (req, res, next) => {
  const { variantId } = req.params;
  const variant = await VariantModel.findByIdAndDelete(variantId);
  if (!variant) {
    const error = new Error("Variant not found");
    error.statusCode = 404;
    return next(error);
  }
  return res.status(200).json({
    success: true,
    message: "Variant deleted successfully",
    data: null,
    error: null,
  });
});
