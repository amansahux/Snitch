import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Package, 
  MapPin, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  Truck,
  FileDown,
  XCircle,
  Phone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Derived financial data
  const financials = useMemo(() => {
    if (!order) return { totalMRP: 0, discount: 0, shipping: 0 };
    const totalMRP = order.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;
    const finalAmount = order.totalAmount || 0;
    const discount = totalMRP - finalAmount;
    return { totalMRP, discount, shipping: 0 }; // Default shipping to 0/Free if not in schema
  }, [order]);

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
        <h2 className="font-serif text-3xl mb-4 text-[#1b1c1a]">Order not found</h2>
        <button 
          onClick={() => navigate("/profile/orders")}
          className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1b1c1a] border-b-2 border-[#1b1c1a] cursor-pointer"
        >
          Return to Orders
        </button>
      </div>
    );
  }

  const getStatusStep = (status) => {
    const s = status?.toLowerCase();
    if (s === "delivered") return 2;
    if (s === "shipped") return 1;
    if (s === "placed" || s === "confirmed") return 0;
    return -1;
  };

  return (
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] font-sans pb-32 selection:bg-[#C9A96E] selection:text-white">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-[100] bg-[#fbf9f6]/80 backdrop-blur-2xl border-b border-[#e6dfd5]/30 px-6 lg:px-16 py-6 transition-all duration-500">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate("/profile/orders")}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] hover:text-[#C9A96E] transition-all duration-500 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border border-[#e6dfd5] flex items-center justify-center group-hover:border-[#C9A96E] transition-all">
               <ArrowLeft size={14} />
            </div>
            Back to Orders
          </button>
          <div className="hidden lg:flex items-center gap-4">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7a6e63]">Official Manifest</span>
             <div className="w-px h-4 bg-[#e6dfd5]" />
             <span className="text-[11px] font-bold font-mono text-[#1b1c1a]">#{order._id.slice(-8).toUpperCase()}</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-16 py-12 lg:py-16">
        
        {/* Order Identifier Header */}
        <div className="mb-12 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="font-serif text-[2.5rem] lg:text-[3.5rem] leading-none text-[#1b1c1a]">
            Order <span className="text-[#7a6e63]">#SN-{order._id.slice(-8).toUpperCase()}</span>
          </h1>
          <div className="flex flex-wrap items-center gap-6">
            <p className="text-sm font-medium text-[#7a6e63]">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            <div className="flex gap-2">
              <span className="px-4 py-1 rounded-full bg-[#efeeeb] text-[9px] font-black uppercase tracking-widest text-[#1b1c1a]">
                {order.paymentStatus}
              </span>
              <span className="px-4 py-1 rounded-full bg-[#C9A96E]/20 text-[9px] font-black uppercase tracking-widest text-[#C9A96E]">
                {order.orderStatus}
              </span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT: Tracking & Items (Col 7) */}
          <div className="lg:col-span-7 space-y-16">
            
            {/* Order Status Timeline */}
            <section className="bg-white rounded-[3rem] p-10 lg:p-12 border border-[#e6dfd5]/20 shadow-sm">
              <h3 className="font-serif text-2xl mb-12 text-[#1b1c1a]">Order Status</h3>
              <div className="space-y-0 relative">
                {/* Background Line */}
                <div className="absolute left-[1.2rem] top-2 bottom-2 w-px bg-[#f3eee8]" />
                
                {/* Dynamic Progress Line */}
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ 
                    height: getStatusStep(order.orderStatus) === 0 ? "0%" : 
                            getStatusStep(order.orderStatus) === 1 ? "50%" : "100%" 
                  }}
                  className="absolute left-[1.2rem] top-2 w-px bg-[#C9A96E] z-0 transition-all duration-1000"
                />
                
                {[
                  { label: "Order Placed", note: new Date(order.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) },
                  { label: "Shipped", note: order.orderStatus === "placed" ? "Awaiting dispatch" : "In transit to destination" },
                  { label: "Delivered", note: order.orderStatus === "delivered" ? "Successfully received" : "Estimated: 2 days - 5 days" }
                ].map((step, idx) => {
                  const currentStep = getStatusStep(order.orderStatus);
                  const isCompleted = currentStep >= idx;
                  const isCurrent = currentStep === idx;
                  
                  return (
                    <div key={idx} className={`relative pl-14 pb-16 last:pb-0 transition-opacity duration-500 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                      {/* Node */}
                      <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-700 shadow-sm ${isCompleted ? 'bg-[#C9A96E] text-white' : 'bg-white border border-[#e6dfd5] text-[#d0c5b5]'}`}>
                        {isCompleted ? <CheckCircle2 size={18} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                      </div>
                      
                      <div className="space-y-1">
                        <p className={`text-xl font-serif ${isCompleted ? 'text-[#1b1c1a]' : 'text-[#7a6e63]'}`}>{step.label}</p>
                        <p className="text-xs text-[#7a6e63] font-medium tracking-wide">{step.note}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Items List */}
            <section className="space-y-8">
              <h3 className="font-serif text-2xl text-[#1b1c1a]">Items</h3>
              <div className="space-y-6">
                {order.items?.map((item) => (
                  <motion.div 
                    layout
                    key={item._id} 
                    className="group bg-white rounded-[2.5rem] p-6 lg:p-8 flex flex-col sm:flex-row gap-8 hover:shadow-[0_40px_80px_rgba(27,28,26,0.06)] transition-all duration-700"
                  >
                    <div className="w-full sm:w-40 h-56 lg:h-64 rounded-[1.5rem] overflow-hidden bg-[#fbf9f6] shrink-0 border border-[#f3eee8]">
                      <img 
                        src={item.product?.coverImage?.url || item.images?.[0]?.url || "https://placehold.co/400x600/fbf9f6/1b1c1a?text=S"} 
                        alt={item.product?.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C9A96E]">{item.product?.category}</p>
                          <h4 className="font-serif text-2xl text-[#1b1c1a] leading-tight">{item.product?.title}</h4>
                        </div>
                        <div className="flex flex-wrap gap-x-8 gap-y-2">
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-[#7a6e63]">Size:</span>
                              <span className="text-[11px] font-black uppercase tracking-widest">{item.size}</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-[#7a6e63]">Color:</span>
                              <span className="text-[11px] font-black uppercase tracking-widest">{item.color}</span>
                           </div>
                        </div>
                        <div className="pt-2 flex items-baseline gap-4">
                          <span className="text-[#7a6e63] line-through text-sm">₹{item.price.toLocaleString('en-IN')}</span>
                          <span className="text-xl font-serif font-bold text-[#1b1c1a]">₹{item.discountedPrice.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <div className="pt-6 border-t border-[#f3eee8] flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#7a6e63]">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT: Financials & Address (Col 5) */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32">
            
            {/* Order Summary */}
            <section className="bg-white/60 backdrop-blur-sm rounded-[3rem] p-10 lg:p-12 space-y-10 border border-[#e6dfd5]/20">
              <h3 className="font-serif text-2xl text-[#1b1c1a]">Order Summary</h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center text-sm font-medium text-[#7a6e63]">
                  <span>Total MRP</span>
                  <span>₹{financials.totalMRP.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-[#7a6e63]">
                  <span>Discount on MRP</span>
                  <span className="text-emerald-600">- ₹{financials.discount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-[#7a6e63]">
                  <span>Shipping Fee</span>
                  <span className="text-emerald-600">{financials.shipping === 0 ? 'Free' : `₹${financials.shipping}`}</span>
                </div>
                <div className="h-px bg-[#e6dfd5] w-full" />
                <div className="flex justify-between items-end pt-2">
                  <span className="text-[15px] font-black uppercase tracking-[0.3em] text-[#1b1c1a]">Final Amount</span>
                  <span className="text-4xl font-serif font-black text-[#1b1c1a]">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section className="bg-white/60 backdrop-blur-sm rounded-[3rem] p-10 lg:p-12 space-y-8 border border-[#e6dfd5]/20">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-[#C9A96E]" />
                <h3 className="font-serif text-2xl text-[#1b1c1a]">Shipping Address</h3>
              </div>
              <div className="space-y-6">
                <div>
                   <p className="font-serif text-xl mb-2">{order.shippingAddress?.fullName}</p>
                   <p className="text-sm leading-relaxed text-[#7a6e63]">
                      {order.shippingAddress?.address}, {order.shippingAddress?.town}<br />
                      {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}<br />
                      <span className="italic text-[#d0c5b5]">{order.shippingAddress?.landmark}</span>
                   </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-[#f3eee8]">
                   <Phone size={14} className="text-[#7a6e63]" />
                   <span className="text-sm font-medium text-[#1b1c1a]">+91 {order.shippingAddress?.mobile}</span>
                </div>
              </div>
            </section>

            {/* Support Actions */}
            <div className="grid grid-cols-2 gap-4">
               <button className="flex items-center justify-center gap-3 bg-[#C9A96E]/10 text-[#C9A96E] py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#C9A96E] hover:text-white transition-all duration-500 cursor-pointer">
                  <FileDown size={16} /> Invoice
               </button>
               <button 
                disabled={["shipped", "delivered", "cancelled"].includes(order.orderStatus?.toLowerCase())}
                className={`flex items-center justify-center gap-3 py-5 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 
                  ${["shipped", "delivered", "cancelled"].includes(order.orderStatus?.toLowerCase())
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-50' 
                    : 'bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white cursor-pointer'}`}
               >
                  <XCircle size={16} /> Cancel
               </button>
            </div>

          </div>

        </div>
      </main>

      {/* Brand Assurance Bar */}
      <footer className="mt-12 py-12 border-t border-[#e6dfd5]/30">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60">
           <div className="flex items-center gap-4">
              <ShieldCheck className="text-[#C9A96E]" size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Insured Custody</span>
           </div>
           <div className="flex items-center gap-4">
              <Truck className="text-[#C9A96E]" size={20} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Global Logistics</span>
           </div>
           <p className="text-[9px] font-medium uppercase tracking-widest">© 2024 SNICH ATELIER</p>
        </div>
      </footer>
    </div>
  );
};

export default OrderDetail;
