import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import useAuth from "../../../Auth/hooks/useAuth";

const SellerLayout = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Set sidebar closed on mobile by default
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F6] flex font-sans overflow-x-hidden no-scrollbar">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          pageTitle="Seller Studio"
          user={user}
        />

        <div className="flex-1 overflow-x-hidden">
          <Outlet context={{ sidebarOpen, setSidebarOpen }} />
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
