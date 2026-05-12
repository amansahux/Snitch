import React, { useState } from "react";
import AnalyticsOverview from "../components/dashboard/AnalyticsOverview";
import DashboardSection from "../components/dashboard/DashboardSection";
import OrdersTable from "../components/dashboard/OrdersTable";
import LowStockAlert from "../components/dashboard/LowStockAlert";
import TopProductCard from "../components/dashboard/TopProductCard";
import OrderDrawer from "../components/dashboard/OrderDrawer";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useDashboard from "../hooks/useDashboard";
import { useEffect } from "react";

const Overview = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [recentOrders, setrecentOrders] = useState([]);
  const navigate = useNavigate();
  const { sellerOrders, handleGetSellerOrders } = useDashboard();

  useEffect(() => {
    if (!sellerOrders || sellerOrders?.length === 0) {
      handleGetSellerOrders();
    }
  }, [sellerOrders]);

  useEffect(() => {
    if (sellerOrders) {
      setrecentOrders(sellerOrders.slice(0, 8));
    }
  }, [sellerOrders]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };
  // Hardcoded Data
  const dashboardStats = [
    {
      title: "Total Revenue",
      value: "₹1,28,430",
      change: "+12.5%",
      trend: "up",
      iconType: "revenue",
      description: "Total sales across all channels",
    },
    {
      title: "Total Orders",
      value: "452",
      change: "+18.2%",
      trend: "up",
      iconType: "orders",
      description: "Volume of orders processed",
    },
    {
      title: "New Customers",
      value: "84",
      change: "-2.4%",
      trend: "down",
      iconType: "customers",
      description: "Unique customer acquisitions",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.5%",
      trend: "up",
      iconType: "conversion",
      description: "Visitor to customer ratio",
    },
  ];

  const lowStockProducts = [
    { id: 1, name: "Premium Linen Shirt", sku: "SN-LS-001", stock: 3 },
    { id: 2, name: "Slim Fit Chinos", sku: "SN-CH-005", stock: 5 },
    { id: 3, name: "Graphic Print Tee", sku: "SN-GT-012", stock: 2 },
  ];

  const topProducts = [
    { name: "Oversized Cotton Hoodie", sales: 124, revenue: 371876, rank: 1 },
    { name: "Relaxed Fit Cargo Pants", sales: 98, revenue: 244902, rank: 2 },
    { name: "Classic White Sneakers", sales: 86, revenue: 343914, rank: 3 },
  ];

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
            <LowStockAlert products={lowStockProducts} />
          </DashboardSection>

          <DashboardSection title="Top Performing Products">
            <div className="space-y-4 lg:space-y-9">
              {topProducts.map((product, idx) => (
                <TopProductCard key={idx} product={product} />
              ))}
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
