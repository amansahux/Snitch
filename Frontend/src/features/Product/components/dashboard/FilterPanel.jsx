import React from "react";
import { Search, SlidersHorizontal, RotateCcw, LayoutGrid, List } from "lucide-react";

const CATEGORIES = [
  "All",
  "Tops",
  "Bottoms",
  "Outerwear",
  "Footwear",
  "Accessories",
];

const STOCK_OPTIONS = [
  { value: "", label: "All Stock" },
  { value: "in_stock", label: "In Stock" },
  { value: "low_stock", label: "Low Stock (≤10)" },
  { value: "out_of_stock", label: "Out of Stock" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price_asc", label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "name_asc", label: "Name: A → Z" },
];

const FilterPanel = ({ filters, onChange, onReset, view, onViewChange }) => {
  const handleChange = (key, value) => onChange({ ...filters, [key]: value });

  const hasActiveFilters =
    filters.search ||
    (filters.category && filters.category !== "All") ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.stock;

  return (
    <div className="p-4 border-b border-zinc-800 space-y-4">
      {/* Row 1: Search + Sort + View Toggle */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            id="dashboard-search"
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/30 transition-colors"
          />
        </div>

        {/* Sort */}
        <select
          id="dashboard-sort"
          value={filters.sort}
          onChange={(e) => handleChange("sort", e.target.value)}
          className="px-3 py-2.5 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-yellow-500 transition-colors appearance-none cursor-pointer min-w-[160px]"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {/* View Toggle */}
        <div className="flex bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
          <button
            onClick={() => onViewChange("list")}
            title="List view"
            className={`flex items-center justify-center w-10 h-10 transition-colors cursor-pointer ${
              view === "list"
                ? "bg-yellow-500 text-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewChange("grid")}
            title="Grid view"
            className={`flex items-center justify-center w-10 h-10 transition-colors cursor-pointer ${
              view === "grid"
                ? "bg-yellow-500 text-black"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Row 2: Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Category */}
        <div className="flex items-center gap-1.5 bg-zinc-800 border border-zinc-700 rounded-lg px-1 py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleChange("category", cat)}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all duration-150 cursor-pointer ${
                filters.category === cat || (!filters.category && cat === "All")
                  ? "bg-yellow-500 text-black shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stock filter */}
        <select
          id="dashboard-stock-filter"
          value={filters.stock}
          onChange={(e) => handleChange("stock", e.target.value)}
          className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 focus:outline-none focus:border-yellow-500 transition-colors appearance-none cursor-pointer"
        >
          {STOCK_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        {/* Price range */}
        <div className="flex items-center gap-2">
          <input
            id="dashboard-min-price"
            type="number"
            min="0"
            placeholder="Min ₹"
            value={filters.minPrice}
            onChange={(e) => handleChange("minPrice", e.target.value)}
            className="w-20 px-2.5 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
          />
          <span className="text-zinc-600 text-sm">—</span>
          <input
            id="dashboard-max-price"
            type="number"
            min="0"
            placeholder="Max ₹"
            value={filters.maxPrice}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
            className="w-20 px-2.5 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-yellow-500 transition-colors"
          />
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-yellow-400 border border-zinc-700 hover:border-yellow-500/50 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
