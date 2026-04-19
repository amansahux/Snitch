import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Plus,
  X,
  ArrowRightLeft,
  Settings,
  ShieldCheck,
} from "lucide-react";
import useAuth from "../../../Auth/hooks/useAuth.js";

const NAV_LINKS = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    to: "/seller/dashboard",
    end: true,
  },
  { label: "Inventory", icon: Package, to: "/seller/products" },
  { label: "New Piece", icon: Plus, to: "/seller/create-product" },
  { label: "Switch to Shop", icon: ArrowRightLeft, to: "/" },
];

const NavItem = ({ link, onClick }) => {
  const { label, icon: Icon, to, end } = link;

  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
          isActive
            ? "bg-gold text-white shadow-luxury"
            : "text-charcoal-light hover:text-charcoal hover:bg-gold/5"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${
              isActive ? "text-white" : "text-charcoal-light group-hover:text-gold"
            }`}
          />
          <span className={`text-[11px] font-bold uppercase tracking-[0.2em] truncate ${
            isActive ? "text-white" : "text-charcoal-light group-hover:text-charcoal"
          }`}>
            {label}
          </span>
          {isActive && (
            <div className="absolute right-3 w-1 h-1 bg-white rounded-full"></div>
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
          className="fixed inset-0 bg-charcoal/20 backdrop-blur-md z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-cream border-r border-charcoal/5 z-[70] flex flex-col transition-transform duration-500 ease-in-out no-scrollbar
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto lg:h-screen lg:sticky`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between px-8 py-10">
          <Link to="/" className="text-3xl font-serif font-bold tracking-[0.3em] text-charcoal">
            SNICH<span className="text-gold">.</span>
          </Link>
          
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl text-charcoal/40 hover:text-charcoal hover:bg-gold/5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Studio Label */}
        <div className="px-8 mb-6">
          <div className="flex items-center gap-3">
             <span className="w-4 h-[1px] bg-gold/30"></span>
             <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gold">Seller Studio</p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
          {NAV_LINKS.map((link) => (
            <NavItem key={link.to} link={link} onClick={onClose} />
          ))}
        </nav>

        {/* Footer Profile Section */}
        <div className="p-6">
          <div className="p-4 rounded-[1.5rem] bg-white shadow-luxury border border-charcoal/5 flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-cream-dark border border-charcoal/5 flex items-center justify-center text-gold font-serif text-lg overflow-hidden relative">
              {user?.avatar ? (
                <img src={user.avatar} className="w-full h-full object-cover" alt="Avatar" />
              ) : (
                user?.fullname?.[0] || 'S'
              )}
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="min-w-0 pr-2">
              <p className="text-xs font-bold text-charcoal truncate tracking-tight">{user?.fullname}</p>
              <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-2.5 h-2.5 text-gold" />
                  <p className="text-[9px] text-charcoal-light font-medium uppercase tracking-widest">Atelier Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
