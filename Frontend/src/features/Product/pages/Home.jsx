import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useProduct from "../hooks/useProduct";
import useAuth from "../../Auth/hooks/useAuth";
import Product from "../components/home/Product";
import Skeleton from "../components/home/Skeleton";
import { toast } from "react-hot-toast";
import {
  ArrowRight,
  Globe,
  MessageCircle,
  ShoppingBag,
  Sparkles as SparklesIcon,
} from "lucide-react";

const Home = () => {
  const { products, handleGetAllProducts } = useProduct();
  const { user, handleLogout } = useAuth();
  const cartCount = useSelector((state) =>
    state.cart.items.reduce(
      (total, item) => total + Number(item?.quantity || 0),
      0,
    ),
  );
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      await handleGetAllProducts();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [handleGetAllProducts]);

  return (
    <div className="min-h-screen bg-[#fbf9f6] selection:bg-[#C9A96E] selection:text-white font-inter  no-scrollbar">
      {/* ================= PREMIUM NAVBAR ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#fbf9f6]/80 border-b border-[#e8e2da]/50">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 h-24 flex items-center justify-between">
          <Link
            to="/"
            className="text-3xl tracking-[0.4em] uppercase font-serif font-black transition-colors hover:text-[#C9A96E]"
            style={{ color: "#1b1c1a" }}
          >
            Snich<span className="text-[#C9A96E]">.</span>
          </Link>

          <div className="flex items-center gap-10 md:gap-14 text-[10px] uppercase tracking-[0.3em] font-black text-[#7a6e63]">
            <Link
              to="/shop"
              className="hover:text-[#C9A96E] transition-all hidden md:block"
            >
              Shop
            </Link>
            {user ? (
              <div className="flex items-center gap-10">
                <span className="hidden sm:block text-[#7a6e63] border-b border-[#C9A96E] pb-1 hover:text-[#C9A96E]">
                  {user.fullname}
                </span>
                {user.role === "seller" && (
                  <Link
                    to="/seller/dashboard"
                    className=" text-[#7a6e63] transition-all hover:text-[#C9A96E]"
                  >
                    Dashboard
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-10">
                <Link
                  to="/login"
                  className="hover:text-[#C9A96E] transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="hidden md:block hover:text-[#C9A96E] transition-all"
                >
                  Sign up
                </Link>
              </div>
            )}
            <button
              onClick={() => navigate("/cart")}
              className="relative flex cursor-pointer items-center gap-2 pr-1 transition-all hover:text-[#C9A96E]"
            >
              <ShoppingBag size={14} />
              Cart
              <span className="absolute -top-2 -right-4 min-w-5 h-5 px-1 rounded-full bg-[#1b1c1a] text-white text-[9px] font-black tracking-normal normal-case flex items-center justify-center">
                {cartCount}
              </span>
            </button>
            {user && (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="hover:text-[#C9A96E] transition-all hidden md:block cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ================= EDITORIAL HERO ================= */}
      <section className="relative w-full pt-16 lg:pt-24 pb-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            {/* Lead Content */}
            <div className="lg:col-span-6 space-y-12 animate-in fade-in slide-in-from-left-12 duration-1000">
              <div className="inline-flex items-center gap-4">
                <span className="w-10 h-[1px] bg-[#C9A96E]"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C9A96E]">
                  Autumn - Winter 2026
                </span>
              </div>
              <h1 className=" text-6xl sm:text-7xl md:text-8xl xl:text-[7rem] font-serif text-[#1b1c1a] leading-none tracking-tight">
                Architects of <br />
                <span className="italic font-light text-[#7a6e63]">
                  Contemporary
                </span>
                <br />
                Silhouettes
              </h1>

              <p className="max-w-md text-[#7a6e63] text-lg lg:text-xl font-inter font-light leading-relaxed">
                Discover a curated archive of refined essentials, where
                minimalist precision meets the art of timeless luxury.
              </p>

              <div className="flex flex-wrap items-center gap-10 pt-6">
                <button
                  onClick={() => navigate("/shop")}
                  className="px-12 lg:px-14 cursor-pointer py-5 lg:py-6 bg-[#1b1c1a] text-white text-[9px] lg:text-[11px] font-black uppercase tracking-[0.4em] rounded-[2rem] hover:bg-[#C9A96E] hover:shadow-luxury transition-all duration-700 transform hover:-translate-y-1 active:scale-95 flex items-center gap-4 group"
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>

                {/* <button className="text-[10px] cursor-not-allowed font-black uppercase tracking-[0.3em] text-[#1b1c1a] border-b border-[#e8e2da] pb-2 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-500">
                  Read The Journal
                </button> */}
              </div>

              {/* Trust Indicators */}
              <div className="pt-16 grid grid-cols-3 gap-12 border-t border-[#e8e2da]/40">
                <Metric label="Bespoke Quality" value="100%" />
                <Metric label="Global Atelier" value="Export" />
                <Metric label="Rare Selection" value="Unique" />
              </div>
            </div>

            {/* Hero Visual */}
            <div className="lg:col-span-6 animate-in fade-in slide-in-from-right-12 duration-1000">
              <div className="relative group">
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-1000 group-hover:shadow-luxury bg-[#f3eee8]">
                  <img
                    src="/images/home_hero.png"
                    alt="SNITCH. Editorial"
                    className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
                </div>

                {/* Floating Attribution (Desktop Only) */}
                <div className="absolute -bottom-10 -left-10 hidden xl:block animate-in fade-in zoom-in duration-1000 delay-500">
                  <div className="bg-[#fbf9f6]/95 backdrop-blur-xl p-10 rounded-[3rem] shadow-luxury border border-[#e8e2da]/50 space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C9A96E]">
                      Certified Pieces
                    </p>
                    <p className="text-2xl font-serif text-[#1b1c1a] leading-none">
                      The Collector's <br /> Selection
                    </p>
                    <div className="pt-4 flex -space-x-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-4 border-[#fbf9f6] bg-[#f3eee8] overflow-hidden"
                        >
                          <img
                            src={`https://i.pravatar.cc/100?u=${i + 10}`}
                            alt="collector"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CURATED COLLECTION ================= */}
      <section className="bg-white py-32 sm:py-48 rounded-t-[6rem] shadow-luxury">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
            <div className="space-y-6 max-w-2xl">
              <div className="inline-flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#C9A96E]"></span>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C9A96E]">
                  COLLECTION PROTOCOL
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-serif text-[#1b1c1a] leading-tight">
                Featured{" "}
                <span className="italic font-light text-[#7a6e63]">
                  Archive
                </span>
              </h2>
              <p className="text-[#7a6e63] font-inter font-light text-xl leading-relaxed">
                Discover our latest acquisitions, meticulously selected for
                their exceptional craftsmanship and unique narrative.
              </p>
            </div>

            <div className="flex items-center gap-12">
              <button
                onClick={fetchProducts}
                className="text-[11px] font-black uppercase cursor-pointer tracking-[0.3em] text-[#1b1c1a] hover:text-[#C9A96E] border-b border-transparent hover:border-[#C9A96E] pb-1 transition-all duration-500"
              >
                Refresh Catalog
              </button>
              <button
                onClick={() => navigate("/shop")}
                className="text-[11px] font-black uppercase cursor-pointer tracking-[0.3em] text-[#1b1c1a] hover:text-[#C9A96E] border-b border-transparent hover:border-[#C9A96E] pb-1 transition-all duration-500"
              >
                View All Pieces
              </button>
            </div>
          </div>

          <div className="relative">
            {loading ? (
              <Skeleton />
            ) : products?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-24">
                {products.slice(0, 8).map((product, idx) => (
                  <Product key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <EmptyArchive onRefresh={fetchProducts} />
            )}
          </div>
        </div>
      </section>

      {/* ================= HOUSE FOOTER ================= */}
      <footer className="bg-[#1b1c1a] text-white py-32 rounded-t-[3rem] lg:rounded-t-[6rem] relative z-10 -mt-24 ">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#C9A96E 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 relative z-20">
          <div className="grid lg:grid-cols-12 gap-24">
            <div className="lg:col-span-5 space-y-10">
              <Link
                to="/"
                className="text-5xl font-serif tracking-[0.5em] uppercase text-[#C9A96E] block font-black"
              >
                Snich.
              </Link>
              <p className="max-w-xs text-white/40 text-base font-inter font-light leading-loose tracking-wide">
                Established 2026. Architects of the new luxury. Curating
                tomorrow's classics for the discerning few.
              </p>
              <div className="flex gap-8">
                {[Globe, MessageCircle].map((Icon, idx) => (
                  <button
                    key={idx}
                    className="group flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white/10 transition-all duration-700 hover:border-[#C9A96E] hover:bg-[#C9A96E]"
                  >
                    <Icon className="w-5 h-5 text-white/40 group-hover:text-white" />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-10">
              <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-white/20">
                Archive Directory
              </h4>
              <ul className="space-y-6">
                {[
                  "Curated Drops",
                  "All Collections",
                  "The Atelier",
                  "Bespoke Services",
                ].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/60 hover:text-[#C9A96E] transition-colors text-sm font-light tracking-widest"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-10">
              <h4 className="text-[11px] uppercase tracking-[0.5em] font-black text-white/20">
                The House Location
              </h4>
              <div className="space-y-6">
                <p className="text-white/60 text-sm font-light tracking-widest leading-loose">
                  Snich Atelier 42, <br />
                  Milanese Design Precinct, <br />
                  Milan, Italy
                </p>
                <a
                  href="mailto:atelier@snich.studio"
                  className="block text-[#C9A96E] text-xl font-serif italic border-b border-[#C9A96E]/20 w-fit pb-2 hover:border-[#C9A96E] transition-all duration-500 tracking-wide"
                >
                  atelier@snich.studio
                </a>
              </div>
            </div>
          </div>

          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-10">
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 font-black">
              © MMXXVI Snich Studio
            </p>
            <div className="flex gap-12 text-[10px] uppercase tracking-[0.4em] font-black text-white/20">
              <span className="cursor-pointer hover:text-white transition-colors">
                Digital Privacy
              </span>
              <span className="cursor-pointer hover:text-white transition-colors">
                House Protocol
              </span>
            </div>
          </div>
        </div>
      </footer>
      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div
            className="absolute inset-0 bg-[#1b1c1a]/40 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setShowLogoutModal(false)}
          ></div>
          <div className="relative bg-[#fbf9f6] w-full max-w-md p-10 lg:p-14 rounded-3xl shadow-luxury border border-[#e8e2da]/50 animate-in zoom-in-95 fade-in duration-300">
            <div className="space-y-6 text-center">
              <h3 className="text-3xl font-serif text-[#1b1c1a] tracking-tight">
                Are you sure you want to logout?
              </h3>
              <p className="text-[#7a6e63] font-inter font-light">
                You will be signed out of your account.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 px-8 py-4 border border-[#e8e2da] text-[#1b1c1a] text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#e8e2da]/20 transition-all duration-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    const res = await handleLogout();
                    setShowLogoutModal(false);
                    if (res.success) {
                      navigate("/login");
                      toast.success("Logged out successfully");
                    }else{
                      toast.error("Logout failed");
                    }
                  }}
                  className="flex-1 px-8 py-4 bg-[#1b1c1a] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#C9A96E] transition-all duration-300 shadow-lg cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Metric = ({ label, value }) => (
  <div className="space-y-2 group">
    <p className="text-3xl font-serif text-[#1b1c1a] group-hover:text-[#C9A96E] transition-colors duration-500">
      {value}
    </p>
    <p className="text-[9px] uppercase tracking-[0.4em] text-[#7a6e63]/60">
      {label}
    </p>
  </div>
);

const EmptyArchive = ({ onRefresh }) => (
  <div className="py-40 flex flex-col items-center text-center px-6 animate-in zoom-in duration-1000">
    <div className="w-24 h-24 rounded-full bg-[#f3eee8] flex items-center justify-center mb-10 border border-[#e8e2da]">
      <SparklesIcon className="w-8 h-8 text-[#C9A96E]" />
    </div>
    <h3 className="text-4xl font-serif text-[#1b1c1a]">The Vault is Quiet</h3>
    <p className="mt-6 text-[#7a6e63] max-w-md font-inter font-light text-xl leading-relaxed italic">
      Our archives are currently undergoing curation for the next seasonal
      shift. Check back for the unveiling.
    </p>
    <button
      onClick={onRefresh}
      className="mt-14 cursor-pointer rounded-[2rem] bg-[#1b1c1a] px-14 py-6 text-[11px] font-black uppercase tracking-[0.4em] text-white transition-all duration-700 hover:bg-[#C9A96E]"
    >
      Refresh House Archive
    </button>
  </div>
);

export default Home;
