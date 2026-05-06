import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import Wishlist from "../models/wishlist.model.js";

export const addToWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user.id;

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: userId,
      products: [{ product: productId }],
    });
  } else {
    // Check if product already exists
    const productExists = wishlist.products.some(
      (p) => p.product.toString() === productId,
    );

    if (productExists) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    wishlist.products.push({ product: productId });
    await wishlist.save();
  }

  res.status(200).json({
    success: true,
    message: "Product added to wishlist",
    wishlist,
  });
});

export const removeFromWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user.id;

  const wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    return res.status(404).json({
      success: false,
      message: "Wishlist not found",
    });
  }

  wishlist.products = wishlist.products.filter(
    (p) => p.product.toString() !== productId,
  );

  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Product removed from wishlist",
    wishlist,
  });
});

export const getWishlist = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const wishlist = await Wishlist.findOne({ user: userId }).populate("products.product", "coverImage category");

  if (!wishlist) {
    return res.status(404).json({
      success: false,
      message: "Wishlist not found",
    });
  }

  res.status(200).json({
    success: true,
    products: wishlist.products,
  });
});
