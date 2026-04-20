import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import useAuth from "../../../Auth/hooks/useAuth";
import {
  ShoppingBag,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

const SpecificProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGetProductById } = useProduct();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const sizes =
    product?.category === "Tops" || product?.category === "Outerwear"
      ? product?.size || ["S", "M", "L", "XL", "XXL"]
      : product?.category === "Footwear"
        ? product?.size || ["6", "7", "8", "9", "10"]
        : product?.category === "Bottoms"
          ? product?.size || ["38", "40", "42", "44", "46"]
          : null;
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

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const response = await handleGetProductById(id);
      if (response?.success) {
        setProduct(response.data);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id, handleGetProductById]);

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
            onClick={() => {
              navigate("/shop");
            }}
            className="text-[#1b1c1a]/40 cursor-pointer"
          >
            {product?.category || "Shop"}
          </span>
          <span className="text-[#e8e2da]">/</span>
          <span className="text-[#1b1c1a]">{product.title}</span>
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
        <div className="lg:col-span-7 flex flex-col items-center gap-8">
          <div className="w-full flex flex-col md:flex-row-reverse gap-6">
            {/* Main Visual */}
            <div className="flex-1 relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#f3eee8] shadow-2xl group">
              <img
                src={product.images?.[activeImage]?.url}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-[10px] uppercase tracking-widest font-black">
                  Perspective {activeImage + 1} of {product.images.length}
                </p>
              </div>
            </div>

            {/* Thumbnail Selection */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-28 no-scrollbar">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`flex-shrink-0 aspect-[4/5] w-20 md:w-full rounded-2xl overflow-hidden border-2 transition-all duration-500 hover:shadow-lg ${activeImage === idx ? "border-[#C9A96E] scale-95" : "border-transparent opacity-50 hover:opacity-100"}`}
                >
                  <img
                    src={img.url}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Informational Section */}
        <div className="lg:col-span-5 flex flex-col gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[1px] bg-[#C9A96E]"></span>
              <span className="text-[10px] tracking-[0.4em] text-[#C9A96E] uppercase font-black">
                Premium Archive
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-serif text-[#1b1c1a] leading-none tracking-tight">
              {product.title}
            </h1>

            <div className="flex items-center justify-between">
              <span className="text-4xl font-serif text-[#1b1c1a]">
                ₹{product.price?.amount?.toLocaleString()}
              </span>
              <div className="flex items-center gap-1.5 p-2 bg-[#f3eee8] rounded-full px-4">
                <Star size={12} fill="#C9A96E" className="text-[#C9A96E]" />
                <span className="text-[10px] font-black text-[#1b1c1a] mt-0.5">
                  {product?.rating?.toFixed(1) || "4.9 Rare Piece"}
                </span>
              </div>
            </div>

            <p className="text-[#7a6e63] leading-relaxed text-lg font-inter font-light">
              {product.description}
            </p>
          </div>

          {/* Size Curator */}
          {sizes ? (
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#7a6e63]/50">
                      Curated Dimensions
                    </p>
                    <p className="text-sm font-black uppercase tracking-widest text-[#1b1c1a]">
                      Select Size
                    </p>
                  </div>
                  <button className="text-[9px] font-black uppercase tracking-widest text-[#C9A96E] border-b border-[#C9A96E] pb-0.5">
                    Size Protocol
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-16 cursor-pointer flex items-center justify-center text-[11px] font-black rounded-2xl transition-all duration-500 border ${selectedSize === size ? "bg-[#1b1c1a] text-white border-[#1b1c1a] shadow-xl" : "bg-white border-[#e8e2da] text-[#7a6e63] hover:border-[#C9A96E] hover:text-[#C9A96E]"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Matrix */}
              <div className="space-y-4">
                <button
                  onClick={() =>
                    user ? console.log("Added") : navigate("/login")
                  }
                  className="w-full cursor-pointer h-20 bg-[#1b1c1a] text-white text-[11px] font-black uppercase tracking-[0.4em] hover:bg-[#C9A96E] transition-all rounded-2xl flex items-center justify-center gap-4 shadow-luxury active:scale-[0.98] group"
                >
                  Add to Inventory{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
                <div className="flex gap-4">
                  <button className="flex-1 h-16 cursor-pointer border border-[#e8e2da] text-[#1b1c1a] text-[10px] font-black uppercase tracking-widest hover:border-[#1b1c1a] transition-all rounded-2xl group flex items-center justify-center gap-3">
                    <Heart
                      size={14}
                      className="group-hover:scale-110  transition-transform"
                    />{" "}
                    Save to Wishlist
                  </button>
                  <button className="w-16 cursor-pointer h-16 border border-[#e8e2da] flex items-center justify-center rounded-2xl hover:border-[#C9A96E] group transition-all">
                    <Share2
                      size={14}
                      className="text-[#7a6e63] group-hover:text-[#C9A96E]"
                    />
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {/* Luxury Benefits */}
          <div className="grid grid-cols-1 gap-8 py-10 border-y border-[#e8e2da]">
            {benefits.map((b, i) => (
              <div key={i} className="flex gap-5 group">
                <div className="w-12 h-12 bg-[#f3eee8] rounded-2xl flex items-center justify-center text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-white transition-all duration-500">
                  {b.icon}
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#1b1c1a]">
                    {b.title}
                  </p>
                  <p className="text-[11px] text-[#7a6e63] leading-relaxed">
                    {b.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Atelier Attribution */}
          <div className="p-10 bg-white rounded-3xl border border-[#e8e2da]/50 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#f3eee8] rounded-full flex items-center justify-center text-[#C9A96E] font-serif text-xl border border-[#e8e2da]">
                  {product.seller?.fullname?.[0] || "S"}
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#7a6e63]/50">
                    Curated By
                  </p>
                  <p className="text-sm font-black uppercase tracking-widest text-[#1b1c1a]">
                    {product.seller?.fullname}
                  </p>
                </div>
              </div>
              <button className="text-[9px] font-black uppercase tracking-widest text-[#C9A96E]">
                View Atelier
              </button>
            </div>
            <p className="text-[11px] text-[#7a6e63] leading-loose italic text-center border-t border-[#e8e2da] pt-6">
              "This piece embodies our dedication to architectural silhouettes
              and sustainable luxury. Available in strictly limited allotments."
            </p>
          </div>
        </div>
      </main>

      {/* Brand Signifier */}
      <footer className="py-24 bg-[#f3eee8]/30 border-t border-[#e8e2da] flex flex-col items-center gap-6">
        <div className="text-4xl font-serif font-black tracking-[0.5em] text-[#1b1c1a]">
          SNICH<span className="text-[#C9A96E]">.</span>
        </div>
        <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-[#7a6e63]">
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
