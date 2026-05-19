import React from "react";
import { Heart, Trash2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useWishlist from "../../wishlist/hooks/useWishlist.js";
import { productPlaceholderImage } from "@/assets";

const WishlistSection = () => {
  const { items, loading,  handleRemoveWishlist } = useWishlist();
  const navigate = useNavigate();

  if (loading && items.length === 0) {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col gap-2">
          <div className="h-10 w-48 bg-[#f3eee8] rounded-full animate-pulse" />
          <div className="h-4 w-64 bg-[#f3eee8] rounded-full animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-80 bg-[#f3eee8] rounded-[2.5rem] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 text-center py-20">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 bg-[#f3eee8] rounded-full flex items-center justify-center text-[#C9A96E]">
            <Heart size={32} strokeWidth={1} />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-3xl text-[#1b1c1a]">
              Your archive is empty
            </h2>
            <p className="text-[#7a6e63] font-serif italic">
              Pieces you admire will appear here.
            </p>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="text-[10px] font-black uppercase cursor-pointer tracking-[0.3em] text-[#1b1c1a] border-b border-[#1b1c1a] pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all"
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-4xl text-[#1b1c1a]">Your Wishlist</h2>
        <p className="font-serif italic text-[#7a6e63]">
          Timeless pieces awaiting their place in your wardrobe.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.product._id}
            className="group border border-[#e6dfd5] rounded-[2.5rem] overflow-hidden shadow-[0_10px_30px_rgba(27,28,26,0.02)] hover:shadow-[0_20px_40px_rgba(27,28,26,0.08)] transition-all duration-500"
          >
            <div className=" h-80  relative overflow-hidden">
              <img
                onClick={() => {
                  navigate(`/shop/product/${item.product._id}`);
                }}
                src={item.product.coverImage?.url || productPlaceholderImage}
                alt={item.product.title}
                className="w-full h-full object-cover group-hover:scale-110 cursor-pointer transition-transform duration-1000"
              />
              <button
                onClick={() => handleRemoveWishlist(item.product._id)}
                className="absolute cursor-pointer top-4 right-4 p-3 rounded-full bg-white text-[#ba1a1a] shadow-lg active:scale-90 transition-transform hover:bg-[#ba1a1a] hover:text-white transition-colors duration-300"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="p-8 space-y-4">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C9A96E] mb-1">
                  {item.product.category || "Atelier"}
                </p>
                <h4 className="font-serif text-2xl text-[#1b1c1a] leading-none">
                  {item.product.title}
                </h4>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#f3eee8]">
                <Link
                  to={`/shop/product/${item.product._id}`}
                  className="text-[9px] font-black uppercase tracking-[0.3em] text-[#1b1c1a] border-b border-[#1b1c1a] pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all flex items-center gap-2"
                >
                  Acquire <ArrowRight size={10} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistSection;
