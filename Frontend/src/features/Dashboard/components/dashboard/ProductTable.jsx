import React from "react";
import StatusBadge from "./StatusBadge";
import ActionDropdown from "./ActionDropdown";
import SkeletonLoader from "./SkeletonLoader";
import EmptyState from "./EmptyState";

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=100";

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

const TH = ({ children, className = "" }) => (
  <th
    className={`px-8 py-6 text-left text-[9px] font-black uppercase tracking-[0.3em] text-charcoal/25 border-b border-charcoal/5 ${className}`}
  >
    {children}
  </th>
);

const ProductTable = ({
  products = [],
  isLoading = false,
  hasFilters = false,
  onView,
  onEdit,
  onDelete,
  onResetFilters,
}) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <table className="w-full min-w-[800px] border-collapse">
        {/* Head */}
        <thead>
          <tr className="bg-[#FBF9F6]">
            <TH>Legacy Item</TH>
            <TH>Collection</TH>
            <TH>Valuation</TH>
            <TH>Capacity</TH>
            <TH>Status</TH>
            <TH>Logged</TH>
            <TH className="text-right">Actions</TH>
          </tr>
        </thead>

        <tbody className="bg-white">
          {isLoading ? (
            <SkeletonLoader count={5} view="table" />
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={7}>
                <EmptyState hasFilters={hasFilters} onReset={onResetFilters} />
              </td>
            </tr>
          ) : (
            products.map((product) => {
              const image =
                product?.images?.[0]?.url ||
                product?.images?.[0] ||
                PLACEHOLDER_IMG;
              const price = formatPrice(
                product?.price?.selling,
                product?.price?.currency
              );

              return (
                <tr
                  key={product._id}
                  className="group hover:bg-gold/5 transition-all duration-500 border-b border-charcoal/5"
                >
                  {/* Product */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden bg-cream border border-charcoal/5 p-1 shadow-sm flex-shrink-0 group-hover:shadow-luxury transition-all duration-500">
                        <img
                          src={image}
                          alt={product?.title}
                          className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-700"
                          onError={(e) =>
                            (e.currentTarget.src = PLACEHOLDER_IMG)
                          }
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-charcoal tracking-tight group-hover:text-gold transition-colors truncate max-w-[200px]">
                          {product?.title || "Untitled Fragment"}
                        </p>
                        <p className="text-[10px] text-charcoal-light font-medium uppercase tracking-tight truncate max-w-[200px]">
                          {product?.description?.substring(0, 45)}
                          {product?.description?.length > 45 ? "..." : ""}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/40 bg-cream-dark/30 px-3 py-1.5 rounded-lg border border-charcoal/5">
                      {product?.category || "Neutral"}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-8 py-5">
                    <span className="text-[11px] font-black text-charcoal tracking-widest">
                      {price}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${
                            (product?.stock ?? 0) === 0
                            ? "bg-red-400"
                            : (product?.stock ?? 0) <= 10
                            ? "bg-gold animate-pulse"
                            : "bg-emerald-400"
                        }`} />
                        <span
                        className={`text-[11px] font-bold ${
                            (product?.stock ?? 0) === 0
                            ? "text-red-400"
                            : (product?.stock ?? 0) <= 10
                            ? "text-gold"
                            : "text-charcoal-light"
                        }`}
                        >
                            {product?.stock ?? 0}
                        </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-8 py-5">
                    <StatusBadge status={product?.status || "active"} />
                  </td>

                  {/* Date */}
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-bold text-charcoal/30 uppercase tracking-widest">
                      {formatDate(product?.createdAt)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-5 text-right">
                    <ActionDropdown
                      onView={() => onView?.(product)}
                      onEdit={() => onEdit?.(product)}
                      onDelete={() => onDelete?.(product)}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
