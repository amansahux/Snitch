import React from "react";
import { ShoppingBag, ArrowRight, Package } from "lucide-react";

const OrdersSection = ({ orders, isLoading, navigate }) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "cancelled":
        return "bg-rose-50 text-rose-600 border-rose-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col gap-3">
        <h2 className="font-serif text-[2.5rem] lg:text-[5rem] leading-tight text-[#1b1c1a]">
          My Orders
        </h2>
        <p className="font-serif italic text-[#7a6e63] text-lg">
         Review your past curations and track upcoming deliveries. Elegance takes time.
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 w-full bg-[#f3eee8] animate-pulse rounded-[2rem] border border-[#e8e2da]/50"
            />
          ))}
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            const firstItem = order.items?.[0];
            const extraItemsCount = (order.items?.length || 0) - 1;
            const displayImage = 
              firstItem?.product?.images?.[0]?.url || 
              firstItem?.images?.[0]?.url || 
              firstItem?.product?.coverImage?.url ||
              "/placeholder-product.jpg";

            return (
              <div
                key={order._id}
                className="group relative bg-white border border-[#e8e2da] rounded-[2rem] p-6 lg:p-8 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(27,28,26,0.08)] hover:-translate-y-1"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* LEFT SIDE: Image */}
                  <div className="relative shrink-0">
                    <div className="w-full lg:w-32 h-48 lg:h-40 rounded-2xl overflow-hidden bg-[#fbf9f6] border border-[#f3eee8]">
                      <img
                        src={displayImage}
                        alt={firstItem?.product?.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                           e.target.src = "https://placehold.co/400x600/fbf9f6/1b1c1a?text=S";
                        }}
                      />
                    </div>
                    {extraItemsCount > 0 && (
                      <div className="absolute -bottom-3 -right-3 bg-[#1b1c1a] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-xl border-2 border-white">
                        +{extraItemsCount} MORE
                      </div>
                    )}
                  </div>

                  {/* CENTER: Details */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9A96E]">
                          {firstItem?.product?.category }
                        </p>
                        <h3 className="font-serif text-2xl text-[#1b1c1a] line-clamp-1">
                          {firstItem?.product?.title }
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#7a6e63]">
                            Variant:
                          </span>
                          <span className="text-sm font-medium text-[#1b1c1a]">
                            Size {firstItem?.size || "M"} | {firstItem?.color}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-widest text-[#7a6e63]">
                            Quantity:
                          </span>
                          <span className="text-sm font-medium text-[#1b1c1a]">
                            Qty {firstItem?.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#7a6e63]">
                          Acquired on:
                        </span>
                        <span className="text-sm font-serif italic text-[#1b1c1a]">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Action & Status */}
                  <div className="flex lg:flex-col justify-between items-end lg:items-end py-1 lg:w-48 gap-4">
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-3xl font-semibold text-[#1b1c1a]">
                        ₹{(order.totalAmount || 0).toLocaleString("en-IN")}
                      </span>
                      <div
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${getStatusStyle(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus || "Pending"}
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/profiles/orders/${order._id}`)}
                      className="group/btn flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#1b1c1a] border-b-2 border-[#1b1c1a]/10 pb-1.5 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all cursor-pointer whitespace-nowrap"
                    >
                      View Details
                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover/btn:translate-x-1.5"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-24 text-center bg-white border border-[#e8e2da] border-dashed rounded-[3rem] px-8">
          <div className="w-20 h-20 bg-[#fbf9f6] rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <ShoppingBag className="text-[#d0c5b5]" size={32} />
          </div>
          <h3 className="font-serif text-3xl text-[#1b1c1a] mb-4">
            Your wardrobe is waiting.
          </h3>
          <p className="font-serif italic text-[#7a6e63] mb-10 max-w-sm mx-auto">
            It seems you haven't added any pieces to your personal archive yet.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-4 bg-[#1b1c1a] text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#C9A96E] hover:text-white transition-all duration-500 shadow-2xl active:scale-[0.98] cursor-pointer"
          >
            Start Shopping
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersSection;
