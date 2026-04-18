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

  const handleUser = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      console.log("Add to Bag");
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div
      key={product._id}
      className="group relative flex flex-col transition-all duration-500 transform hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4"
    >
      {/* Image Container with Luxury Styling */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#f3eee8] shadow-sm group-hover:shadow-luxury transition-all duration-700">
        {/* Images Slider */}
        <Link
          to={`/shop/product/${product._id}`}
          className="w-full h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {product.images?.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`${product.title} - ${index}`}
              className="w-full h-full object-cover shrink-0 transition-transform duration-1000 group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
            />
          ))}
        </Link>

        {/* Custom Navigation Arrows */}
        {totalImages > 1 && (
          <>
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex justify-between opacity-0 group-hover:opacity-100 transition-all duration-500">
              <button
                onClick={prevImage}
                className="p-2 bg-white/60 hover:bg-white backdrop-blur-md text-charcoal rounded-full transition-all shadow-luxury hover:scale-110"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={nextImage}
                className="p-2 bg-white/60 hover:bg-white backdrop-blur-md text-charcoal rounded-full transition-all shadow-luxury hover:scale-110"
              >
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Premium Pagination */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {product.images.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    index === currentImageIndex
                      ? "w-6 bg-white"
                      : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-charcoal/40 to-transparent translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out">
          <button
            onClick={handleUser}
            className="w-full bg-charcoal text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-gold hover:shadow-luxury transition-all duration-300"
          >
            Quick Add <ShoppingBag size={12} className="mb-0.5" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4 bg-gold text-white px-2.5 py-1.5 text-[8px] tracking-[0.2em] uppercase font-black rounded-lg shadow-luxury animate-in fade-in zoom-in duration-700">
          Atelier No. 01
        </div>
      </div>

      {/* Elegant Product Details */}
      <Link to={`/shop/product/${product._id}`} className="mt-6 space-y-2 group/text">
        <div className="flex justify-between items-start">
          <h3 className="text-[10px] font-black tracking-[0.2em] text-charcoal-light uppercase group-hover/text:text-gold transition-colors duration-300">
            {product.title}
          </h3>
          <div className="flex items-center gap-1 opacity-20 group-hover/text:opacity-100 transition-opacity">
            <Star size={10} className="text-gold fill-gold" />
            <span className="text-[10px] font-bold text-charcoal">4.9</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-charcoal tracking-wide">
            {product.price?.currency === "INR" ? "₹" : "$"}{" "}
            {product.price?.amount?.toLocaleString()}
          </span>
        </div>

        {/* Minimal accent line */}
        <div className="h-[1px] w-0 bg-gold/30 transition-all duration-700 group-hover:w-full"></div>
      </Link>
    </div>
  );
};

export default Product;
