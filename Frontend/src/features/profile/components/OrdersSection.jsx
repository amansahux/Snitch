import React from "react";
import { ShoppingBag, ArrowRight } from "lucide-react";

const OrdersSection = ({ orders, isLoadingOrders, navigate }) => {

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-4xl text-[#1b1c1a]">Order History</h2>
        <p className="font-serif italic text-[#7a6e63]">Your curated archive of acquisitions.</p>
      </div>

      {isLoadingOrders ? (
        <div className="grid gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 w-full bg-[#f3eee8] animate-pulse rounded-[2rem]" />
          ))}
        </div>
      ) : orders.length > 0 ? (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order._id} className="group relative bg-white border border-[#e6dfd5] rounded-[2rem] p-8 shadow-[0_18px_40px_rgba(27,28,26,0.02)] hover:shadow-[0_24px_48px_rgba(27,28,26,0.06)] transition-all duration-500">
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A96E]">Order ID: {order._id}</span>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${order.paymentStatus === 'paid' ? 'bg-[#f3f9f6] text-[#137f4e]' : 'bg-[#fff8f8] text-[#ba1a1a]'}`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#1b1c1a]">
                    {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </h3>
                  <p className="text-[11px] text-[#7a6e63] uppercase tracking-widest">{order.items?.length} Items in this archive</p>
                </div>
                <div className="flex flex-col md:items-end justify-between gap-4">
                  <span className="text-3xl font-semibold text-[#1b1c1a]">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
                  <button 
                    onClick={() => navigate(`/order-success/${order._id}`)}
                    className="flex items-center gap-2 text-[10px] cursor-pointer font-black uppercase tracking-[0.3em] text-[#1b1c1a] border-b border-[#1b1c1a] pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all"
                  >
                    View Details <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-white border border-[#e6dfd5] border-dashed rounded-[2rem]">
          <ShoppingBag className="mx-auto mb-4 text-[#d0c5b5]" size={40} />
          <p className="font-serif italic text-[#7a6e63]">Your collection is currently empty.</p>
          <button onClick={() => navigate("/shop")} className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#1b1c1a] border-b border-[#1b1c1a] pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all">
            Begin Your Journey
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersSection;
