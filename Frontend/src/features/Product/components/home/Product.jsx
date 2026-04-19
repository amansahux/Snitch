import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const price =
    product.price?.currency === "INR"
      ? `₹${product.price?.amount?.toLocaleString()}`
      : `$${product.price?.amount?.toLocaleString()}`;

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Image */}
      <Link
        to={`/shop/product/${product._id}`}
        className="block rounded-xl overflow-hidden bg-[#f3f3f3]"
      >
        <div className="relative aspect-square flex items-center justify-center">
          <img
            src={product.images?.[0]?.url}
            alt={product.title}
            className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category */}
          <span className="absolute top-2 right-2 text-[10px] px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-700 font-medium">
            {product.category || "Other"}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="pt-3 space-y-2">
        {/* Title */}
        <Link to={`/shop/product/${product._id}`}>
          <h3 className="text-sm font-semibold text-[#1b1c1a] line-clamp-1 hover:text-[#C9A96E] transition">
            {product.title}
          </h3>
        </Link>

        {/* Rating + Price */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] text-gray-500">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span>5.0</span>
            <span>(1.2k)</span>
          </div>

          <span className="text-sm font-bold text-[#1b1c1a]">{price}</span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button className="h-9 rounded-full border border-gray-300 bg-white text-[11px] font-medium text-[#1b1c1a] hover:bg-gray-100 transition cursor-pointer">
            Add to Cart
          </button>

          <button className="h-9 rounded-full bg-[#1b1c1a] text-white text-[11px] font-medium hover:bg-black transition cursor-pointer">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;