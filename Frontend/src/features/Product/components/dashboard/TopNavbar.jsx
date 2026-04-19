import React, { useState } from "react";
import { Menu, Bell, Search, Sparkles } from "lucide-react";

const TopNavbar = ({ onMenuClick, pageTitle = "Dashboard", user }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  
  const initials = user?.fullname
    ? user.fullname
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "S";

  return (
    <header className="h-20 bg-cream border-b border-charcoal/5 flex items-center justify-between px-6 lg:px-10 flex-shrink-0 sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center w-10 h-10 rounded-xl text-charcoal/40 hover:text-charcoal hover:bg-gold/5 transition-all lg:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="hidden sm:block">
           <div className="flex items-center gap-2">
              <h1 className="text-xl font-serif text-charcoal leading-none">
                {pageTitle}
              </h1>
              <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
           </div>
           <p className="text-[9px] font-black uppercase tracking-[0.2em] text-charcoal/30 mt-1">
             Curated Atelier Dashboard
           </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Luxury Desktop Search */}
        <div className="hidden md:block relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-charcoal/20 group-focus-within:text-gold transition-colors pointer-events-none" />
          <input
            type="text"
            placeholder="Search archive..."
            className="pl-10 pr-4 py-2.5 w-64 bg-white border border-charcoal/5 rounded-xl text-[11px] font-bold tracking-wider text-charcoal placeholder-charcoal/20 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 transition-all"
          />
        </div>

        {/* Mobile search toggle */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-charcoal/40 hover:text-charcoal hover:bg-gold/5 transition-all cursor-pointer"
          onClick={() => setSearchOpen((p) => !p)}
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <button
          className="relative flex items-center justify-center w-10 h-10 rounded-xl text-charcoal/40 hover:text-charcoal hover:bg-gold/5 transition-all cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-gold rounded-full ring-2 ring-cream" />
        </button>

        <div className="w-[1px] h-6 bg-charcoal/5 mx-1 hidden sm:block"></div>

        {/* User Status */}
        <div className="flex items-center gap-3 pl-2">
            <div className="hidden xl:block text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-charcoal leading-none">Pro Seller</p>
                <p className="text-[9px] font-bold text-gold uppercase tracking-tighter mt-1 flex items-center justify-end gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> Luxury Tier
                </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#C9A96E] text-white flex items-center justify-center text-xs font-bold ring-4 ring-gold/5 cursor-pointer hover:bg-gold transition-all duration-300">
                {initials}
            </div>
        </div>
      </div>

      {/* Mobile search expanded */}
      {searchOpen && (
        <div className="absolute top-20 left-0 right-0 bg-cream/95 backdrop-blur-xl border-b border-charcoal/5 p-4 md:hidden animate-in slide-in-from-top-4 duration-300">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/20 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-charcoal/5 rounded-xl text-xs text-charcoal focus:outline-none focus:border-gold transition-all"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNavbar;
