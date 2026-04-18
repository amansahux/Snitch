import React from "react";
import { PackageSearch, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyState = ({ hasFilters = false, onReset }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-yellow-500/10 rounded-full blur-2xl scale-150" />
        <div className="relative w-20 h-20 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
          <PackageSearch className="w-9 h-9 text-yellow-500" />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-xl font-bold text-zinc-100 mb-2 tracking-tight">
        {hasFilters ? "No products found" : "No products yet"}
      </h3>
      <p className="text-zinc-500 text-sm max-w-xs leading-relaxed mb-8">
        {hasFilters
          ? "Try adjusting your search or filter criteria to find what you're looking for."
          : "Start building your store. Add your first product and get selling."}
      </p>

      {/* CTA */}
      {hasFilters ? (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-2.5 border border-zinc-600 text-zinc-300 rounded-lg text-sm font-semibold hover:border-yellow-500 hover:text-yellow-500 transition-all duration-200 cursor-pointer"
        >
          Reset Filters
        </button>
      ) : (
        <button
          onClick={() => navigate("/seller/create-product")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold tracking-wide text-sm rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Your First Product
        </button>
      )}
    </div>
  );
};

export default EmptyState;
