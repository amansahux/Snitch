import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Plus,
  Settings,
  SquareArrowRightExit,
  X,
  Zap,
} from "lucide-react";
import useAuth from "../../../Auth/hooks/useAuth.js";

const NAV_LINKS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/seller/dashboard",
    end: true,
  },
  { label: "Products", icon: Package, to: "/seller/products" },
  { label: "Add Product", icon: Plus, to: "/seller/create-product" },
  { label: "Buyer", icon: SquareArrowRightExit,to:"/"  },
];

const NavItem = ({ link, collapsed, onClick }) => {
  const { label, icon: Icon, to, end } = link;

  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
          isActive
            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
            : "text-zinc-400 hover:text-white hover:bg-zinc-800"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-yellow-500 rounded-r-full" />
          )}
          <Icon
            className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
              isActive ? "text-yellow-400" : ""
            }`}
          />
          {!collapsed && (
            <span className="text-sm font-semibold tracking-wide truncate">
              {label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-950 border-r border-zinc-800 z-40 flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-black" strokeWidth={3} />
            </div>
            <span className="text-lg font-black tracking-widest text-white uppercase">
              SNITCH
            </span>
          </div>
          {/* Close (mobile only) */}
          <button
            onClick={onClose}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Seller label */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">
            Seller Panel
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.to} link={link} onClose={onClose} />
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-5 py-5 border-t border-zinc-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="w-8 h-8 rounded-full bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-yellow-400 text-xs font-bold">
              {user?.fullname[0]}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-200 truncate">
                {user?.fullname}
              </p>
              <p className="text-[10px] text-zinc-500 truncate">
                Verified Store
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
