import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Plus,
  Tag,
  Info,
  Layers,
  Edit,
  Trash2,
  Image as ImageIcon,
  Edit2,
  Loader2,
} from "lucide-react";
import useDashboard from "../hooks/useDashboard";
import UpdateProductModal from "../components/dashboard/UpdateProductModal";
import AddVariantModal from "../components/dashboard/AddVariantModal";
import ConfirmModal from "../components/dashboard/ConfirmModal";

const SellerProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleGetProductById,
    handleGetVariant,
    handleUpdateProduct,
    handleAddVariant,
    handleDeleteProduct,
    handleDeleteVariant,
    handleUpdateVariant,
    actionLoading,
  } = useDashboard();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("variants"); // "details" | "variants"
  const [activeImage, setActiveImage] = useState(0);
  const [variants, setVariants] = useState([]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  const isUpdatingProduct = actionLoading.updateProduct;
  const isMutatingVariant = actionLoading.addVariant || actionLoading.updateVariant;
  const isDeletingProduct = actionLoading.deleteProduct;
  const isDeletingVariant = actionLoading.deleteVariant;
  const isVariantsLoading = actionLoading.fetchVariants;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (location.state?.openEdit && product) {
      setIsUpdateModalOpen(true);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, product, navigate, location.pathname]);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const response = await handleGetProductById(id);
      if (response?.success) {
        setProduct(response.data);
      }
    } finally {
      setLoading(false);
    }
  }, [id, handleGetProductById]);

  const fetchVariants = useCallback(async () => {
    const response = await handleGetVariant(id);
    if (response?.success) {
      setVariants(response.variants);
    }
  }, [id, handleGetVariant]);

  useEffect(() => {
    fetchProduct();
    fetchVariants();
  }, [fetchProduct, fetchVariants]);

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
      fetchVariants();
    }
  };

  const onUpdateVariant = async (variantId, data) => {
    const response = await handleUpdateVariant(variantId, data);
    if (response?.success) {
      fetchProduct();
      fetchVariants();
    }
  };

  const onDeleteProduct = async () => {
    const response = await handleDeleteProduct(id);
    if (response?.success) {
      navigate("/seller/products");
    }
  };

  const onDeleteVariant = async () => {
    if (!selectedVariantId) return;
    const response = await handleDeleteVariant(selectedVariantId);
    if (response?.success) {
      fetchProduct();
      fetchVariants();
      setSelectedVariantId(null);
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
    <div className="pt-8 pb-20 px-6 lg:px-12 flex-1 animate-in fade-in duration-1000 bg-[#FBF9F6] selection:bg-[#C9A96E] selection:text-white">
      {/* Navigation Header */}
      <nav className="max-w-[1200px] mx-auto flex items-center justify-end mb-12">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsUpdateModalOpen(true)}
            disabled={isUpdatingProduct || isDeletingProduct}
            className="p-3 bg-white rounded-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-[#7a6e63] hover:text-[#C9A96E] hover:shadow-xl transition-all border border-[#e8e2da]/50 group"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isUpdatingProduct || isDeletingProduct}
            className="p-3 bg-white rounded-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-[#7a6e63] hover:text-red-500 hover:shadow-xl transition-all border border-[#e8e2da]/50 group"
          >
            <Trash2 size={16} />
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
                src={product.images?.[activeImage]?.url || variants?.[0]?.images?.[0]?.url}
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
                  Archive Ident: {product?._id?.slice(-8).toUpperCase()}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif text-[#1b1c1a] leading-none tracking-tight">
                {product.title}
              </h1>
              <p className="text-3xl font-serif text-[#C9A96E]">
                ₹
                {(
                  product.price?.selling ||
                  product.price?.amount ||
                  0
                ).toLocaleString()}
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

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsUpdateModalOpen(true)}
                disabled={isUpdatingProduct || isDeletingProduct}
                className="flex-1 bg-[#1b1c1a] text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 py-6 rounded-xl text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#C9A96E] transition-all shadow-luxury active:scale-95"
              >
                {isUpdatingProduct ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Modify Base Details"
                )}
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                disabled={isUpdatingProduct || isDeletingProduct}
                className="sm:w-24 bg-white border cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 border-[#e8e2da] text-[#7a6e63] py-6 rounded-xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all active:scale-95 group"
              >
                {isDeletingProduct ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Trash2
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs Section for Variants/Activity */}
        <div className="space-y-12">
          <div className="flex items-center gap-12 border-b border-[#e8e2da] pb-4 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("variants")}
              className={`text-[11px] font-black uppercase tracking-[0.3em] pb-4 border-b-2 transition-all whitespace-nowrap ${activeTab === "variants" ? "text-[#1b1c1a] border-[#C9A96E]" : "text-[#7a6e63]/40 border-transparent hover:text-[#7a6e63]"}`}
            >
              Variation Archive ({variants?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`text-[11px] font-black uppercase tracking-[0.3em] pb-4 border-b-2 transition-all whitespace-nowrap ${activeTab === "details" ? "text-[#1b1c1a] border-[#C9A96E]" : "text-[#7a6e63]/40 border-transparent hover:text-[#7a6e63]"}`}
            >
              Specifications
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
                value={new Date(product.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
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
                  disabled={isMutatingVariant || isDeletingVariant || isVariantsLoading}
                  className="flex cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 items-center gap-3 px-6 py-3 border border-[#e8e2da] rounded-full text-[10px] font-black uppercase tracking-widest text-[#1b1c1a] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all w-full sm:w-auto justify-center"
                >
                  {isMutatingVariant ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      Add Variation
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {isVariantsLoading ? (
                  Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="h-72 rounded-2xl border border-[#e8e2da] bg-white/70 animate-pulse" />
                  ))
                ) : (
                  variants?.map((v, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl border border-[#e8e2da] hover:border-[#C9A96E]/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group relative flex flex-col h-full"
                  >
                    {/* Top Section */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#f3eee8] border border-[#e8e2da]/50 group-hover:border-[#C9A96E]/30 transition-colors flex items-center justify-center shrink-0">
                        {v?.images?.[0]?.url ? (
                          <img
                            src={v.images[0].url}
                            alt="Variant"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <ImageIcon
                            size={20}
                            className="text-[#C9A96E]/50 group-hover:text-[#C9A96E] transition-colors"
                          />
                        )}
                      </div>

                      <div className="text-right">
                        <span className="inline-block bg-[#fbf9f6] text-[#C9A96E] px-3 py-1.5 rounded-full text-[12px] font-black tracking-widest border border-[#e8e2da]/50 shadow-sm group-hover:bg-[#C9A96E] group-hover:text-white transition-colors duration-500">
                          ₹
                          {(
                            v.price?.selling ||
                            v.price?.amount ||
                            0
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Middle Attributes */}
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {v.attributes &&
                          Object.entries(v.attributes).map(([key, val]) => (
                            <div
                              key={key}
                              className="flex flex-col bg-[#fbf9f6] px-3 py-1.5 rounded-lg border border-[#e8e2da]/60 group-hover:border-[#e8e2da] transition-colors"
                            >
                              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#7a6e63]/60 mb-0.5">
                                {key}
                              </span>
                              <span className="text-[12px] font-serif text-[#1b1c1a]">
                                {val}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-5 mt-5 border-t border-[#e8e2da]/40 flex justify-between items-center mt-auto">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${v.stock > 0 ? "bg-green-500/80" : "bg-red-500/80"}`}
                        ></div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#7a6e63]">
                          {v.stock} in Stock
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setEditingVariant(v);
                            setIsVariantModalOpen(true);
                          }}
                          disabled={isMutatingVariant || isDeletingVariant}
                          className="flex cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 items-center gap-3 px-4 py-3 border border-[#e8e2da] rounded-full text-[10px] font-black uppercase tracking-widest text-[#1b1c1a] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all w-full sm:w-auto justify-center"
                        >
                          {isMutatingVariant && editingVariant?._id === v._id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Edit2 size={14} />
                          )}
                        </button>

                        <button
                          onClick={() => setSelectedVariantId(v._id)}
                          disabled={isMutatingVariant || isDeletingVariant}
                          className="flex cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 items-center gap-3 px-4 py-3 border border-[#e8e2da] rounded-full text-[10px] font-black uppercase tracking-widest text-[#1b1c1a] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all w-full sm:w-auto justify-center"
                        >
                          {isDeletingVariant && selectedVariantId === v._id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                    </div>
                  ))
                )}
                {!isVariantsLoading && variants.length === 0 && (
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

      {/* Modals */}
      <UpdateProductModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        product={product}
        onUpdate={onUpdateProduct}
      />
      <AddVariantModal
        isOpen={isVariantModalOpen}
        onClose={() => {
          setIsVariantModalOpen(false);
          setEditingVariant(null);
        }}
        onAdd={onAddVariant}
        onUpdate={onUpdateVariant}
        editingVariant={editingVariant}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={onDeleteProduct}
        title="Remove from Archive?"
        message={`This action will permanently delete ${product.title} and all its variations. This process cannot be undone.`}
        cancelLabel="Cancel"
        confirmLabel="Delete"
        isLoading={isDeletingProduct}
        onCancel={() => {
          setIsDeleteModalOpen(false);
        }}
      />

      <ConfirmModal
        isOpen={!!selectedVariantId}
        onClose={() => setSelectedVariantId(null)}
        onConfirm={onDeleteVariant}
        title="Remove Variant?"
        message="This action will permanently delete this specific variation from the archive. This process cannot be undone."
        cancelLabel="Cancel"
        confirmLabel="Delete Variant"
        isLoading={isDeletingVariant}
        onCancel={() => {
          setSelectedVariantId(null);
        }}
      />
    </div>
  );
};

const DetailCard = ({ icon, title, value }) => {
  const iconElement = React.createElement(icon, { size: 20 });
  return (
    <div className="bg-white p-10 rounded-2xl border border-[#e8e2da]/40 space-y-6 hover:shadow-luxury transition-all group">
      <div className="w-12 h-12 bg-[#f3eee8] rounded-xl flex items-center justify-center text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-white transition-all">
        {iconElement}
      </div>
      <div className="space-y-2">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#7a6e63]/50">
          {title}
        </p>
        <p className="text-xl font-serif text-[#1b1c1a]">{value}</p>
      </div>
    </div>
  );
};

export default SellerProductDetail;
