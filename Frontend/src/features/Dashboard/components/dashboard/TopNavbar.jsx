import React from "react";
import { Menu, Bell, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopNavbar = ({ onMenuClick, pageTitle = "Dashboard", user }) => {
  const navigate = useNavigate();

  return (
    <header className="h-20 bg-cream border-b border-charcoal/5 flex items-center justify-between px-6 lg:px-10 flex-shrink-0 sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center w-10 h-10 rounded-xl text-charcoal/40 hover:text-charcoal hover:bg-gold/5 transition-all cursor-pointer"
          aria-label="Toggle sidebar"
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
        {/* Notifications */}
        <button className="relative flex items-center justify-center w-10 h-10 rounded-xl text-charcoal/40 hover:text-charcoal hover:bg-gold/5 transition-all cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-gold rounded-full ring-2 ring-cream" />
        </button>

        <div className="w-[1px] h-6 bg-charcoal/5 mx-1 hidden sm:block"></div>

        {/* User Status */}
        <div onClick={() => { navigate("/profile/orders") }} className="flex items-center gap-3 pl-2">
          <div className="hidden xl:block text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-charcoal leading-none">
              Pro Seller
            </p>
            <p className="text-[9px] font-bold text-gold uppercase tracking-tighter mt-1 flex items-center justify-end gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Luxury Tier
            </p>
          </div>
          <div className="w-10 h-10 overflow-hidden rounded-full bg-[#C9A96E] text-white flex items-center justify-center text-xs font-bold ring-4 ring-gold/5 cursor-pointer hover:bg-gold transition-all duration-300">
           {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt="profile picture"
                  className="h-full w-full object-cover overflow-hidden"
                />
              ) : (
                user?.fullname?.[0]?.toUpperCase()
              )}
          </div>
        </div>
      </div>

    </header>
  );
};

export default TopNavbar;
