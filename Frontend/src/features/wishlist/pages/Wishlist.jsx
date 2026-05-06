import React, { useEffect } from "react";
import { Heart, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useWishlist from "../hooks/useWishlist.js";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { items, loading, handleRemoveWishlist } = useWishlist();
  const navigate = useNavigate();


  if (loading && items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#f3eee8]" />
          <div className="h-4 w-32 bg-[#f3eee8] rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf9f6] selection:bg-[#C9A96E] selection:text-white">
      {/* Editorial Header */}
      <header className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 border-b border-[#f3eee8]">
        <div className="mb-12">
          <button
            onClick={() => navigate(-1)}
            className="group cursor-pointer flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#7a6e63] hover:text-[#1b1c1a] transition-colors"
          >
            <div className="w-8 h-8  rounded-full border border-[#e8e2da] flex items-center justify-center group-hover:border-[#1b1c1a] transition-colors">
              <ArrowLeft size={12} />
            </div>
            <span>Return to Gallery</span>
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#C9A96E]"></span>
              <span className="text-[10px] tracking-[0.4em] text-[#C9A96E] uppercase font-black">
                Personal Archive
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif text-[#1b1c1a] leading-tight">
              Curated <br /> <span className="italic">Wishlist</span>
            </h1>
            <p className="text-[#7a6e63] font-inter font-light text-lg max-w-md leading-relaxed">
              Timeless pieces awaiting their place in your personal collection.
            </p>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#1b1c1a]">
            <span className="text-[#C9A96E] font-serif lg:text-5xl">{items.length}</span>
            <span>Items Selected</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="w-24 h-24 bg-[#f3eee8] rounded-full flex items-center justify-center text-[#C9A96E]">
              <Heart size={32} strokeWidth={1} />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-serif text-[#1b1c1a]">
                Your archive is empty
              </h3>
              <p className="text-[#7a6e63] font-inter font-light">
                Explore our latest collection to add pieces you admire.
              </p>
            </div>
            <button
              onClick={() => navigate("/shop")}
              className="px-10 py-5 bg-[#1b1c1a] cursor-pointer text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#C9A96E] transition-all duration-500 shadow-luxury active:scale-95"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {items.map((item, idx) => (
              <div
                key={item.product._id}
                className="group flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-700"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative aspect-3/4 overflow-hidden rounded-[3rem] bg-[#f3eee8] shadow-sm group-hover:shadow-luxury transition-all duration-700">
                  <img
                    onClick={() => {
                      navigate(`/shop/product/${item.product._id}`);
                    }}
                    src={
                      item.product.coverImage?.url || "/placeholder-image.jpg"
                    }
                    alt={item.product.title}
                    className="w-full h-full object-cover cursor-pointer transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                  />

                  {/* Action Overlays */}
                  <div className="absolute top-6 right-6">
                    <button
                      onClick={() => handleRemoveWishlist(item.product._id)}
                      className="p-4 cursor-pointer rounded-full bg-white/90 backdrop-blur-md text-[#ba1a1a] shadow-lg hover:bg-[#ba1a1a] hover:text-white transition-all duration-500 active:scale-90"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <Link
                    to={`/shop/product/${item.product._id}`}
                    className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700"
                  >
                    <div className="bg-white/95 backdrop-blur-md py-5 rounded-2xl flex items-center justify-center gap-3 shadow-luxury">
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#1b1c1a]">
                        Acquire Piece
                      </span>
                      <ArrowRight size={12} className="text-[#C9A96E]" />
                    </div>
                  </Link>
                </div>

                {/* Details */}
                <div className="pt-8 space-y-4 px-4 text-center">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C9A96E]">
                      {item.product.category || "Atelier"}
                    </p>
                    <h3 className="text-2xl font-serif text-[#1b1c1a] leading-tight">
                      {item.product.title}
                    </h3>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-[8px] font-black uppercase tracking-widest text-[#7a6e63]/40">
                      Added {new Date(item.addedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Brand Signifier */}
      <footer className="py-24 bg-[#f3eee8]/30 border-t border-[#f3eee8] flex flex-col items-center gap-6 mt-20">
        <div className="text-4xl font-serif font-black tracking-[0.5em] text-[#1b1c1a]">
          SNICH<span className="text-[#C9A96E]">.</span>
        </div>
      </footer>
    </div>
  );
};

export default Wishlist;
