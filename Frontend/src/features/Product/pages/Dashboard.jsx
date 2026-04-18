import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Package } from "lucide-react";

import useAuth from "../../Auth/hooks/useAuth";
import useProduct from "../hooks/useProduct";

import Sidebar from "../components/dashboard/Sidebar";
import TopNavbar from "../components/dashboard/TopNavbar";
import FilterPanel from "../components/dashboard/FilterPanel";
import ProductTable from "../components/dashboard/ProductTable";
import ProductCardMobile from "../components/dashboard/ProductCardMobile";
import Pagination from "../components/dashboard/Pagination";
import EmptyState from "../components/dashboard/EmptyState";
import SkeletonLoader from "../components/dashboard/SkeletonLoader";
import ConfirmModal from "../components/dashboard/ConfirmModal";
import FloatingActionButton from "../components/dashboard/FloatingActionButton";

// ─── Constants ──────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 10;

const DEFAULT_FILTERS = {
  search: "",
  category: "All",
  stock: "",
  minPrice: "",
  maxPrice: "",
  sort: "newest",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const getProductPrice = (p) => p?.price?.amount ?? p?.price ?? 0;

const getProductStock = (p) => p?.stock ?? 0;

const applyFilters = (products, filters) => {
  let result = [...products];

  // Search
  if (filters.search.trim()) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }

  // Category
  if (filters.category && filters.category !== "All") {
    result = result.filter(
      (p) => p.category?.toLowerCase() === filters.category.toLowerCase()
    );
  }

  // Stock status
  if (filters.stock === "in_stock") {
    result = result.filter((p) => getProductStock(p) > 10);
  } else if (filters.stock === "low_stock") {
    result = result.filter(
      (p) => getProductStock(p) > 0 && getProductStock(p) <= 10
    );
  } else if (filters.stock === "out_of_stock") {
    result = result.filter((p) => getProductStock(p) === 0);
  }

  // Price
  if (filters.minPrice) {
    result = result.filter(
      (p) => getProductPrice(p) >= Number(filters.minPrice)
    );
  }
  if (filters.maxPrice) {
    result = result.filter(
      (p) => getProductPrice(p) <= Number(filters.maxPrice)
    );
  }

  // Sort
  result.sort((a, b) => {
    switch (filters.sort) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "price_asc":
        return getProductPrice(a) - getProductPrice(b);
      case "price_desc":
        return getProductPrice(b) - getProductPrice(a);
      case "name_asc":
        return (a.title || "").localeCompare(b.title || "");
      default:
        return 0;
    }
  });

  return result;
};

// ─── Stats Card ───────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, accent }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition-colors duration-200">
    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
      {label}
    </p>
    <p className={`text-2xl font-black tracking-tight ${accent || "text-zinc-100"}`}>
      {value}
    </p>
    {sub && <p className="text-xs text-zinc-600 mt-1">{sub}</p>}
  </div>
);

