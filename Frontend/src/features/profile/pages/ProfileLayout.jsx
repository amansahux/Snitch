import React, { useState } from "react";
import { useNavigate, Outlet, Navigate, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  User,
  MapPin,
  Heart,
  LayoutDashboard,
  Menu,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-hot-toast";

// Hooks
import useAuth from "../../Auth/hooks/useAuth.js";

// Components
import Sidebar from "../components/Sidebar.jsx";
import LogoutModal from "../components/LogoutModal.jsx";

const ProfileLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, handleLogout } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navItems = [
    { id: "orders", label: "My Orders", icon: ShoppingBag, path: "/profile/orders" },
    { id: "settings", label: "Profile Info", icon: User, path: "/profile/account/profile" },
    { id: "addresses", label: "Manage Address", icon: MapPin, path: "/profile/account/address" },
    { id: "wishlist", label: "Wishlist", icon: Heart, path: "/profile/wishlist" },
  ];

  if (user?.role === "seller") {
    navItems.push({
      id: "dashboard",
      label: "Seller Dashboard",
      icon: LayoutDashboard,
      path: "/seller/dashboard",
      action: () => navigate("/seller/dashboard"),
    });
  }

  // Redirect to /profile/orders if on /profile
  if (location.pathname === "/profile" || location.pathname === "/profile/") {
    return <Navigate to="/profile/orders" replace />;
  }

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] font-sans selection:bg-[#C9A96E] selection:text-white">
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-50 bg-[#fbf9f6]/80 backdrop-blur-xl border-b border-[#e6dfd5] px-6 py-4 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-black tracking-widest">
          SNICH<span className="text-[#C9A96E]">.</span>
        </h1>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-full hover:bg-[#f3eee8] cursor-pointer transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto flex">
        <Sidebar
          user={user}
          navItems={navItems}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setShowLogoutModal={setShowLogoutModal}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen px-6 py-10 lg:px-16 lg:py-20 overflow-y-auto no-scrollbar">
          <div className="max-w-[900px]">
            {/* Back to Home Button */}
            <button
              onClick={() => navigate("/")}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] hover:text-[#C9A96E] transition-all duration-500 cursor-pointer mb-12"
            >
              <div className="w-8 h-8 rounded-full border border-[#e6dfd5] flex items-center justify-center group-hover:border-[#C9A96E] transition-all">
                <ArrowLeft size={14} />
              </div>
              Return to Store
            </button>
            <Outlet />
          </div>
        </main>
      </div>

      <LogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
        handleLogout={handleLogout}
        navigate={navigate}
        toast={toast}
      />
    </div>
  );
};

export default ProfileLayout;
