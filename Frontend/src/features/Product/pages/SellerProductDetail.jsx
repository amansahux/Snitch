import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Package,
  Tag,
  Info,
  Layers,
  Menu,
  Edit,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";
import useProduct from "../hooks/useProduct";
import Sidebar from "../components/dashboard/Sidebar";
import UpdateProductModal from "../components/dashboard/UpdateProductModal";
import AddVariantModal from "../components/dashboard/AddVariantModal";

const SellerProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { handleGetProductById, handleUpdateProduct, handleAddVariant } =
    useProduct();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details"); // "details" | "variants"
  const [activeImage, setActiveImage] = useState(0);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);

  // Scroll to top on mount or id change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (location.state?.openEdit && product) {
      setIsUpdateModalOpen(true);
      // Clear state to prevent modal opening on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, product, navigate, location.pathname]);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    const response = await handleGetProductById(id);
    if (response?.success) {
      setProduct(response.data);
    }
    setLoading(false);
  }, [id, handleGetProductById]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const onUpdateProduct = async (data) => {
    const response = await handleUpdateProduct(id, data);

    if (response?.success) {
      fetchProduct();
    }
  };

  const onAddVariant = async (data) => {
    const response = await handleAddVariant(id, data);
    if (response?.success) {
      fetchProduct();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center font-sans tracking-tight">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-b-2 border-[#C9A96E] rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#7a6e63] animate-pulse">
            Accessing Archive...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fbf9f6] flex items-center justify-center font-sans">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-serif text-[#1b1c1a]">
            Piece Not Found
          </h2>
          <button
            onClick={() => navigate("/seller/products")}
            className="text-sm cursor-pointer text-[#C9A96E] uppercase tracking-widest font-black"
          >
            Back to Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbf9f6] flex font-sans overflow-x-hidden selection:bg-[#C9A96E] selection:text-white">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Toggle */}
        <div className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-[#e8e2da]">
          <h2 className="text-xl font-serif tracking-widest text-[#1b1c1a]">
            SNICH.
          </h2>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-[#7a6e63]"
          >
            <Menu size={24} />
          </button>
        </div>

        <div className="pt-8 pb-20 px-6 lg:px-12 flex-1 animate-in fade-in duration-1000">
          {/* Navigation Header */}
          <nav className="max-w-[1200px] mx-auto flex items-center justify-between mb-12">
            <button
              onClick={() => navigate("/seller/products")}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#7a6e63] hover:text-[#1b1c1a] transition-all cursor-pointer"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Return to Archive
            </button>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsUpdateModalOpen(true)}
                className="p-3 bg-white rounded-full cursor-pointer text-[#7a6e63] hover:text-[#C9A96E] hover:shadow-xl transition-all border border-[#e8e2da]/50"
              >
                <Edit size={16} />
              </button>
            </div>
          </nav>

          <main className="max-w-[1200px] mx-auto">
            {/* Product Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
              {/* Left: Image Gallery */}
              <div className="lg:col-span-6 space-y-6">
                <div className="aspect-[4/5] bg-[#f3eee8] overflow-hidden rounded-3xl shadow-xl relative group">
                  <img
                    src={product.images?.[activeImage]?.url}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="bg-[#1b1c1a]/80 backdrop-blur-md px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-[0.3em] text-white shadow-lg">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                {product.images?.length > 1 && (
                  <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${activeImage === idx ? "border-[#C9A96E] ring-4 ring-[#C9A96E]/10" : "border-transparent opacity-60 hover:opacity-100"}`}
                      >
                        <img
                          src={img.url}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Essential Details */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-[#C9A96E]"></div>
                    <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C9A96E]">
                      Archive Ident: {product._id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-serif text-[#1b1c1a] leading-none tracking-tight">
                    {product.title}
                  </h1>
                  <p className="text-3xl font-serif text-[#C9A96E]">
                    ₹{product.price?.amount?.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-8">
                  <p className="text-[#7a6e63] text-lg leading-relaxed font-inter font-light">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 gap-8 py-8 border-y border-[#e8e2da]">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#7a6e63]/50">
                        Inventory Unit
                      </p>
                      <p className="text-xl font-serif text-[#1b1c1a]">
                        {product.stock || 0} Pieces
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#7a6e63]/50">
                        Status
                      </p>
                      <p className="text-xl font-serif text-[#1b1c1a]">
                        Active Archive
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setIsUpdateModalOpen(true)}
                  className="w-full bg-[#1b1c1a] text-white py-6 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#C9A96E] transition-all shadow-luxury active:scale-95"
                >
                  Modify Base Details
                </button>
              </div>
            </div>

            {/* Tabs Section for Variants/Activity */}
            <div className="space-y-12">
              <div className="flex items-center gap-12 border-b border-[#e8e2da] pb-4 overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`text-[11px] font-black uppercase tracking-[0.3em] pb-4 border-b-2 transition-all whitespace-nowrap ${activeTab === "details" ? "text-[#1b1c1a] border-[#C9A96E]" : "text-[#7a6e63]/40 border-transparent hover:text-[#7a6e63]"}`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab("variants")}
                  className={`text-[11px] font-black uppercase tracking-[0.3em] pb-4 border-b-2 transition-all whitespace-nowrap ${activeTab === "variants" ? "text-[#1b1c1a] border-[#C9A96E]" : "text-[#7a6e63]/40 border-transparent hover:text-[#7a6e63]"}`}
                >
                  Variation Archive ({product.variants?.length || 0})
                </button>
              </div>

              {activeTab === "details" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <DetailCard
                    icon={Tag}
                    title="Categorization"
                    value={product.category}
                  />
                  <DetailCard
                    icon={Info}
                    title="Archive Date"
                    value={new Date(product.createdAt).toLocaleDateString(
                      "en-GB",
                      { day: "2-digit", month: "long", year: "numeric" },
                    )}
                  />
                  <DetailCard
                    icon={Layers}
                    title="Base Stock Level"
                    value={`${product.stock || 0} Units`}
                  />
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="flex justify-between items-center sm:flex-row flex-col gap-4">
                    <h3 className="text-2xl font-serif text-[#1b1c1a]">
                      Inventory Variants
                    </h3>
                    <button
                      onClick={() => setIsVariantModalOpen(true)}
                      className="flex items-center gap-3 px-6 py-3 border border-[#e8e2da] rounded-full text-[10px] font-black uppercase tracking-widest text-[#1b1c1a] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all w-full sm:w-auto justify-center"
                    >
                      <Plus size={14} />
                      Add Variation
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {product.variants?.map((v, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-8 rounded-2xl border border-[#e8e2da]/40 hover:shadow-2xl transition-all group"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="bg-[#f3eee8] p-4 rounded-xl group-hover:bg-[#C9A96E]/10 transition-colors">
                            <ImageIcon size={20} className="text-[#C9A96E]" />
                          </div>
                          <span className="text-[14px] font-serif text-[#C9A96E]">
                            ₹{v.price?.amount?.toLocaleString()}
                          </span>
                        </div>
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {v.attributes &&
                              Object.entries(v.attributes).map(([key, val]) => (
                                <span
                                  key={key}
                                  className="bg-[#fbf9f6] px-3 py-1 rounded text-[10px] uppercase tracking-wider text-[#7a6e63] border border-[#e8e2da]"
                                >
                                  {key}: {val}
                                </span>
                              ))}
                          </div>
                          <div className="pt-4 border-t border-[#e8e2da]/40 flex justify-between items-center">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#7a6e63]">
                              Stock: {v.stock} pcs
                            </p>
                            <div className="flex gap-4">
                              <button className="text-[#7a6e63] hover:text-[#1b1c1a] transition-colors">
                                <Edit size={14} />
                              </button>
                              <button className="text-[#7a6e63] hover:text-red-500 transition-colors">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!product.variants || product.variants.length === 0) && (
                      <div className="col-span-full py-20 text-center bg-[#f3eee8]/30 rounded-3xl border-2 border-dashed border-[#e8e2da]">
                        <p className="text-xl font-serif text-[#7a6e63]/50 italic">
                          No variations found in this archive.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      <UpdateProductModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        product={product}
        onUpdate={onUpdateProduct}
      />
      <AddVariantModal
        isOpen={isVariantModalOpen}
        onClose={() => setIsVariantModalOpen(false)}
        onAdd={onAddVariant}
      />
    </div>
  );
};

const DetailCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white p-10 rounded-2xl border border-[#e8e2da]/40 space-y-6 hover:shadow-luxury transition-all group">
    <div className="w-12 h-12 bg-[#f3eee8] rounded-xl flex items-center justify-center text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-white transition-all">
      <Icon size={20} />
    </div>
    <div className="space-y-2">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7a6e63]/50">
        {title}
      </p>
      <p className="text-xl font-serif text-[#1b1c1a]">{value}</p>
    </div>
  </div>
);

export default SellerProductDetail;
