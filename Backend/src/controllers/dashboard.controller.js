import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import productModel from "../models/product.model.js";
import orderModel from "../models/order.model.js";
import VariantModel from "../models/varient.model.js";
import { getCache, setCache } from "../utils/redis.utils.js";
import mongoose from "mongoose";

/**
 * @desc    Get complete seller dashboard analytics
 * @route   GET /api/dashboard/data
 * @access  Private (Seller)
 */
export const getDashboardData = asyncHandler(async (req, res, next) => {
  const sellerId = req.user.id;
  const cacheKey = `dashboard:seller:${sellerId}`;

  // 1. Try fetching from Redis Cache
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    return res.status(200).json({
      success: true,
      message: "Dashboard analytics fetched from cache",
      data: cachedData,
      source: "redis",
    });
  }

  // 2. Fetch Seller's Product IDs
  const sellerProducts = await productModel.find({ seller: sellerId }).select("_id");
  const productIds = sellerProducts.map((p) => p._id);

  if (productIds.length === 0) {
    const emptyStats = {
      stats: {
        totalRevenue: 0,
        totalOrders: 0,
        deliveredOrders: 0,
        totalProducts: 0,
        cancelledOrders: 0,
        lowStocks: 0,
      },
      topProducts: [],
      stockIntelligence: [],
    };
    return res.status(200).json({
      success: true,
      data: emptyStats,
    });
  }

  // 3. Parallel Aggregations for Performance
  const [statsData, topProducts, stockIntelligence] = await Promise.all([
    // Aggregation 1: General Stats & Revenue
    orderModel.aggregate([
      {
        $match: {
          "items.product": { $in: productIds },
        },
      },
      {
        $facet: {
          // Total, Delivered, Cancelled Order Counts
          counts: [
            {
              $group: {
                _id: null,
                totalOrders: { $sum: 1 },
                deliveredOrders: {
                  $sum: { $cond: [{ $eq: ["$orderStatus", "delivered"] }, 1, 0] },
                },
                cancelledOrders: {
                  $sum: { $cond: [{ $eq: ["$orderStatus", "cancelled"] }, 1, 0] },
                },
              },
            },
          ],
          // Revenue calculation (Sum of items belonging to this seller only)
          revenue: [
            { $unwind: "$items" },
            {
              $match: {
                "items.product": { $in: productIds },
                paymentStatus: "paid",
                orderStatus: { $ne: "cancelled" },
              },
            },
            {
              $group: {
                _id: null,
                totalRevenue: {
                  $sum: { $multiply: ["$items.discountedPrice", "$items.quantity"] },
                },
              },
            },
          ],
        },
      },
    ]),

    // Aggregation 2: Top Performing Products (Top 3)
    orderModel.aggregate([
      { $unwind: "$items" },
      {
        $match: {
          "items.product": { $in: productIds },
          paymentStatus: "paid",
          orderStatus: { $ne: "cancelled" },
        },
      },
      {
        $group: {
          _id: "$items.product",
          totalUnits: { $sum: "$items.quantity" },
          totalRevenue: {
            $sum: { $multiply: ["$items.discountedPrice", "$items.quantity"] },
          },
        },
      },
      { $sort: { totalRevenue: -1 } },
      { $limit: 3 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $project: {
          _id: 1,
          title: "$productInfo.title",
          image: "$productInfo.coverImage.url",
          totalUnits: 1,
          totalRevenue: 1,
        },
      },
    ]),

    // Aggregation 3: Stock Intelligence (Low Stock Variants)
    VariantModel.aggregate([
      {
        $match: {
          product: { $in: productIds },
          stock: { $lte: 10 }, // Threshold for low stock
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $project: {
          _id: 1,
          title: "$productInfo.title",
          sku: 1,
          stock: 1,
          image: { 
            $ifNull: [
              { $arrayElemAt: ["$images.url", 0] }, 
              "$productInfo.coverImage.url"
            ] 
          },
          status: {
            $cond: [{ $eq: ["$stock", 0] }, "Out of Stock", "Low Stock"],
          },
        },
      },
    ]),
  ]);

  // 4. Calculate Total Products and Low Stock Count
  const totalProductsCount = productIds.length;
  const lowStocksCount = stockIntelligence.length;

  // 5. Format Response
  const revenueObj = statsData[0]?.revenue[0] || { totalRevenue: 0 };
  const countsObj = statsData[0]?.counts[0] || {
    totalOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
  };

  const dashboardResponse = {
    stats: {
      totalRevenue: revenueObj.totalRevenue,
      totalOrders: countsObj.totalOrders,
      deliveredOrders: countsObj.deliveredOrders,
      totalProducts: totalProductsCount,
      cancelledOrders: countsObj.cancelledOrders,
      lowStocks: lowStocksCount,
    },
    topProducts: topProducts.map((p, index) => ({
      ...p,
      rank: index + 1,
    })),
    stockIntelligence: stockIntelligence,
  };

  // 6. Cache the result for 5 minutes (300 seconds)
  await setCache(cacheKey, dashboardResponse, 300);

  return res.status(200).json({
    success: true,
    message: "Dashboard analytics generated successfully",
    data: dashboardResponse,
    source: "db",
  });
});