// ─── Main Dashboard ──────────────────────────────────────────────────────────
const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { sellerProducts, handleGetSellerProducts } = useProduct();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [view, setView] = useState("list"); // "list" | "grid"
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null); // product to delete
  const [isDeleting, setIsDeleting] = useState(false);

  // ── Fetch products ────────────────────────────────────────────────────────
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await handleGetSellerProducts();
      setIsLoading(false);
    };
    fetch();
  }, []);

  // ── Filtered & paginated products ─────────────────────────────────────────
  const filteredProducts = useMemo(
    () => applyFilters(sellerProducts, filters),
    [sellerProducts, filters]
  );

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => setCurrentPage(1), [filters]);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const total = sellerProducts.length;
    const inStock = sellerProducts.filter((p) => getProductStock(p) > 0).length;
    const outOfStock = sellerProducts.filter(
      (p) => getProductStock(p) === 0
    ).length;
    const avgPrice =
      total > 0
        ? Math.round(
            sellerProducts.reduce((acc, p) => acc + getProductPrice(p), 0) /
              total
          )
        : 0;

    return { total, inStock, outOfStock, avgPrice };
  }, [sellerProducts]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleFilterChange = (newFilters) => setFilters(newFilters);
  const handleResetFilters = () => setFilters(DEFAULT_FILTERS);

  const handleView = (product) => {
    // Navigate to product detail (future route)
    console.log("View product:", product._id);
  };

  const handleEdit = (product) => {
    navigate(`/seller/edit-product/${product._id}`);
  };

  const handleDeleteClick = (product) => setConfirmDelete(product);

  const handleDeleteConfirm = async () => {
    if (!confirmDelete) return;
    setIsDeleting(true);
    try {
      // await deleteProduct(confirmDelete._id);  ← wire up when API ready
      console.log("Delete:", confirmDelete._id);
      await handleGetSellerProducts(); // refresh list
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
      setConfirmDelete(null);
    }
  };

  const hasActiveFilters =
    filters.search ||
    (filters.category && filters.category !== "All") ||
    filters.stock ||
    filters.minPrice ||
    filters.maxPrice;

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top Navbar */}
        <TopNavbar
          onMenuClick={() => setSidebarOpen(true)}
          pageTitle={user?.fullname}
          user={user}
        />

        {/* Page body */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8 space-y-6 overflow-x-hidden">
          {/* ── Stats Row ────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Products"
              value={isLoading ? "—" : stats.total}
              sub="in your store"
              accent="text-zinc-100"
            />
            <StatCard
              label="In Stock"
              value={isLoading ? "—" : stats.inStock}
              sub="ready to sell"
              accent="text-emerald-400"
            />
            <StatCard
              label="Out of Stock"
              value={isLoading ? "—" : stats.outOfStock}
              sub="needs restocking"
              accent="text-red-400"
            />
            <StatCard
              label="Avg. Price"
              value={isLoading ? "—" : `₹${stats.avgPrice.toLocaleString()}`}
              sub="per product"
              accent="text-yellow-400"
            />
          </div>

          {/* ── Products Panel ───────────────────────────────────────────── */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <Package className="w-4 h-4 text-yellow-500" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-zinc-100 tracking-wide">
                    My Products
                  </h2>
                  {!isLoading && (
                    <p className="text-[11px] text-zinc-500">
                      {filteredProducts.length} of {sellerProducts.length} products
                    </p>
                  )}
                </div>
              </div>

              {/* Add Product CTA (desktop) */}
              <button
                onClick={() => navigate("/seller/create-product")}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(234,179,8,0.4)] cursor-pointer"
              >
                <Plus className="w-4 h-4" strokeWidth={2.5} />
                Add Product
              </button>
            </div>

            {/* Filter Panel */}
            <FilterPanel
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              view={view}
              onViewChange={setView}
            />

            {/* Product Listing */}
            {/* Desktop: Table (list view) OR Grid (grid view) */}
            <div className="hidden md:block">
              {view === "list" ? (
                <ProductTable
                  products={paginatedProducts}
                  isLoading={isLoading}
                  hasFilters={!!hasActiveFilters}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                  onResetFilters={handleResetFilters}
                />
              ) : (
                /* Grid view on desktop */
                isLoading ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4 animate-pulse">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg bg-zinc-800 flex-shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                            <div className="h-3 w-1/2 bg-zinc-800/70 rounded" />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="h-6 w-20 bg-zinc-800 rounded-full" />
                          <div className="h-4 w-16 bg-zinc-800 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : paginatedProducts.length === 0 ? (
                  <EmptyState hasFilters={!!hasActiveFilters} onReset={handleResetFilters} />
                ) : (
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
                    {paginatedProducts.map((product) => (
                      <ProductCardMobile
                        key={`grid-${product._id}`}
                        product={product}
                        onView={() => handleView(product)}
                        onEdit={() => handleEdit(product)}
                        onDelete={() => handleDeleteClick(product)}
                      />
                    ))}
                  </div>
                )
              )}
            </div>

            {/* Mobile / Grid Cards */}
            <div className="md:hidden">
              {isLoading ? (
                <div className="grid grid-cols-1 gap-3 p-4">
                  <SkeletonLoader count={4} view="grid" />
                </div>
              ) : paginatedProducts.length === 0 ? (
                <EmptyState
                  hasFilters={!!hasActiveFilters}
                  onReset={handleResetFilters}
                />
              ) : (
                <div className="grid grid-cols-1 gap-3 p-4">
                  {paginatedProducts.map((product) => (
                    <ProductCardMobile
                      key={product._id}
                      product={product}
                      onView={() => handleView(product)}
                      onEdit={() => handleEdit(product)}
                      onDelete={() => handleDeleteClick(product)}
                    />
                  ))}
                </div>
              )}
            </div>



            {/* Pagination */}
            {!isLoading && filteredProducts.length > ITEMS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </main>
      </div>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={!!confirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${confirmDelete?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setConfirmDelete(null)}
      />

      {/* Mobile FAB */}
      <FloatingActionButton />
    </div>
  );
};

export default Dashboard;