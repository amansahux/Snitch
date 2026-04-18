import React from "react";
import StatusBadge from "./StatusBadge";
import ActionDropdown from "./ActionDropdown";

const PLACEHOLDER_IMG = "https://placehold.co/80x80/1c1c1c/555?text=IMG";

const formatPrice = (price, currency = "INR") => {
  const symbols = { INR: "₹", USD: "$", EUR: "€", GBP: "£" };
  const symbol = symbols[currency] || currency;
  return `${symbol}${Number(price).toLocaleString()}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ProductCardMobile = ({ product, onView, onEdit, onDelete }) => {
  const image = product?.images?.[0]?.url || product?.images?.[0] || PLACEHOLDER_IMG;
  const price = formatPrice(product?.price?.amount ?? product?.price, product?.price?.currency);
  const category = product?.category || "Uncategorized";
  const stock = product?.stock ?? "—";
  const status = product?.status || "active";

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all duration-200 group">
      <div className="flex items-start gap-4">
        {/* Image */}
        <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0 ring-1 ring-zinc-700">
          <img
            src={image}
            alt={product?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMG)}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-zinc-100 truncate leading-snug">
                {product?.title || "Untitled Product"}
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">{category}</p>
            </div>
            <ActionDropdown onView={onView} onEdit={onEdit} onDelete={onDelete} />
          </div>
        </div>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800">
        <div className="flex items-center gap-3">
          <StatusBadge status={status} />
          <span className="text-xs text-zinc-500">
            Stock:{" "}
            <span className="text-zinc-300 font-semibold">{stock}</span>
          </span>
        </div>
        <span className="text-sm font-bold text-yellow-500">{price}</span>
      </div>
    </div>
  );
};

export default ProductCardMobile;
