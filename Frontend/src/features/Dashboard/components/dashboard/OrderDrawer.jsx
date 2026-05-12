import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Package,
  Truck,
  CreditCard,
  User,
  Mail,
  MapPin,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import ShipmentTimeline from "./ShipmentTimeline";
import useDashboard from "../../hooks/useDashboard";

const OrderDrawer = ({ isOpen, onClose, order }) => {
  const { handleUpdateOrderStatus, handleUpdatePaymentStatus } = useDashboard();
  if (!order) return null;

  const STATUS_SEQUENCE = ["placed", "shipped", "out_for_delivery", "delivered"];
  const currentStatusIndex = STATUS_SEQUENCE.indexOf(order?.orderStatus);
  const isCancelled = order?.orderStatus === "cancelled";
  const isDelivered = order?.orderStatus === "delivered";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-lg bg-[#FBF9F6] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-[101] flex flex-col overflow-hidden"
          >
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            {/* Header */}
            <div className="relative p-8 border-b border-amber-100 flex items-center justify-between bg-white/50 backdrop-blur-xl">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-1">Order Logistics</p>
                <h3 className="text-3xl font-serif text-slate-900">
                  Collection Details
                </h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 px-3 py-1 bg-amber-50 rounded-full inline-block">
                  ID: {order._id}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-3 hover:bg-amber-50 cursor-pointer rounded-2xl text-slate-400 hover:text-gold transition-all duration-300 border border-transparent hover:border-amber-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar relative z-10">
              {/* Status Section */}
              <div className="p-6 bg-white rounded-3xl border border-amber-100 shadow-luxury flex items-center justify-between group hover:border-gold/30 transition-colors">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Current Status</p>
                  <StatusBadge status={order?.orderStatus} />
                </div>
                <div className="h-10 w-px bg-amber-100"></div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">Payment</p>
                  <div className="flex items-center justify-end">
                    <CreditCard className="w-3.5 h-3.5 mr-2 text-gold" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-900">
                      {order?.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] flex items-center">
                    <User className="w-4 h-4 mr-3" />
                    Client Profile
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-5 bg-white rounded-2xl border border-amber-50 flex items-start">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mr-4 shrink-0">
                       <User className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
                      <p className="text-sm font-bold text-slate-900">{order?.shippingAddress?.fullName}</p>
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-amber-50 flex items-start">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mr-4 shrink-0">
                       <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email Address</p>
                      <p className="text-sm font-bold text-slate-900">{order?.user?.email}</p>
                    </div>
                  </div>

                  <div className="p-5 bg-white rounded-2xl border border-amber-50 flex items-start">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mr-4 shrink-0">
                       <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Destination</p>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">
                        {order?.shippingAddress?.address},<br />
                        {order?.shippingAddress?.town}, {order?.shippingAddress?.state} — {order?.shippingAddress?.pinCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] flex items-center">
                  <Package className="w-4 h-4 mr-3" />
                  Manifest Items
                </h4>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="group p-4 bg-white rounded-2xl border border-amber-50 flex items-center justify-between hover:border-gold/30 transition-all duration-300"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-16 h-20 bg-[#FBF9F6] rounded-xl mr-5 bg-cover bg-center border border-amber-50 shadow-sm"
                          style={{
                            backgroundImage: `url(${item?.variant?.images?.[0].url})`,
                          }}
                        ></div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-gold transition-colors">
                            {item?.product?.title}
                          </p>
                          <div className="flex items-center mt-2 space-x-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 py-0.5 bg-amber-50 rounded">Qty: {item?.quantity}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2 py-0.5 bg-amber-50 rounded">{item?.size} / {item?.color}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-serif text-slate-900">
                          ₹{(item?.discountedPrice * item?.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Timeline */}
              <div className="space-y-6 pb-8">
                <h4 className="text-[10px] font-bold text-gold uppercase tracking-[0.3em] flex items-center">
                  <Truck className="w-4 h-4 mr-3" />
                  Shipment Tracking
                </h4>
                <div className="p-6 bg-white rounded-3xl border border-amber-100">
                   <ShipmentTimeline currentStatus={order?.orderStatus} />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="relative p-8 border-t border-amber-100 bg-white/80 backdrop-blur-xl z-20">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Valuation</p>
                  <span className="text-3xl font-serif text-slate-900">
                    ₹{order?.totalAmount?.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                   <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Inclusive of GST</p>
                </div>
              </div>

              {/* Status Update Controls */}
              {!isCancelled && !isDelivered && (
                <div className="mb-6">
                  <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-4">
                    Advance Order Workflow
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["placed", "shipped", "out_for_delivery", "delivered", "cancelled"].map(
                      (status) => {
                        const statusIndex = STATUS_SEQUENCE.indexOf(status);
                        const isBackward =
                          statusIndex !== -1 &&
                          currentStatusIndex !== -1 &&
                          statusIndex <= currentStatusIndex;

                        const isDisabled = status !== "cancelled" && isBackward;

                        return (
                          <button
                            key={status}
                            disabled={isDisabled}
                            onClick={async () => {
                              const response = await handleUpdateOrderStatus(
                                order._id,
                                status
                              );
                              if (response?.success) {
                                onClose();
                              }
                            }}
                            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                              order.orderStatus === status
                                ? "bg-gold text-white shadow-lg shadow-gold/20"
                                : isDisabled
                                ? "bg-slate-50 border border-slate-100 text-slate-300 cursor-not-allowed opacity-60"
                                : "bg-white border border-amber-50 text-slate-400 hover:border-gold/30 hover:text-gold cursor-pointer"
                            }`}
                          >
                            {status.replace(/_/g, " ")}
                          </button>
                        );
                      }
                    )}
                  </div>
                </div>
              )}

              {/* Payment Status Update Controls */}
              <div className="mb-6">
                <p className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] mb-4">
                  Payment Settlement
                </p>
                <div className="flex flex-wrap gap-2">
                  {["paid", "refunded", "failed"].map((pStatus) => {
                    const isPaymentFailed = order.paymentStatus === "failed";
                    const isPaymentRefunded = order.paymentStatus === "refunded";
                    const isAfterPlaced = currentStatusIndex >= 1; // index 1 is 'shipped'
                    
                    // Logic: 
                    // 1. If failed, nothing is changeable.
                    // 2. If refunded, cannot go back to paid.
                    // 3. If refunded, cannot go to failed.
                    // 4. If order is shipped or beyond, cannot mark as refunded or failed from here.
                    const isPStatusDisabled = 
                      isPaymentFailed || 
                      (isPaymentRefunded && (pStatus === "paid" || pStatus === "failed")) ||
                      (isAfterPlaced && (pStatus === "refunded" || pStatus === "failed"));

                    return (
                      <button
                        key={pStatus}
                        disabled={isPStatusDisabled}
                        onClick={async () => {
                          const response = await handleUpdatePaymentStatus(
                            order._id,
                            pStatus
                          );
                          if (response?.success) {
                            onClose();
                          }
                        }}
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                          order.paymentStatus === pStatus
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                            : isPStatusDisabled
                            ? "bg-slate-50 border border-slate-100 text-slate-300 cursor-not-allowed opacity-60"
                            : "bg-white border border-amber-50 text-slate-400 hover:border-emerald-300 hover:text-emerald-600 cursor-pointer"
                        }`}
                      >
                        {pStatus}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1">
                 <button 
                  onClick={onClose}
                  className="bg-slate-900 text-white cursor-pointer text-[10px] font-bold uppercase tracking-widest py-4 rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200"
                 >
                    Close Manifest
                 </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderDrawer;
