import React, { useState } from "react";
import { ShoppingBag, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Auth/hooks/useAuth";

const Product = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const totalImages = product.images?.length || 0;

  const { user } = useAuth();
  const navigate = useNavigate();

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleUser = () => {
    if (user) {
      ("Add Card Feature");
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div
      key={product._id}
      className="group relative flex flex-col transition-all duration-300 transform"
    >
      {/* Image Container with Hover Effects and Slider */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 border border-gray-100/50">
        {/* Images */}
        <Link
          to={`/product/${product._id}`}
          className="w-full h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {product.images?.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`${product.title} - ${index}`}
              className="w-full h-full object-cover shrink-0 pointer-events-none transition-transform duration-1000 group-hover:scale-105"
            />
          ))}
        </Link>

        {/* Slider Controls (Only if more than 1 image) */}
        {totalImages > 1 && (
          <>
            {/* Navigation Arrows */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={prevImage}
                className="p-1.5 bg-white/80  cursor-pointer backdrop-blur-sm text-black rounded-full hover:bg-white transition-colors shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextImage}
                className="p-1.5 cursor-pointer bg-white/80 backdrop-blur-sm text-black rounded-full hover:bg-white transition-colors shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Pagination Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 transition-all duration-300 ${
                    index === currentImageIndex
                      ? "w-4 bg-white"
                      : "w-1 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/20 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleUser}
            className="w-full bg-white text-black py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-colors"
          >
            Quick Add <ShoppingBag size={14} />
          </button>
        </div>

        {/* Badge */}
        <div className="absolute top-4 left-4 bg-black text-white px-2 py-1 text-[8px] tracking-widest uppercase font-bold">
          New Arrival
        </div>
      </div>

      {/* Product Details */}
      <Link to={`/product/${product._id}`} className="pt-6 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="text-xs font-bold tracking-widest text-gray-800 uppercase group-hover:text-black transition-colors">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 opacity-40">
            <Star size={10} fill="currentColor" />
            <span className="text-[10px]">4.9</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-black">
            {product.price?.currency === "INR" ? "₹" : "$"}{" "}
            {product.price?.amount?.toLocaleString()}
          </span>
        </div>

        {/* Divider line that expands on hover */}
        <div className="mt-2 h-[1px] w-0 bg-black transition-all duration-500 group-hover:w-full opacity-10"></div>
      </Link>
    </div>
  );
};

export default Product;
