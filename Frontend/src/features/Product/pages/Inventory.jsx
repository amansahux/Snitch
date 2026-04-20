import React, { useEffect, useState, useMemo } from "react";
import { 
  Plus, 
  Package, 
  Search, 
  ChevronRight,
  Menu,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import Sidebar from "../components/dashboard/Sidebar";

const Inventory = () => {
  const { handleGetSellerProducts, sellerProducts } = useProduct();
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleGetSellerProducts();
  }, [handleGetSellerProducts]);

  const filteredProducts = useMemo(() => {
    return sellerProducts.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sellerProducts, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fbf9f6] flex font-sans">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Header Toggle */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-[#e8e2da]">
          <h2 className="text-xl font-serif tracking-widest text-[#1b1c1a]">SNICH.</h2>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-[#7a6e63]"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="pt-8 pb-20 px-6 lg:px-12">
          {/* Header Section */}
          <header className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-[#C9A96E] mb-2">
                 <Package size={18} />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">Curated Archive</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-[#1b1c1a]">Inventory Management</h1>
              <p className="text-sm text-[#7a6e63]">Overview of your curated pieces and collection metrics.</p>
            </div>

            <button 
              onClick={() => navigate("/seller/create-product")}
              className="group flex items-center gap-2 cursor-pointer text-[#C9A96E] text-[15px]  uppercase tracking-[0.2em] transition-all "
            >
              <Plus size={22} className="group-hover:rotate-90 transition-transform duration-500" />
              Create New Listing
            </button>
          </header>

          {/* Grid Controls */}
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-8 items-center justify-between mb-12 pb-8 border-b border-[#e8e2da]">
            <div className="relative w-full md:w-[450px] group">
              <Search size={16} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#7a6e63] group-focus-within:text-[#C9A96E] transition-colors" />
              <input 
                type="text" 
                placeholder="Search archive by title or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-4 bg-transparent text-sm focus:outline-none transition-all placeholder:text-[#7a6e63]/40 placeholder:italic"
              />
            </div>

            <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7a6e63]">
              <span className="text-[#1b1c1a]/30">Sort:</span>
              <button className="flex items-center gap-2 hover:text-[#C9A96E] transition-colors">
                Recently Added <ChevronRight size={12} />
              </button>
            </div>
          </div>

          {/* Custom Inventory Grid */}
          <main className="max-w-[1440px] mx-auto">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16">
                {filteredProducts.map((product) => (
                  <Link
                    to={`/seller/products/${product._id}`}
                    key={product._id} 
                    className="group flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-700 hover:-translate-y-2 transition-transform"
                  >
                    {/* Image Container */}
                    <div className="aspect-[4/5] overflow-hidden mb-6 relative" style={{ backgroundColor: '#f5f3f0' }}>
                       <img
                          src={product.images?.[0]?.url}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                       />
                       {/* Subtle management hover overlay */}
                       <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Listing Details */}
                    <div className="flex flex-col gap-3">
                       <div className="flex items-start justify-between gap-4">
                          <h3
                             className="text-2xl leading-none transition-colors duration-500 group-hover:text-[#C9A96E]"
                             style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1b1c1a' }}
                          >
                             {product.title}
                          </h3>
                       </div>

                       <p
                          className="text-[12px] line-clamp-2 leading-relaxed font-medium mt-1 uppercase tracking-wider text-black opacity-30 italic"
                       >
                          {product.category || "Uncategorized"}
                       </p>

                       <p
                          className="text-[13px] line-clamp-3 leading-relaxed mt-1"
                          style={{ color: '#7A6E63' }}
                       >
                          {product.description}
                       </p>

                       <div className="mt-4 pt-4 border-t border-[#e8e2da]">
                          <span
                             className="text-[11px] uppercase tracking-[0.25em] font-black"
                             style={{ color: '#1b1c1a' }}
                          >
                             ₹{product.price?.amount?.toLocaleString()}
                          </span>
                       </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-32 text-center flex flex-col items-center animate-in zoom-in-95 duration-1000">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black mb-6" style={{ color: '#C9A96E' }}>Empty Vault</span>
                <p className="max-w-md mx-auto text-2xl leading-relaxed italic" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#7A6E63' }}>
                   You haven't added any curated pieces to your archive yet. <br/>
                   <span className="text-sm font-sans uppercase tracking-[0.2em] not-italic text-[#1b1c1a]/30 mt-4 block">Begin by creating a new listing.</span>
                </p>
                <button 
                  onClick={() => navigate("/seller/create-product")}
                  className="mt-10 px-12 py-5 border border-[#e8e2da] hover:border-[#C9A96E] hover:text-[#C9A96E] text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all"
                >
                  Start Curating
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Inventory;

