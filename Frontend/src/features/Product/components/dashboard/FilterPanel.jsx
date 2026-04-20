import React from "react";
import { Search, RotateCcw, LayoutGrid, List, ChevronDown } from "lucide-react";

const CATEGORIES = [
  "All",
  "Tops",
  "Bottoms",
  "Outerwear",
  "Footwear",
];

const STOCK_OPTIONS = [
  { value: "", label: "Availability" },
  { value: "in_stock", label: "In Stock" },
  { value: "low_stock", label: "Low Capacity" },
  { value: "out_of_stock", label: "Exhausted" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Latest Arrival" },
  { value: "oldest", label: "Originals First" },
  { value: "price_asc", label: "Valuation Low" },
  { value: "price_desc", label: "Valuation High" },
  { value: "name_asc", label: "Identity A-Z" },
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
    <div className="p-8 space-y-8 bg-white border-b border-charcoal/5">
      {/* Search & Layout Controls */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Luxury Search */}
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/20 group-focus-within:text-gold transition-colors" />
          <input
            type="text"
            placeholder="Search piece identity..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-cream border border-charcoal/5 rounded-2xl text-[11px] font-bold tracking-widest text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/5 transition-all"
          />
        </div>

        {/* View Selection */}
        <div className="flex items-center gap-3">
            <div className="bg-cream border border-charcoal/5 p-1 rounded-[1.25rem] flex items-center">
                <button
                    onClick={() => onViewChange("list")}
                    className={`flex items-center justify-center w-12 h-12 rounded-[1rem] transition-all duration-500 cursor-pointer ${
                    view === "list"
                        ? "bg-white text-gold shadow-luxury"
                        : "text-charcoal/30 hover:text-charcoal"
                    }`}
                >
                    <List className="w-5 h-5 transition-transform group-hover:scale-110" />
                </button>
                <button
                    onClick={() => onViewChange("grid")}
                    className={`flex items-center justify-center w-12 h-12 rounded-[1rem] transition-all duration-500 cursor-pointer ${
                    view === "grid"
                        ? "bg-white text-gold shadow-luxury"
                        : "text-charcoal/30 hover:text-charcoal"
                    }`}
                >
                    <LayoutGrid className="w-5 h-5" />
                </button>
            </div>
            
            {hasActiveFilters && (
                <button
                    onClick={onReset}
                    className="flex items-center justify-center w-14 h-14 bg-cream border border-charcoal/5 rounded-[1.25rem] text-charcoal/30 hover:text-gold hover:border-gold transition-all cursor-pointer group"
                    title="Reset Filter"
                >
                    <RotateCcw className="w-4 h-4 group-hover:rotate-[-180deg] transition-transform duration-700" />
                </button>
            )}
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pt-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleChange("category", cat)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 cursor-pointer ${
                filters.category === cat || (!filters.category && cat === "All")
                  ? "bg-gold text-white shadow-luxury"
                  : "bg-cream text-charcoal-light border border-charcoal/5 hover:border-gold hover:text-gold"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dropdowns & Range */}
        <div className="flex flex-wrap items-center gap-4">
             {/* Stock Dropdown */}
             <div className="relative group/select">
                <select
                    value={filters.stock}
                    onChange={(e) => handleChange("stock", e.target.value)}
                    className="pl-5 pr-10 py-3 bg-cream border border-charcoal/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-charcoal appearance-none focus:outline-none focus:border-gold transition-all cursor-pointer min-w-[150px]"
                >
                    {STOCK_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-charcoal/30 pointer-events-none group-focus-within/select:rotate-180 transition-transform" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative group/select">
                <select
                    value={filters.sort}
                    onChange={(e) => handleChange("sort", e.target.value)}
                    className="pl-5 pr-10 py-3 bg-cream border border-charcoal/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-charcoal appearance-none focus:outline-none focus:border-gold transition-all cursor-pointer min-w-[150px]"
                >
                    {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                    ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 text-charcoal/30 pointer-events-none group-focus-within/select:rotate-180 transition-transform" />
            </div>

            {/* Price Inputs */}
            <div className="flex items-center gap-2 p-1 bg-cream border border-charcoal/5 rounded-xl">
                 <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleChange("minPrice", e.target.value)}
                    className="w-20 px-4 py-2 bg-transparent text-[10px] font-bold text-charcoal placeholder-charcoal/20 focus:outline-none"
                 />
                 <span className="text-charcoal/10 px-1">/</span>
                 <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleChange("maxPrice", e.target.value)}
                    className="w-20 px-4 py-2 bg-transparent text-[10px] font-bold text-charcoal placeholder-charcoal/20 focus:outline-none"
                 />
            </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
