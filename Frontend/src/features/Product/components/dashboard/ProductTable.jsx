import React from "react";
import StatusBadge from "./StatusBadge";
import ActionDropdown from "./ActionDropdown";
import SkeletonLoader from "./SkeletonLoader";
import EmptyState from "./EmptyState";

const PLACEHOLDER_IMG = "https://placehold.co/48x48/1c1c1c/555?text=IMG";

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
    className={`px-6 py-3.5 text-left text-xs font-semibold text-zinc-500 uppercase tracking-widest whitespace-nowrap ${className}`}
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
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[700px] border-collapse">
        {/* Head */}
        <thead className="bg-zinc-900/80 border-b border-zinc-800">
          <tr>
            <TH>Product</TH>
            <TH>Category</TH>
            <TH>Price</TH>
            <TH>Stock</TH>
            <TH>Status</TH>
            <TH>Added</TH>
            <TH className="text-right">Actions</TH>
          </tr>
        </thead>

        <tbody>
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
                product?.price?.amount ?? product?.price,
                product?.price?.currency
              );

              return (
                <tr
                  key={product._id}
                  className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors duration-150 group"
                >
                  {/* Product */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0 ring-1 ring-zinc-700">
                        <img
                          src={image}
                          alt={product?.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) =>
                            (e.currentTarget.src = PLACEHOLDER_IMG)
                          }
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-zinc-100 truncate max-w-[180px]">
                          {product?.title || "Untitled"}
                        </p>
                        <p className="text-xs text-zinc-500 truncate max-w-[180px]">
                          {product?.description?.substring(0, 40)}
                          {product?.description?.length > 40 ? "..." : ""}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-300 bg-zinc-800 px-2.5 py-1 rounded-lg border border-zinc-700 font-medium">
                      {product?.category || "Uncategorized"}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-yellow-500">
                      {price}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-semibold ${
                        (product?.stock ?? 0) === 0
                          ? "text-red-400"
                          : (product?.stock ?? 0) <= 10
                          ? "text-yellow-400"
                          : "text-zinc-300"
                      }`}
                    >
                      {product?.stock ?? 0}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <StatusBadge status={product?.status || "active"} />
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-zinc-500">
                      {formatDate(product?.createdAt)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
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
