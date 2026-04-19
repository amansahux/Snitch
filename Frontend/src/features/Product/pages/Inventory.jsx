import React, { useEffect, useState, useMemo } from "react";
import { 
  Plus, 
  Package, 
  TrendingUp, 
  AlertCircle, 
  Search, 
  ArrowLeft,
  Settings,
  ChevronRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useProduct from "../hooks/useProduct";

const Inventory = () => {
  const { handleGetSellerProducts, sellerProducts } = useProduct();
  const [searchQuery, setSearchQuery] = useState("");
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
    <div className="min-h-screen bg-[#fbf9f6] text-[#1b1c1a] font-sans pt-8 pb-20 px-6 lg:px-12">
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
          className="group flex items-center gap-4 bg-[#1b1c1a] hover:bg-[#C9A96E] text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl active:scale-95"
        >
          <Plus size={14} className="group-hover:rotate-90 transition-transform duration-500" />
          Create New Listing
        </button>
      </header>

      {/* Statistics Section */}
      <section className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 mb-20">
        {[
          { label: "Archived Pieces", value: sellerProducts.length, sub: "Total Listings" },
          { label: "Collection Value", value: `₹${sellerProducts.reduce((acc, p) => acc + (p.price?.amount || 0), 0).toLocaleString()}`, sub: "Estimated Total" },
          { label: "Active Channels", value: "01", sub: "Marketplace Presence" },
        ].map((stat, i) => (
          <div key={i} className="border-l border-[#e8e2da] pl-8 space-y-2 group cursor-default">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7a6e63] group-hover:text-[#C9A96E] transition-colors">{stat.label}</p>
            <p className="text-3xl font-serif text-[#1b1c1a]">{stat.value}</p>
            <p className="text-[11px] text-[#7a6e63]/60 italic">{stat.sub}</p>
          </div>
        ))}
      </section>

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
              <div
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
                   <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-700 shadow-2xl">
                      <div className="bg-white p-3 rounded-full">
                         <Settings size={14} className="text-[#1b1c1a]" />
                      </div>
                   </div>
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
              </div>
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
  );
};

export default Inventory;

