import React, { useState, useEffect } from "react";
import AnalyticsOverview from "../components/dashboard/AnalyticsOverview";
import DashboardSection from "../components/dashboard/DashboardSection";
import OrdersTable from "../components/dashboard/OrdersTable";
import LowStockAlert from "../components/dashboard/LowStockAlert";
import TopProductCard from "../components/dashboard/TopProductCard";
import OrderDrawer from "../components/dashboard/OrderDrawer";
import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useDashboard from "../hooks/useDashboard";
import { useSelector } from "react-redux";

const Overview = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  
  const navigate = useNavigate();
  const { 
    handleGetSellerOrders, 
    handleGetDashboardStats,
    loading 
  } = useDashboard();

  const { stats, sellerOrders, topProducts, stockIntelligence } = useSelector((state) => state.dashboard);

  // 1. Fetch Orders and Stats on Mount (only if not already loaded)
  useEffect(() => {
    const initDashboard = async () => {
      // Avoid redundant calls if data already exists in Redux
      if (sellerOrders.length > 0 && stats) return;

      // Parallel fetch for speed
      await Promise.all([
        handleGetSellerOrders(),
        handleGetDashboardStats(),
      ]);
    };
    initDashboard();
  }, []);

  // 2. Sync Recent Orders
  useEffect(() => {
    if (sellerOrders) {
      setRecentOrders(sellerOrders.slice(0, 9));
    }
  }, [sellerOrders]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  // 3. Map Stats to UI Format
  const dashboardStats = [
    {
      title: "Total Revenue",
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      change: "+0%",
      trend: "up",
      iconType: "revenue",
      description: "Total sales across all channels",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || "0",
      change: "+0%",
      trend: "up",
      iconType: "orders",
      description: "Volume of orders processed",
    },
    {
      title: "Delivered Orders",
      value: stats?.deliveredOrders || "0",
      change: "+0%",
      trend: "up",
      iconType: "customers",
      description: "Orders successfully received",
    },
    {
      title: "Total Products",
      value: stats?.totalProducts || "0",
      change: "+0%",
      trend: "up",
      iconType: "conversion",
      description: "Active products in inventory",
    },
    {
      title: "Cancelled Orders",
      value: stats?.cancelledOrders || "0",
      change: "0%",
      trend: "down",
      iconType: "X",
      description: "Cancelled orders",
    },
    {
      title: "Low Stocks",
      value: stats?.lowStocks || "0",
      change: "0%",
      trend: "down",
      iconType: "exclamation",
      description: "Low stock variants alert",
    },
  ];

  // Show loader only on initial load
  if (loading && !stats) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F6] p-4 md:p-12 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header & Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-2">
            Seller Studio
          </p>
          <h1 className="text-5xl font-serif text-slate-900 leading-tight">
            Dashboard <br /> Overview
          </h1>
        </div>
      </div>

      {/* Stats Grid */}
      <AnalyticsOverview stats={dashboardStats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* Left Column: Recent Orders */}
        <div className="lg:col-span-2">
          <DashboardSection
            title="Recent Collections"
            action={
              <button
                onClick={() => navigate("/seller/orders")}
                className="flex items-center text-[10px] cursor-pointer font-bold uppercase tracking-widest text-gold hover:text-slate-900 transition-colors group"
              >
                Full Logistics{" "}
                <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translateX-1 transition-transform" />
              </button>
            }
          >
            <OrdersTable
              orders={recentOrders}
              onViewDetails={handleViewDetails}
            />
          </DashboardSection>
        </div>

        {/* Right Column: Inventory & Top Products */}
        <div className="space-y-8">
          <DashboardSection title="Inventory Health">
            <LowStockAlert products={stockIntelligence} />
          </DashboardSection>

          <DashboardSection title="Top Performing Products">
            <div className="space-y-4">
              {topProducts.map((product, idx) => (
                <TopProductCard
                  key={idx}
                  product={{
                    name: product.title,
                    sales: product.totalUnits,
                    revenue: product.totalRevenue,
                    rank: product.rank,
                    image: product.image,
                  }}
                />
              ))}
              {topProducts.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-8">
                  No high-performing products yet.
                </p>
              )}
            </div>
          </DashboardSection>
        </div>
      </div>

      {/* Order Detail Drawer */}
      <OrderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default Overview;
