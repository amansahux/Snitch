import React from "react";
import StatusBadge from "./StatusBadge";
import ActionDropdown from "./ActionDropdown";

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=200";

const formatPrice = (price, currency = "INR") => {
  const symbols = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency;
  return `${symbol}${(Number(price) || 0).toLocaleString()}`;
};

const ProductCardMobile = ({ product, onView, onEdit, onDelete }) => {
  const image = product?.images?.[0]?.url || product?.images?.[0] || PLACEHOLDER_IMG;
  const price = formatPrice(product?.price?.amount ?? product?.price, product?.price?.currency);
  const category = product?.category || "Neutral";
  const stock = product?.stock ?? 0;
  const status = product?.status || "active";

  return (
    <div className="bg-white border border-charcoal/5 rounded-[2rem] p-6 shadow-luxury hover:-translate-y-1 transition-all duration-500 group animate-in fade-in slide-in-from-bottom-2">
      <div className="flex items-start gap-5">
        {/* Image */}
        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-cream border border-charcoal/5 p-1 shadow-sm flex-shrink-0 group-hover:shadow-luxury transition-all duration-500">
          <img
            src={image}
            alt={product?.title}
            className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-700"
            onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMG)}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
               <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gold">{category}</span>
               </div>
               <h3 className="text-sm font-bold text-charcoal truncate leading-snug tracking-tight group-hover:text-gold transition-colors">
                 {product?.title || "Untitled Fragment"}
               </h3>
               <p className="text-[10px] font-bold text-charcoal-light uppercase tracking-widest mt-1">
                  Stock: <span className={stock === 0 ? "text-red-400" : stock <= 10 ? "text-gold" : "text-charcoal"}>{stock}</span>
               </p>
            </div>
            <ActionDropdown onView={onView} onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-charcoal/5">
        <StatusBadge status={status} />
        <span className="text-sm font-black text-charcoal tracking-widest">{price}</span>
      </div>
    </div>
  );
};

export default ProductCardMobile;
