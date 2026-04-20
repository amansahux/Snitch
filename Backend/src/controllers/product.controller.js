import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import uploadFile from "../services/storage.service.js";
import productModel from "../models/product.model.js";

export const createProduct = asyncHandler(async (req, res, next) => {
  const { title, description, priceAmount, priceCurrency } = req.body;
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
        folder: "/Snich/products",
      });
    }),
  );

  const images = uploadedFiles.map((file) => ({
    url: file.url,
  }));

  const product = await productModel.create({
    title,
    description,
    price: {
      amount: priceAmount,
      currency: priceCurrency || "INR",
    },
    seller,
    images,
  });

  return res.status(201).json({
    message: "Product created successfully",
    success: true,
    data: product,
    error: null,
  });
});

export const getSellerProducts = asyncHandler(async (req, res, next) => {
  const seller = req.user.id;

  const products = await productModel.find({ seller });

  return res.status(200).json({
    message: "Products fetched successfully",
    success: true,
    data: products,
    error: null,
  });
});

export const getAllProducts = asyncHandler(async (req, res, next) => {
  const products = await productModel
    .find()
    .populate("seller", "fullname email");

  return res.status(200).json({
    message: "Products fetched successfully",
    success: true,
    data: products,
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

  return res.status(200).json({
    message: "Product fetched successfully",
    success: true,
    data: product,
    error: null,
  });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { title, description, priceAmount, category, stock, existingImages } =
    req.body;
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);
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
  if (priceAmount) product.price.amount = priceAmount;
  if (category) product.category = category;
  if (stock) product.stock = stock;

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

  // Update images if either existing ones were kept or new ones were uploaded
  if (existingImages !== undefined || newImages.length > 0) {
    product.images = [...finalImages, ...newImages];
  }

  await product.save();

  return res.status(200).json({
    message: "Product updated successfully",
    success: true,
    data: product,
    error: null,
  });
});

export const addVariant = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { stock, priceAmount, attributes } = req.body;
  const seller = req.user.id;

  const product = await productModel.findById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  // product.seller is an ObjectId if not populated
  if (product.seller.toString() !== seller) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    return next(error);
  }

  let variantImages = [];
  if (req.files && req.files.length > 0) {
    const uploadedFiles = await Promise.all(
      req.files.map((file) => {
        return uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
          folder: "/Snich/products/variants",
        });
      }),
    );
    variantImages = uploadedFiles.map((file) => ({
      url: file.url,
    }));
  }

  // Parse attributes if it's coming as a string (likely from FormData)
  let parsedAttributes = attributes;
  if (typeof attributes === "string") {
    try {
      parsedAttributes = JSON.parse(attributes);
    } catch (e) {
      console.error("Error parsing attributes:", e);
    }
  }

  const variant = {
    stock: Number(stock),
    price: {
      amount: Number(priceAmount),
    },
    attributes: parsedAttributes,
    images: variantImages,
  };

  product.variants.push(variant);
  await product.save();

  return res.status(200).json({
    message: "Variant added successfully",
    success: true,
    data: product,
    error: null,
  });
});
