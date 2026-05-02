import cartModel from "../models/cart.model.js";
import mongoose from "mongoose";

export const getCartDetails = async (userId) => {
  const cartData = await cartModel.aggregate([
    {
      $match: {
        $or: [{ userId: new mongoose.Types.ObjectId(userId) }],
      },
    },
    {
      $unwind: {
        path: "$items",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "variants",
        localField: "items.variantId",
        foreignField: "_id",
        as: "items.variantId",
      },
    },
    {
      $unwind: {
        path: "$items.variantId",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "items.productId",
        foreignField: "_id",
        as: "items.productId",
      },
    },
    {
      $unwind: {
        path: "$items.productId",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        "items.itemPrice": {
          $multiply: [
            { $ifNull: ["$items.quantity", 0] },
            { $ifNull: ["$items.variantId.price.selling", 0] },
          ],
        },
        "items.itemMrp": {
          $multiply: [
            { $ifNull: ["$items.quantity", 0] },
            { $ifNull: ["$items.variantId.price.mrp", 0] },
          ],
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        items: {
          $push: {
            $cond: {
              if: { $gt: ["$items.quantity", 0] },
              then: "$items",
              else: "$$REMOVE",
            },
          },
        },
        totalSelling: { $sum: "$items.itemPrice" },
        totalMrp: { $sum: "$items.itemMrp" },
        currency: {
          $first: { $ifNull: ["$items.variantId.price.currency", "INR"] },
        },
      },
    },
    {
      $addFields: {
        totalDiscount: { $subtract: ["$totalMrp", "$totalSelling"] },
      },
    },
  ]);
  return cartData;
};
