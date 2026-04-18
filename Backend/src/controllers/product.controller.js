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
  const products = await productModel.find().populate("seller", "fullname email");

  return res.status(200).json({
    message: "Products fetched successfully",
    success: true,
    data: products,
    error: null,
  });
});

export const getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findById(id).populate("seller", "fullname email");

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
