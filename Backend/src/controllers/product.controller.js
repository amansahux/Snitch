import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import uploadFile from "../services/storage.service.js";
import productModel from "../models/product.model.js";
import VariantModel from "../models/varient.model.js";
import mongoose from "mongoose";

export const createProduct = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    mrp,
    selling,
    currency,
    size,
    color,
    fit,
    material,
    category,
    stock,
  } = req.body;
  const seller = req.user.id; // decoded JWT payload contains "id"

  if (!req.files || req.files.length === 0) {
    const error = new Error("Please upload at least one image");
    error.statusCode = 400;
    return next(error);
  }

  const uploadedFiles = await Promise.all(
    req.files.map((file) => {
      return uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
        folder: "/Snich/products/variants",
      });
    }),
  );

  const images = uploadedFiles.map((file) => ({
    url: file.url,
  }));
  // Use a transaction: create Product (parent) then create default Variant (purchasable)
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const product = new productModel({
      title,
      description,
      seller,
      category,
      coverImage: images && images.length > 0 ? { url: images[0].url } : undefined,
    });
    await product.save({ session });

    const priceObj = {
      mrp: Number(mrp) || 0,
      selling: Number(selling) || 0,
      currency: currency || "INR",
    };

    const variant = new VariantModel({
      product: product._id,
      sku: `${product._id.toString()}-${size || 'NA'}-${(color || 'NA').replace(/\s+/g, '_')}`,
      size,
      color,
      fit,
      material,
      price: priceObj,
      stock: Number(stock) || 0,
      images,
      isDefault: true,
    });

    await variant.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      message: "Product created successfully",
      success: true,
      product,
      variant,
      error: null,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return next(err);
  }
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const seller = req.user.id;

  const product = await productModel.findById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  if (product.seller.toString() !== seller) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    return next(error);
  }

  await product.deleteOne();

  return res.status(200).json({
    message: "Product deleted successfully",
    success: true,
    data: null,
    error: null,
  });
});

export const getSellerProducts = asyncHandler(async (req, res, next) => {
  const seller = req.user.id;

  const products = await productModel.find({ seller });

  // Attach default variant data for backwards compatibility (price, stock, images)
  const productIds = products.map((p) => p._id);
  const variants = await VariantModel.find({ product: { $in: productIds }, isDefault: true });
  const variantMap = new Map(variants.map((v) => [v.product.toString(), v]));

  const enriched = products.map((p) => {
    const vp = variantMap.get(p._id.toString());
    const po = p.toObject();
    if (vp) {
      po.price = vp.price;
      po.stock = vp.stock;
      po.images = vp.images;
    }
    return po;
  });

  return res.status(200).json({
    message: "Products fetched successfully",
    success: true,
    data: enriched,
    error: null,
  });
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await productModel.find().populate("seller", "fullname email");

  const productIds = products.map((p) => p._id);
  const variants = await VariantModel.find({ product: { $in: productIds }, isDefault: true });
  const variantMap = new Map(variants.map((v) => [v.product.toString(), v]));

  const enriched = products.map((p) => {
    const vp = variantMap.get(p._id.toString());
    const po = p.toObject();
    if (vp) {
      po.price = vp.price;
      po.stock = vp.stock;
      po.images = vp.images;
    }
    return po;
  });

  return res.status(200).json({
    message: "Products fetched successfully",
    success: true,
    data: enriched,
    error: null,
  });
});

export const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel
    .findById(id)
    .populate("seller", "fullname email");

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  // Fetch variants from Variant collection
  const variants = await VariantModel.find({ product: id });

  return res.status(200).json({
    message: "Product fetched successfully",
    success: true,
    data: { product, variants },
    error: null,
  });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const {
    title,
    description,
    category,
    existingImages,
  } = req.body;
  const seller = req.user.id;

  let newImages = [];
  if (req.files && req.files.length > 0) {
    const uploadedFiles = await Promise.all(
      req.files.map((file) => {
        return uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
          folder: "/Snich/products",
        });
      }),
    );
    newImages = uploadedFiles.map((file) => ({
      url: file.url,
    }));
  }

  const { id } = req.params;
  const product = await productModel
    .findById(id)
    .populate("seller", "fullname email");

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  if (product.seller._id.toString() !== seller) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    return next(error);
  }

  if (title) product.title = title;
  if (description) product.description = description;
  if (category) product.category = category;
  // Only update product-level fields here. Variant-level fields should be managed via variant APIs.

  // Handle Images Merge
  let finalImages = [];
  if (existingImages) {
    try {
      const parsedExisting =
        typeof existingImages === "string"
          ? JSON.parse(existingImages)
          : existingImages;
      if (Array.isArray(parsedExisting)) {
        finalImages = parsedExisting.map((url) => ({ url }));
      }
    } catch (e) {
      console.error("Error parsing existingImages:", e);
    }
  }

  // Update coverImage from existing or newly uploaded images
  const mergedImages = [...finalImages, ...newImages];
  if (mergedImages.length > 0) {
    product.coverImage = { url: mergedImages[0].url };
  }

  await product.save();

  return res.status(200).json({
    message: "Product updated successfully",
    success: true,
    data: product,
    error: null,
  });
});

// Legacy product-level variant push removed. Variant creation is handled
// by the Variant APIs (`/api/variants`) which persist variants in the
// `variants` collection. This keeps `Product` as a display-only entity.

export const similarProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  // Get default variant for the requested product to use as comparison baseline
  const baseVariant = await VariantModel.findOne({ product: id, isDefault: true });

  // Fetch other products in same category
  const others = await productModel.find({
    _id: { $ne: id },
    category: product.category,
  });

  // For each candidate product, fetch its default variant and compute a simple similarity score
  const scored = await Promise.all(
    others.map(async (p) => {
      const v = await VariantModel.findOne({ product: p._id, isDefault: true });
      let score = 0;
      if (baseVariant && v) {
        if (v.color && baseVariant.color && v.color === baseVariant.color) score += 3;
        if (v.fit && baseVariant.fit && v.fit === baseVariant.fit) score += 2;
        if (v.material && baseVariant.material && v.material === baseVariant.material) score += 2;
      }
      return { product: p, variant: v, score };
    }),
  );

  scored.sort((a, b) => b.score - a.score);

  const top = scored.slice(0, 4).map((s) => ({
    product: s.product,
    variant: s.variant,
    score: s.score,
  }));

  return res.status(200).json({
    message: "Similar products fetched successfully",
    success: true,
    data: top,
    error: null,
  });
});
