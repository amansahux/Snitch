import React, { useState } from "react";
import { Menu, Bell, Search } from "lucide-react";

const TopNavbar = ({ onMenuClick, pageTitle = "Dashboard", user }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  // console.log(user);
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "S";

  return (
    <header className="h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 lg:px-6 flex-shrink-0 sticky top-0 z-20">
      {/* Left — hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex items-center justify-center w-9 h-9 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors lg:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-sm font-bold text-zinc-100 tracking-wide lg:text-base">
            {pageTitle}
          </h1>
          <p className="text-[10px] text-zinc-500 hidden sm:block">
            Seller Dashboard
          </p>
        </div>
      </div>

      {/* Right — search, notifications, avatar */}
      <div className="flex items-center gap-2">
        {/* Search (expandable on mobile) */}
        <div className={`hidden md:flex relative`}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Quick search..."
            className="pl-8 pr-4 py-2 w-52 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 transition-all"
          />
        </div>

        {/* Mobile search toggle */}
        <button
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          onClick={() => setSearchOpen((p) => !p)}
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <button
          className="relative flex items-center justify-center w-9 h-9 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-500 rounded-full ring-2 ring-zinc-950" />
        </button>

        {/* Avatar */}
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-xs font-bold cursor-pointer hover:bg-yellow-500/30 transition-colors select-none">
          {initials}
        </div>
      </div>

      {/* Mobile search bar (expanded) */}
      {searchOpen && (
        <div className="absolute top-16 left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              autoFocus
              className="w-full pl-9 pr-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-yellow-500 transition-all"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNavbar;
