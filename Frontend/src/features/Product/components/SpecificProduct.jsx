import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import useAuth from "../../Auth/hooks/useAuth";
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
} from "lucide-react";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";

/**
 * SpecificProduct - Luxury product detail page
 * Dynamic data from API + curated static enhancements
 */
const SpecificProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleGetProductById } = useProduct();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  // Static Data (to be dynamic in the future)
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const benefits = [
    { icon: <Truck size={18} />, text: "Complimentary Express Delivery" },
    { icon: <RotateCcw size={18} />, text: "30-Day Bespoke Returns" },
    { icon: <ShieldCheck size={18} />, text: "2-Year Luxury Warranty" },
  ];

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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <p className="text-gray-400 italic">Product not found</p>
        <button
          onClick={() => navigate("/")}
          className="text-sm font-bold tracking-widest uppercase underline"
        >
          Back to collection
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-black selection:text-white">
      {/* Dynamic Header/Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-gray-400">
        <span
          className="cursor-pointer hover:text-black transition-colors"
          onClick={() => navigate("/")}
        >
          Shop
        </span>
        <span>/</span>
        <span className="text-black font-semibold">{product.title}</span>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Gallery Section (Left) */}
        <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
          {/* Main Display */}
          <div className="flex-1 relative aspect-[3/4] overflow-hidden bg-gray-50 border border-gray-100 italic">
            <img
              src={product.images?.[activeImage]?.url}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {/* Nav Arrows for Mobile/Quick Swipe */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex justify-between lg:hidden">
              <button
                onClick={() =>
                  setActiveImage(
                    (prev) =>
                      (prev - 1 + product.images.length) %
                      product.images.length,
                  )
                }
                className="p-2 bg-white/80 rounded-full shadow-lg"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() =>
                  setActiveImage((prev) => (prev + 1) % product.images.length)
                }
                className="p-2 bg-white/80 rounded-full shadow-lg"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto w-full md:w-24 no-scrollbar scroll-smooth">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 aspect-[3/4] w-20 md:w-full border-2 transition-all duration-300 ${activeImage === idx ? "border-black" : "border-transparent opacity-60 hover:opacity-100"}`}
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

        {/* Details Section (Right) */}
        <div className="lg:col-span-5 flex flex-col gap-10">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-[10px] tracking-[0.4em] text-gray-400 uppercase font-bold">
                New Arrival
              </span>
              <div className="flex gap-4 text-gray-400">
                <button className="hover:text-black transition-colors">
                  <Heart size={20} />
                </button>
                <button className="hover:text-black transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-black leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-6">
              <span className="text-2xl font-semibold text-black italic">
                {product.price?.currency === "INR" ? "₹" : "$"}{" "}
                {product.price?.amount?.toLocaleString()}
              </span>
              <div className="h-4 w-[1px] bg-gray-200"></div>
              <div className="flex items-center gap-1">
                <div className="flex gap-0.5 text-black">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < 4 ? "black" : "none"} />
                  ))}
                </div>
                <span className="text-[11px] font-medium tracking-widest text-gray-400 mt-0.5">
                  (1.2k Reviews)
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-sm font-light tracking-wide">
            {product.description}
          </p>

          {/* Selection States (Static) */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between text-[11px] tracking-[0.2em] uppercase font-bold">
                <span>Select Size</span>
                <button className="text-gray-400 underline hover:text-black">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[56px] h-14 border flex items-center justify-center text-xs font-bold transition-all duration-300 ${selectedSize === size ? "bg-black text-white border-black" : "border-gray-200 text-gray-800 hover:border-black"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <button
                onClick={() => {
                  if (user) {
                    ("Add Card Feature");
                  } else {
                    navigate(`/login`);
                  }
                }}
                className="w-full h-16 bg-black text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-neutral-900 transition-colors flex items-center justify-center gap-3"
              >
                Add to Bag <ShoppingBag size={18} />
              </button>
              <button className="w-full h-16 border border-gray-200 text-black text-xs font-bold uppercase tracking-[0.3em] hover:border-black transition-all">
                Find in Boutique
              </button>
            </div>
          </div>

          {/* Benefits/Seller Info */}
          <div className="pt-8 border-t border-gray-100 grid grid-cols-1 gap-6">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="flex items-center gap-4 text-[11px] tracking-widest text-gray-500 uppercase font-medium"
              >
                <span className="text-black">{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50 italic text-[11px] tracking-widest text-gray-400 text-center leading-loose">
            Curated by{" "}
            <span className="text-black font-bold uppercase not-italic">
              {product.seller?.fullname}
            </span>{" "}
            • Limited availability for this season.
          </div>
        </div>
      </main>

      {/* Static Footer Brand Mark */}
      <footer className="py-20 bg-white border-t border-gray-50 flex flex-col items-center">
        <h2 className="text-2xl font-extrabold tracking-[0.5em] text-black">
          SNITCH
        </h2>
        <p className="mt-2 text-[10px] tracking-[0.3em] text-gray-400 uppercase italic">
          Architects of Style
        </p>
      </footer>
    </div>
  );
};

export default SpecificProduct;
