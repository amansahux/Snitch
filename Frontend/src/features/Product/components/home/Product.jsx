import React from "react";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const price =
    product.price?.currency === "INR"
      ? `₹${product.price?.amount?.toLocaleString()}`
      : `$${product.price?.amount?.toLocaleString()}`;

  return (
    <div className="group relative flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Editorial Image Container */}
      <Link
        to={`/shop/product/${product._id}`}
        className="block relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#f3eee8] shadow-sm group-hover:shadow-luxury transition-all duration-700"
      >
        <img
          src={product.images?.[0]?.url}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
        />
        
        {/* Subtle Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
        
        {/* Quick View Attribution */}
        <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
           <div className="bg-white/90 backdrop-blur-md py-4 rounded-xl flex items-center justify-center gap-2 shadow-luxury">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] font-sans text-[#1b1c1a]">View Perspective</span>
              <ArrowRight size={10} className="text-[#C9A96E]" />
           </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <span className="bg-white/80 backdrop-blur-md text-[8px] font-black uppercase tracking-[0.4em] px-4 py-2 rounded-full text-[#1b1c1a] shadow-sm border border-white/50">
            {product.category || "Atelier"}
          </span>
        </div>
      </Link>

      {/* Product Information */}
      <div className="pt-8 space-y-3 px-2">
        <div className="flex justify-between items-start gap-4">
          <Link to={`/shop/product/${product._id}`} className="flex-1">
            <h3 className="text-xl font-serif text-[#1b1c1a] leading-none group-hover:text-[#C9A96E] transition-colors duration-500">
              {product.title}
            </h3>
          </Link>
          <span className="text-sm font-inter text-[#7a6e63] mt-1 shrink-0">
             {price}
          </span>
        </div>
        
        <div className="flex items-center justify-between border-t border-[#e8e2da] pt-3">
           <div className="flex items-center gap-1.5 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
              <Star size={10} fill="#C9A96E" className="text-[#C9A96E]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-[#7a6e63]">Rare Selection</span>
           </div>
           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#7a6e63]/40">Authenticated Piece</p>
        </div>
      </div>
    </div>
  );
};

export default Product;