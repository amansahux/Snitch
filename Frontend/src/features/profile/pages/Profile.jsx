import React, { useState, useEffect } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import {
  ShoppingBag,
  User,
  MapPin,
  Heart,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import { toast } from "react-hot-toast";

// Hooks
import useAuth from "../../Auth/hooks/useAuth.js";
import useOrder from "../../orders/hooks/useOrder.js";

// Components
import Sidebar from "../components/Sidebar.jsx";
import OrdersSection from "../components/OrdersSection.jsx";
import AccountInfo from "../components/AccountInfo.jsx";
import WishlistSection from "../components/WishlistSection.jsx";
import LogoutModal from "../components/LogoutModal.jsx";
import AddressManager from "../../address/pages/AddressManager.jsx";
import { useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, handleLogout } = useAuth();
  const {orders, isLoading} = useSelector((state)=> state.order)
  const {handleGetOrders} = useOrder()

  const [activeTab, setActiveTab] = useState("orders");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (activeTab === "orders") {
      handleGetOrders();
    }
  }, [activeTab]);

  const navItems = [
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "settings", label: "Account Settings", icon: User },
    { id: "addresses", label: "Manage Addresses", icon: MapPin },
    { id: "wishlist", label: "My Wishlist", icon: Heart },
  ];

  if (user?.role === "seller") {
    navItems.push({
      id: "dashboard",
      label: "Seller Dashboard",
      icon: LayoutDashboard,
      action: () => navigate("/seller/dashboard"),
    });
  }

  const handleNavClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      setActiveTab(item.id);
    }
    setIsMobileMenuOpen(false);
  };

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
          activeTab={activeTab}
          handleNavClick={handleNavClick}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          setShowLogoutModal={setShowLogoutModal}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen px-6 py-10 lg:px-16 lg:py-20 overflow-y-auto no-scrollbar">
          <div className="max-w-[900px]">
            {id ? (
              <Outlet />
            ) : (
              <>
                {activeTab === "orders" && (
                  <OrdersSection
                    orders={orders}
                    isLoading={isLoading}
                    navigate={navigate}
                  />
                )}
                {activeTab === "settings" && <AccountInfo user={user} />}
                {activeTab === "addresses" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex flex-col gap-2">
                      <h2 className="font-serif text-4xl text-[#1b1c1a]">
                        Managed Addresses
                      </h2>
                      <p className="font-serif italic text-[#7a6e63]">
                        Where your acquisitions meet their destination.
                      </p>
                    </div>
                    <AddressManager />
                  </div>
                )}
                {activeTab === "wishlist" && <WishlistSection />}
              </>
            )}
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

export default Profile;
