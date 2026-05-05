import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Clock,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { motion } from "framer-motion";
import useOrder from "../../orders/hooks/useOrder.js";

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGetOrderById } = useOrder();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await handleGetOrderById(id);
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, handleGetOrderById]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C9A96E] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-[#f3eee8] rounded-full flex items-center justify-center mb-6">
          <Package className="text-[#d0c5b5]" size={32} />
        </div>
        <h2 className="font-serif text-3xl mb-4">Order not found</h2>
        <button
          onClick={() => navigate("/profile/orders")}
          className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1b1c1a] border-b-2 border-[#1b1c1a]"
        >
          Return to Orders
        </button>
      </div>
    );
  }

  const getStatusStep = (status) => {
    const stages = ["pending", "confirmed", "shipped", "delivered"];
    const currentIdx = stages.indexOf(status?.toLowerCase()) || 0;
    return currentIdx;
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] font-sans pb-24 selection:bg-[#C9A96E] selection:text-white">
      {/* Premium Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#fbf9f6]/80 backdrop-blur-xl border-b border-[#e6dfd5] px-6 lg:px-16 py-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("/profile/orders")}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] hover:text-[#C9A96E] transition-colors cursor-pointer"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Orders
          </button>
          <div className="hidden lg:flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7a6e63]">
              Order ID:
            </span>
            <span className="text-[11px] font-medium font-mono text-[#1b1c1a]">
              {order._id}
            </span>
          </div>
          <h1 className="font-serif text-xl tracking-[0.2em] font-black lg:hidden">
            DETAIL
          </h1>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-16 py-12 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          {/* LEFT & CENTER: Items & Tracking (Col span 2) */}
          <div className="lg:col-span-2 space-y-16">
            {/* Header Info */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 bg-[#1b1c1a] text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">
                <Clock size={12} className="text-[#C9A96E]" />
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <h2 className="font-serif text-[3.5rem] leading-tight tracking-tight">
                Your Acquisition <br />
                <span className="italic text-[#C9A96E]">is being curated.</span>
              </h2>
            </div>

            {/* Visual Tracking */}
            <div className="relative pt-12 pb-8">
              <div className="absolute top-[3.25rem] left-0 w-full h-[1px] bg-[#e6dfd5]"></div>
              <div className="relative flex justify-between">
                {["Placed", "Processing", "Shipped", "Delivered"].map(
                  (step, idx) => {
                    const isActive = idx <= getStatusStep(order.orderStatus);
                    return (
                      <div
                        key={step}
                        className="flex flex-col items-center gap-4 text-center"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors duration-500 ${isActive ? "bg-[#1b1c1a] text-[#C9A96E]" : "bg-white border border-[#e6dfd5] text-[#d0c5b5]"}`}
                        >
                          {isActive ? (
                            <CheckCircle2 size={18} />
                          ) : (
                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                          )}
                        </div>
                        <span
                          className={`text-[9px] font-black uppercase tracking-[0.2em] ${isActive ? "text-[#1b1c1a]" : "text-[#d0c5b5]"}`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  },
                )}
              </div>
            </div>

            {/* Product List */}
            <div className="space-y-8">
              <h3 className="font-serif text-2xl border-b border-[#e6dfd5] pb-6">
                Manifest of Items
              </h3>
              <div className="divide-y divide-[#f3eee8]">
                {order.items?.map((item) => (
                  <div
                    key={item._id}
                    className="py-8 flex gap-8 items-start group"
                  >
                    <div className="w-24 h-32 lg:w-32 lg:h-40 rounded-2xl overflow-hidden bg-[#fbf9f6] border border-[#f3eee8] shrink-0">
                      <img
                        src={
                          item.product?.images?.[0]?.url ||
                          item.images?.[0]?.url ||
                          "https://placehold.co/400x600/fbf9f6/1b1c1a?text=S"
                        }
                        alt={item.product?.title}
                        className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A96E] mb-1">
                          {item.product?.category || "Apparel"}
                        </p>
                        <h4 className="font-serif text-2xl text-[#1b1c1a]">
                          {item.product?.title}
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-x-8 gap-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#7a6e63]">
                            Variant:
                          </span>
                          <span className="text-sm font-medium">
                            {item.size} | {item.color}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#7a6e63]">
                            Quantity:
                          </span>
                          <span className="text-sm font-medium">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                      <p className="text-xl font-semibold">
                        ₹
                        {(item.discountedPrice || item.price).toLocaleString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary (Sidebar-style detail) */}
          <div className="space-y-10">
            {/* Payment Summary */}
            <div className="bg-[#1b1c1a] text-white rounded-[3rem] p-10 space-y-8 shadow-2xl">
              <h3 className="font-serif text-2xl border-b border-white/10 pb-6">
                Ledger Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/60">
                  <span>Subtotal</span>
                  <span>
                    ₹
                    {(
                      order.totalAmount - (order.shippingCharge || 0)
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/60">
                  <span>Shipping</span>
                  <span>
                    {order.shippingCharge
                      ? `₹${order.shippingCharge.toLocaleString("en-IN")}`
                      : "Complimentary"}
                  </span>
                </div>
                <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#C9A96E]">
                    Grand Total
                  </span>
                  <span className="text-4xl font-semibold">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center text-[#1b1c1a]">
                  <CreditCard size={18} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/60">
                    Payment Status
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#C9A96E]">
                    {order.paymentStatus || "PAID"}
                  </p>
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="bg-white border border-[#e6dfd5] rounded-[3rem] p-10 space-y-6">
              <div className="flex items-center gap-3 text-[#1b1c1a]">
                <MapPin size={20} className="text-[#C9A96E]" />
                <h3 className="font-serif text-2xl">Destination</h3>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#1b1c1a] uppercase tracking-widest">
                  {order.shippingAddress?.fullname}
                </p>
                <p className="text-sm text-[#7a6e63] leading-relaxed">
                  {order.shippingAddress?.streetAddress},<br />
                  {order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
                  - {order.shippingAddress?.pincode}
                </p>
                <p className="text-sm text-[#7a6e63] pt-4">
                  {order.shippingAddress?.contactNumber}
                </p>
              </div>
            </div>

            {/* Brand Assurance */}
            <div className="p-6 border border-[#e6dfd5] rounded-[2.5rem] border-dashed flex items-start gap-4">
              <ShieldCheck className="text-[#C9A96E] shrink-0" size={24} />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">
                  Authenticated Archive
                </p>
                <p className="text-[10px] text-[#7a6e63] leading-relaxed">
                  Each piece is meticulously inspected to meet the SNICH Atelier
                  standards of excellence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Luxury Footer Support */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-[#e6dfd5] py-4 px-6 lg:px-16">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#7a6e63]">
              <Truck size={14} /> Global Logistics
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[#7a6e63]">
              <ShieldCheck size={14} /> Secure Custody
            </div>
          </div>
          <button className="bg-[#1b1c1a] text-white px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#C9A96E] transition-all cursor-pointer">
            Download Invoice
          </button>
        </div>
      </footer>
    </div>
  );
};

export default OrderDetail;
