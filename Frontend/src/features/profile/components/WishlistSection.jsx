import React from "react";
import { Heart } from "lucide-react";

const WishlistSection = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-4xl text-[#1b1c1a]">Your Wishlist</h2>
        <p className="font-serif italic text-[#7a6e63]">Timeless pieces awaiting their place in your wardrobe.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { id: 1, title: "Archive Silk Blazer", price: "24,500", category: "Apparel" },
          { id: 2, title: "Minimalist Leather Tote", price: "18,900", category: "Accessories" },
          { id: 3, title: "Structured Wool Overcoat", price: "42,000", category: "Outerwear" }
        ].map(item => (
          <div key={item.id} className="group bg-white border border-[#e6dfd5] rounded-[2.5rem] overflow-hidden shadow-[0_10px_30px_rgba(27,28,26,0.02)] hover:shadow-[0_20px_40px_rgba(27,28,26,0.08)] transition-all duration-500">
            <div className="h-64 bg-[#f3eee8] relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center opacity-20 text-[8rem] font-serif font-black select-none tracking-tighter">S</div>
               <button className="absolute top-4 right-4 p-3 rounded-full bg-white text-[#ba1a1a] shadow-lg active:scale-90 transition-transform">
                  <Heart size={16} fill="currentColor" />
               </button>
            </div>
            <div className="p-8 space-y-4">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C9A96E] mb-1">{item.category}</p>
                <h4 className="font-serif text-2xl text-[#1b1c1a] leading-none">{item.title}</h4>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#f3eee8]">
                <span className="text-xl font-medium">₹{item.price}</span>
                <button className="text-[9px] font-black uppercase tracking-[0.3em] text-[#1b1c1a] border-b border-[#1b1c1a] pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all">
                   Acquire
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistSection;
