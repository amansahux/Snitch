import React, { useEffect, useState } from "react";
import { Search, Filter, Download, MoreHorizontal } from "lucide-react";
import OrdersTable from "../components/dashboard/OrdersTable";
import OrderCardMobile from "../components/dashboard/OrderCardMobile";
import OrderDrawer from "../components/dashboard/OrderDrawer";
import EmptyState from "../components/dashboard/EmptyState";
import useDashboard from "../hooks/useDashboard";

const ManageOrders = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Orders");

  const { sellerOrders } = useDashboard();

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDrawerOpen(true);
  };

  const filteredOrders = sellerOrders?.filter((order) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      order._id.toLowerCase().includes(searchLower) ||
      order.shippingAddress?.fullName?.toLowerCase().includes(searchLower);

    const matchesStatus =
      activeFilter === "All Orders" ||
      order.orderStatus.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#FBF9F6] p-4 md:p-12 max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-2">
            Operations
          </p>
          <h1 className="text-5xl font-serif text-slate-900 leading-tight">
            Order <br /> Logistics
          </h1>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-amber-100/50 shadow-luxury mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
            <input
              type="text"
              placeholder="IDENTIFY ORDER OR CUSTOMER..."
              className="w-full pl-12 pr-6 py-3 bg-[#FBF9F6] border-none rounded-2xl text-[10px] font-bold uppercase tracking-widest placeholder:text-slate-300 focus:ring-2 focus:ring-gold/20 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {[
              "All Orders",
              "Placed",
              "Shipped",
              "Out_for_Delivery",
              "Delivered",
              "Cancelled",
            ].map((label) => (
              <button
                key={label}
                onClick={() => setActiveFilter(label)}
                className={`flex items-center px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === label
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                    : "bg-white text-slate-400 border border-amber-50 hover:border-gold/30 hover:text-gold"
                }`}
              >
                {label.replace(/_/g, " ")}
              </button>
            ))}
            <div className="h-8 w-px bg-amber-100 mx-2 hidden lg:block"></div>
            <button className="p-3 bg-white border border-amber-100 text-gold rounded-xl hover:bg-amber-50 transition-all">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders?.length > 0 ? (
        <>
          {/* Desktop View */}
          <div className="hidden md:block">
            <OrdersTable
              orders={filteredOrders}
              onViewDetails={handleViewDetails}
            />
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {filteredOrders?.map((order) => (
              <OrderCardMobile
                key={order._id}
                order={order}
                onClick={() => handleViewDetails(order)}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          title="No orders found"
          description={`We couldn't find any orders matching your criteria. Try adjusting your search or filters.`}
          actionLabel="Clear All Filters"
          onAction={() => {
            setSearchQuery("");
            setActiveFilter("All Orders");
          }}
        />
      )}

      {/* Order Detail Drawer */}
      <OrderDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default ManageOrders;
