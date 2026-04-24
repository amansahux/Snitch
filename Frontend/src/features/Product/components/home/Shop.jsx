import React, { useState, useEffect, useMemo } from "react";
import { Search, ChevronDown, X, Filter, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import useProduct from "../../hooks/useProduct";
import Product from "./Product";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const { products, handleGetAllProducts } = useProduct();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(10000); // Max price
  const [isLoading, setIsLoading] = useState(true);
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + Number(item?.quantity || 0), 0),
  );
  // console.log(products.length);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      await handleGetAllProducts();
      setIsLoading(false);
    };
    fetchProducts();
  }, [handleGetAllProducts]);

  // Categories derived from products
  const categories = useMemo(() => {
    const cats = [
      "All",
      ...new Set(products.map((p) => p.category).filter(Boolean)),
    ];
    return cats;
  }, [products]);

  // Filtering and Sorting Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price filter
    const getPrice = (p) => {
      // prefer selling, then amount (legacy), then mrp
      return p?.price?.selling ?? p?.price?.amount ?? p?.price?.mrp ?? 0;
    };
    result = result.filter((p) => getPrice(p) <= priceRange);

    // Sort logic
    switch (sortBy) {
      case "Low to High":
        result.sort((a, b) => {
          const priceA = getPrice(a);
          const priceB = getPrice(b);
          return priceA - priceB;
        });
        break;
      case "High to Low":
        result.sort((a, b) => {
          const priceA = getPrice(a);
          const priceB = getPrice(b);
          return priceB - priceA;
        });
        break;
      case "Popular":
        // Fallback to title if no popularity metric
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default: // Newest
        result.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
        );
    }

    return result;
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setPriceRange(100000);
    setSortBy("Newest");
  };

  return (
    <>
      <div className="min-h-screen bg-cream text-charcoal font-sans selection:bg-gold/20">
        {/* Integrated Hero Section */}
        <section className="pt-20 pb-12 px-6 lg:px-12 text-center border-b border-gold/10">
          <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-center">
            <nav className="flex items-center justify-center lg:justify-start lg:pl-5 gap-2 text-[9px] tracking-[0.3em] uppercase text-gray-400 animate-in fade-in duration-700">
              <span
                className="cursor-pointer hover:text-gold transition-colors"
                onClick={() => navigate("/")}
              >
                Home
              </span>
              <span className="opacity-30">/</span>
              <span className="text-gold font-bold">Shop Collection</span>
            </nav>

            <button
              onClick={() => navigate("/cart")}
              className="relative inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white px-5 py-2.5 pr-8 text-[10px] font-black uppercase tracking-[0.2em] text-charcoal hover:border-gold hover:text-gold transition-all"
            >
              <ShoppingBag size={14} />
              Cart
              <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-[#1b1c1a] text-white text-[9px] font-black tracking-normal normal-case flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>

          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold/60 mb-4 block animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
            Timeless Originals
          </span>
          <h1 className="text-4xl md:text-7xl font-serif text-charcoal mb-6 animate-in slide-in-from-bottom-4 duration-1000">
            The Shop
          </h1>
          <p className="max-w-xl mx-auto text-charcoal-light text-[13px] md:text-sm leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200 opacity-80">
            Curated essentials designed with an unwavering dedication to luxury.
            Explore pieces that define confidence and style.
          </p>
          <div className="mt-10 text-[10px] font-black tracking-widest uppercase text-charcoal/30 flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 bg-gold/20"></div>
            {filteredProducts.length} Pieces Found
            <div className="h-[1px] w-8 bg-gold/20"></div>
          </div>
        </section>

        {/* Toolbar */}
        <div className="sticky top-0 z-30 bg-cream/80 backdrop-blur-md border-b border-gold/10 px-6 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-[1440px] mx-auto">
            {/* Search */}
            <div className="relative w-full md:w-80 group">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/40 group-focus-within:text-gold transition-colors"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-white border border-gold/10 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all placeholder:text-charcoal/20"
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto ml-auto">
              {/* Premium Custom Dropdown */}
              <div className="relative flex-1 md:flex-none">
                <button
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                  className="w-full md:w-[180px] flex items-center justify-between px-4 sm:px-6 py-2.5 bg-white border border-gold/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-gold/40 transition-all active:scale-[0.98] group"
                >
                  <span className="text-charcoal/40 group-hover:text-gold transition-colors">
                    Sort:
                  </span>
                  <span className="text-charcoal ml-2 font-black">
                    {sortBy}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`ml-2 text-charcoal/30 transition-transform duration-500 ${isSortDropdownOpen ? "rotate-180 text-gold" : ""}`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isSortDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40 bg-transparent"
                      onClick={() => setIsSortDropdownOpen(false)}
                    />
                    <div className="absolute top-[calc(100%+8px)] right-0 w-full md:w-[220px] bg-white rounded-2xl border border-gold/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] py-2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
                      {["Newest", "Low to High", "High to Low", "Popular"].map(
                        (option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setSortBy(option);
                              setIsSortDropdownOpen(false);
                            }}
                            className={`w-full text-left px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-between group/opt ${
                              sortBy === option
                                ? "text-gold bg-gold/5"
                                : "text-charcoal hover:bg-gold/5"
                            }`}
                          >
                            {option}
                            {sortBy === option && (
                              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></div>
                            )}
                          </button>
                        ),
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-5 py-2.5 bg-charcoal text-white rounded-full text-[11px] font-bold uppercase tracking-wider shadow-xl hover:bg-gold transition-all"
              >
                Filter <Filter size={14} />
              </button>
            </div>
          </div>
        </div>

        <main className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 flex gap-12">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-10">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-charcoal mb-6 flex items-center justify-between">
                Categories
                <span className="w-8 h-[1px] bg-gold/30"></span>
              </h3>
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-sm transition-all flex items-center gap-2 group ${selectedCategory === cat ? "text-gold font-bold" : "text-charcoal-light hover:text-charcoal"}`}
                    >
                      <div
                        className={`w-1 h-1 rounded-full bg-gold transition-all ${selectedCategory === cat ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-30 group-hover:scale-100"}`}
                      ></div>
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-charcoal mb-6 flex items-center justify-between">
                Price Range
                <span className="w-8 h-[1px] bg-gold/30"></span>
              </h3>
              <div className="space-y-4 px-2">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-gold h-1 bg-gold/10 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-bold text-charcoal/50">
                  <span>₹0</span>
                  <span className="text-gold">
                    ₹{priceRange.toLocaleString()}
                  </span>
                </div>
              </div>
            </div> */}

            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-charcoal mb-6 flex items-center justify-between">
                Availability
                <span className="w-8 h-[1px] bg-gold/30"></span>
              </h3>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded border border-gold/30 flex items-center justify-center group-hover:border-gold transition-all">
                  <div className="w-2 h-2 rounded-sm bg-gold opacity-100"></div>
                </div>
                <span className="text-sm text-charcoal-light group-hover:text-charcoal transition-all">
                  In Stock
                </span>
              </label>
            </div>

            <button
              onClick={resetFilters}
              className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] border border-gold/20 rounded-xl hover:bg-white hover:border-gold hover:text-gold transition-all"
            >
              Reset Filters
            </button>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse space-y-4">
                    <div className="aspect-[3/4] bg-gold/5 rounded-2xl"></div>
                    <div className="h-4 bg-gold/5 rounded w-3/4"></div>
                    <div className="h-4 bg-gold/5 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 bg-gold/5 rounded-full flex items-center justify-center mb-8">
                  <ShoppingBag size={40} className="text-gold/30" />
                </div>
                <h3 className="text-2xl font-serif text-charcoal mb-4">
                  No results found
                </h3>
                <p className="text-charcoal-light max-w-xs mb-8">
                  We couldn't find any products matching your current filters.
                  Try adjusting your search or category selection.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-8 py-3 bg-charcoal text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-gold transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More (Static for UI) */}
            {!isLoading && filteredProducts.length > 0 && (
              <div className="mt-20 text-center border-t border-gold/10 pt-12">
                <p className="mt-6 text-[10px] text-charcoal/40 uppercase tracking-widest">
                  Showing {filteredProducts.length} of {products.length}{" "}
                  Products
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Mobile Filter Drawer */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm animate-in fade-in duration-500"
              onClick={() => setIsFilterOpen(false)}
            ></div>

            {/* Drawer */}
            <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-cream shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
              <div className="flex items-center justify-between px-8 py-6 border-b border-gold/10">
                <h2 className="text-sm font-black uppercase tracking-[0.2em]">
                  Filter & Sort
                </h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-white rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
                {/* Add filters here for mobile */}
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gold mb-6 italic">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${selectedCategory === cat ? "bg-charcoal text-white" : "bg-white border border-gold/10 text-charcoal-light"}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-gold mb-6 italic">
                    Price Range
                  </h3>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-gold h-1 bg-gold/10 rounded-lg appearance-none cursor-pointer mb-4"
                  />
                  <div className="flex justify-between text-[11px] font-bold">
                    <span>₹0</span>
                    <span className="text-gold font-black">
                      ₹{priceRange.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-gold/10 bg-white/50">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-5 bg-charcoal text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] hover:bg-gold transition-all shadow-xl"
                >
                  Show Results
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;
