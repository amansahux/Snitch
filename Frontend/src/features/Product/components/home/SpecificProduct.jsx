import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import useAuth from "../../../Auth/hooks/useAuth";
import {
  ShoppingBag,
  Heart,
  Share2,
  ChevronLeft,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import Product from "./Product";
import useCart from "../../../cart/hooks/useCart";

const SpecificProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGetProductById, handleGetVariant, handleGetSimilarProducts } =
    useProduct();
  const { handleAddToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [activeVariant, setActiveVariant] = useState(null); // null means Primary Product is selected

  const benefits = [
    {
      icon: <Truck size={18} />,
      title: "Complimentary Delivery",
      text: "On all boutique orders over ₹5,000",
    },
    {
      icon: <RotateCcw size={18} />,
      title: "Concierge Returns",
      text: "30-day extended seasonal window",
    },
    {
      icon: <ShieldCheck size={18} />,
      title: "Atelier Warranty",
      text: "Certified authenticity & 2-year care",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const [prodRes, variantRes] = await Promise.all([
        handleGetProductById(id),
        handleGetVariant(id),
      ]);

      if (prodRes?.success) {
        setProduct(prodRes.data);
      }
      if (variantRes?.success) {
        setVariants(variantRes.variants || []);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchSimilarProducts = async () => {
    setLoading(true);
    try {
      const res = await handleGetSimilarProducts(id);
      // console.log(res)
      if (res?.success) {
        setSimilarProducts(res.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
    fetchSimilarProducts();
  }, [id, handleGetProductById, handleGetVariant, handleGetSimilarProducts]);
  // console.log(similarProducts);

  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#fbf9f6] animate-in fade-in duration-700">
        <p className="text-[#7a6e63] font-serif italic text-2xl">
          This piece has left the archive
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-[10px] font-black tracking-[0.4em] uppercase text-[#1b1c1a] border-b border-[#1b1c1a] pb-1 hover:text-[#C9A96E] hover:border-[#C9A96E] transition-all"
        >
          Explore Collection
        </button>
      </div>
    );
  }

  // Selected Item Logic: Prioritize active variant, then fallback to product/hardcoded values
  const selectedItem = activeVariant || product;

  // Fallback Values (as requested)
  const displayTitle = product.title;
  const displayDescription = product.description;

  const displaySellingPrice =
    selectedItem.price?.selling || selectedItem.price?.amount || 0;
  const displayMrp = selectedItem.price?.mrp || displaySellingPrice || 0;
  const displayStock = selectedItem.stock || 49;

  const displaySize = selectedItem.size || "M";
  const displayColor = selectedItem.color || "Black";
  const displayFit = selectedItem.fit || "Slim";
  const displayMaterial = selectedItem.material || "Polyester";

  // Gallery Logic: Use selected variant images if available, otherwise base product images
  const displayImages =
    (activeVariant?.images?.length > 0
      ? activeVariant.images
      : product.images) || [];
  const safeActiveImage = activeImage < displayImages.length ? activeImage : 0;

  return (
    <div className="min-h-screen bg-[#fbf9f6] font-sans selection:bg-[#C9A96E] selection:text-white">
      {/* Premium Breadcrumb */}
      <nav className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 flex items-center justify-between">
        <div className="flex items-center gap-4 text-[9px] tracking-[0.3em] uppercase font-black text-[#7a6e63]">
          <span
            className="cursor-pointer hover:text-[#1b1c1a] transition-colors"
            onClick={() => navigate("/")}
          >
            Snich
          </span>
          <span className="text-[#e8e2da]">/</span>
          <span
            onClick={() => navigate("/shop")}
            className="text-[#1b1c1a]/40 cursor-pointer"
          >
            Shop
          </span>
          <span className="text-[#e8e2da]">/</span>
          <span className="text-[#1b1c1a] truncate max-w-[150px]">
            {displayTitle}
          </span>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="text-[10px] font-black hover:text-[#C9A96E] uppercase tracking-widest text-[#7a6e63] cursor-pointer flex items-center gap-2 group"
        >
          <ChevronLeft
            size={14}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back
        </button>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        {/* Gallery Section */}
        <div className="lg:col-span-7 flex flex-col items-center gap-12">
          <div className="w-full flex flex-col md:flex-row-reverse gap-6">
            {/* Main Visual */}
            <div className="flex-1 relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#f3eee8] shadow-2xl group">
              <img
                src={
                  displayImages[safeActiveImage]?.url ||
                  "/placeholder-image.jpg"
                }
                alt={displayTitle}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-[10px] uppercase tracking-widest font-black">
                  Perspective {safeActiveImage + 1} of {displayImages.length}
                </p>
              </div>
            </div>

            {/* Thumbnail Selection */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-28 no-scrollbar">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 aspect-[4/5] w-20 md:w-full rounded-2xl overflow-hidden border-2 transition-all duration-500 hover:shadow-lg ${safeActiveImage === idx ? "border-[#C9A96E] scale-95" : "border-transparent opacity-50 hover:opacity-100"}`}
                >
                  <img
                    src={img.url || "/placeholder-image.jpg"}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Luxury Benefits moved for better layout balance */}
          <div className="w-full grid grid-cols-1 gap-10 py-12 border-y border-[#e8e2da]">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-8 group px-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[#C9A96E] shadow-sm group-hover:bg-[#C9A96E] group-hover:text-white transition-all duration-500 border border-[#e8e2da]/50">
                  {b.icon}
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1b1c1a]">
                    {b.title}
                  </p>
                  <p className="text-[13px] text-[#7a6e63] font-inter font-light">
                    {b.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informational Section */}
        <div className="lg:col-span-5 flex flex-col gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#C9A96E]"></span>
              <span className="text-[10px] tracking-[0.4em] text-[#C9A96E] uppercase font-black">
                Premium Collection
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-serif text-[#1b1c1a] leading-tight tracking-tight">
              {displayTitle}
            </h1>

            <div className="flex items-center gap-6">
              <div className="space-y-1">
                <span className="text-4xl font-serif text-[#1b1c1a]">
                  ₹{displaySellingPrice.toLocaleString()}
                </span>
                {displayMrp > displaySellingPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#7a6e63] line-through decoration-[#C9A96E]/50">
                      ₹{displayMrp.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-black text-[#C9A96E] uppercase tracking-tighter">
                      Save{" "}
                      {Math.round(
                        ((displayMrp - displaySellingPrice) / displayMrp) * 100,
                      )}
                      %
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-[#f3eee8] rounded-full px-4 ml-auto">
                <Star size={12} fill="#C9A96E" className="text-[#C9A96E]" />
                <span className="text-[10px] font-black text-[#1b1c1a] mt-0.5">
                  {product?.rating?.toFixed(1) || "4.9 Rare"}
                </span>
              </div>
            </div>

            <p className="text-[#7a6e63] leading-relaxed text-lg font-inter font-light">
              {displayDescription}
            </p>
          </div>

          {/* Image-Based Variant Selector */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#7a6e63]/50">
                    Artisanal Selection
                  </p>
                  <p className="text-sm font-black uppercase tracking-widest text-[#1b1c1a]">
                    Select Variation
                  </p>
                </div>
                <div className="text-[9px] font-black uppercase tracking-widest text-[#C9A96E]/60">
                  Ref: {selectedItem._id || product._id || "N/A"}
                </div>
              </div>

              <div className="flex gap-4 overflow-x-auto py-4 no-scrollbar -mx-2 px-2">
                {/* Primary Product Thumbnail */}
                <button
                  onClick={() => {
                    setActiveVariant(null);
                    setActiveImage(0);
                  }}
                  className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${activeVariant === null ? "border-[#1b1c1a] scale-110 shadow-2xl z-10" : "border-[#e8e2da] opacity-70 hover:opacity-100"}`}
                >
                  <img
                    src={product.images?.[0]?.url || "/placeholder-image.jpg"}
                    alt="Original"
                    className="w-full h-full object-cover"
                  />
                </button>

                {/* Variants Thumbnails */}
                {variants.map((v, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveVariant(v);
                      setActiveImage(0);
                    }}
                    className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${activeVariant?._id === v._id ? "border-[#1b1c1a] scale-110 shadow-2xl z-10" : "border-[#e8e2da] opacity-70 hover:opacity-100"}`}
                  >
                    <img
                      src={
                        v.images?.[0]?.url ||
                        product.images?.[0]?.url ||
                        "/placeholder-image.jpg"
                      }
                      alt={`Variant ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="p-8 bg-[#f3eee8]/50 rounded-3xl border border-[#e8e2da]/30 space-y-6">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#C9A96E]">
                Specifications
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                <div className="space-y-1">
                  <p className="text-[8px] uppercase tracking-widest text-[#7a6e63]">
                    Material
                  </p>
                  <p className="text-[11px] font-black text-[#1b1c1a] uppercase">
                    {displayMaterial}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] uppercase tracking-widest text-[#7a6e63]">
                    Fit
                  </p>
                  <p className="text-[11px] font-black text-[#1b1c1a] uppercase">
                    {displayFit}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] uppercase tracking-widest text-[#7a6e63]">
                    Color
                  </p>
                  <p className="text-[11px] font-black text-[#1b1c1a] uppercase">
                    {displayColor}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[8px] uppercase tracking-widest text-[#7a6e63]">
                    Size
                  </p>
                  <p className="text-[11px] font-black text-[#1b1c1a] uppercase">
                    {displaySize}
                  </p>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <p className="text-[8px] uppercase tracking-widest text-[#7a6e63]">
                    Inventory
                  </p>
                  <p
                    className={`text-[11px] font-black uppercase ${displayStock > 0 ? "text-[#1b1c1a]" : "text-red-500"}`}
                  >
                    {displayStock > 0
                      ? `${displayStock} Pieces Available`
                      : "Temporarily Out of Stock"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Matrix */}
            <div className="space-y-4">
              <button
                disabled={displayStock <= 0}
                onClick={() =>
                  user
                    ? handleAddToCart({
                        productId: product?._id,
                        variantId: activeVariant?._id,
                      })
                    : navigate("/login")
                }
                className={`w-full cursor-pointer h-20 text-[11px] font-black uppercase tracking-[0.4em] transition-all rounded-2xl flex items-center justify-center gap-4 shadow-luxury active:scale-[0.98] group ${displayStock > 0 ? "bg-[#1b1c1a] text-white hover:bg-[#C9A96E]" : "bg-[#e8e2da] text-[#7a6e63] cursor-not-allowed"}`}
              >
                {displayStock > 0 ? (
                  <>
                    Add to Cart{" "}
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                ) : (
                  "Sold Out"
                )}
              </button>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 h-16 cursor-pointer border border-[#e8e2da] text-[#1b1c1a] text-[10px] font-black uppercase tracking-widest hover:border-[#1b1c1a] transition-all rounded-2xl group flex items-center justify-center gap-3">
                  <Heart
                    size={14}
                    className="group-hover:scale-110 transition-transform"
                  />{" "}
                  Save to Wishlist
                </button>
                <button className="w-full sm:w-16 cursor-pointer h-16 border border-[#e8e2da] flex items-center justify-center rounded-2xl hover:border-[#C9A96E] group transition-all">
                  <Share2
                    size={14}
                    className="text-[#7a6e63] group-hover:text-[#C9A96E]"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Atelier Attribution */}
          {/* <div className="p-10 bg-white rounded-3xl border border-[#e8e2da]/50 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f3eee8] rounded-full flex items-center justify-center text-[#C9A96E] font-serif text-xl border border-[#e8e2da]">
                  {product.seller?.fullname?.[0] || "S"}
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#7a6e63]/50">
                    Curated By
                  </p>
                  <p className="text-sm font-black uppercase tracking-widest text-[#1b1c1a]">
                    {product.seller?.fullname || "Principal Artisan"}
                  </p>
                </div>
              </div>
              <button className="text-[9px] font-black uppercase tracking-widest text-[#C9A96E] self-start sm:self-center">
                View Atelier
              </button>
            </div>
            <p className="text-[11px] text-[#7a6e63] leading-loose italic text-center border-t border-[#e8e2da] pt-6">
              "This piece embodies our dedication to architectural silhouettes
              and sustainable luxury. Available in strictly limited allotments."
            </p>
          </div> */}
        </div>
      </main>
      {similarProducts.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-32 border-t border-[#e8e2da]">
          <div className="flex flex-col items-center gap-4 mb-20 text-center">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#C9A96E]"></span>
              <span className="text-[10px] tracking-[0.4em] text-[#C9A96E] uppercase font-black">
                You May Also Admire
              </span>
              <span className="w-6 h-[1px] bg-[#C9A96E]"></span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif text-[#1b1c1a] tracking-tight">
              Complementary Archive
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {similarProducts.map((p) => (
              <Product key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}
      {/* Brand Signifier */}
      <footer className="py-24 bg-[#f3eee8]/30 border-t border-[#e8e2da] flex flex-col items-center gap-6">
        <div className="text-4xl font-serif font-black tracking-[0.5em] text-[#1b1c1a]">
          SNICH<span className="text-[#C9A96E]">.</span>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-[#7a6e63]">
          <span className="hover:text-[#C9A96E] cursor-pointer transition-colors">
            Privacy
          </span>
          <span className="hover:text-[#C9A96E] cursor-pointer transition-colors">
            Terms of Atelier
          </span>
          <span className="hover:text-[#C9A96E] cursor-pointer transition-colors">
            Archive Protocol
          </span>
        </div>
      </footer>
    </div>
  );
};

export default SpecificProduct;
