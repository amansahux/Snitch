import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import useAuth from "../../Auth/hooks/useAuth";
import Product from "../components/home/Product";
import Skeleton from "../components/home/Skeleton";
import { ArrowRight, Globe, MessageCircle } from "lucide-react";

const Home = () => {
  const { products, handleGetAllProducts } = useProduct();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        await handleGetAllProducts();
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [handleGetAllProducts]);

  return (
    <>
      <div className="min-h-screen selection:bg-[#C9A96E]/30 selection:text-black bg-[#fbf9f6] font-inter no-scrollbar overflow-x-hidden">
        {/* ================= NAVBAR (UNTOUCHED) ================= */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#fbf9f6]/90 border-b border-[#e8e2da]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 h-20 flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl sm:text-2xl tracking-[0.35em] uppercase"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#C9A96E",
              }}
            >
              Snitch.
            </Link>

            {/* Nav */}
            <div className="flex items-center gap-5 text-[11px] uppercase tracking-[0.18em] font-medium text-[#7a6e63]">
              {user ? (
                <>
                  <span className="hidden sm:block text-[#1b1c1a]">
                    {user.fullname}
                  </span>

                  {user.role === "seller" && (
                    <Link
                      to="/seller/dashboard"
                      className="hover:text-[#C9A96E] transition"
                    >
                      Dashboard
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-[#C9A96E] transition">
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="hidden sm:block hover:text-[#C9A96E] transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ================= HERO SECTION ================= */}
        <section className="relative w-full pt-10 sm:pt-16 pb-20 lg:pb-32 overflow-hidden ">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              {/* Left Column: Text Content */}
              <div className="lg:col-span-12 xl:col-span-5 order-2 xl:order-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                <div className="inline-flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-gold"></span>
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-gold">
                    New Season Drop
                  </span>
                </div>

                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif text-charcoal leading-[0.9] tracking-tight">
                  Curated <span className="italic font-light">Luxury</span>{" "}
                  <br />
                  For Modern <br />
                  <span className="relative">
                    Style
                    <div className="absolute -bottom-2 left-0 w-full h-[4px] bg-gold/10 -z-10"></div>
                  </span>
                </h1>

                <p className="max-w-md text-charcoal-light text-base sm:text-lg font-light leading-relaxed">
                  Discover refined essentials crafted for elegance, confidence,
                  and timeless presence. Every piece is a testament to the art
                  of minimalist perfection.
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <button
                    onClick={() => navigate("/shop")}
                    className="px-10 py-5 bg-charcoal text-white text-[10px] font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-gold hover:shadow-[0_20px_40px_rgba(201,169,110,0.3)] hover:-translate-y-1 transition-all duration-500 transform group"
                  >
                    <span className="flex items-center gap-3">
                      Shop Now{" "}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>

                  <button className="text-[10px] font-black uppercase tracking-[0.25em] text-charcoal border-b border-charcoal/10 pb-1.5 hover:border-gold hover:text-gold transition-all duration-300">
                    Explore Journal
                  </button>
                </div>

                <div className="pt-12 grid grid-cols-2 gap-8 border-t border-charcoal/5">
                  <div>
                    <p className="text-xl font-serif text-charcoal">100%</p>
                    <p className="text-[9px] uppercase tracking-widest text-charcoal-light mt-1">
                      Premium Origin
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-serif text-charcoal">Atelier</p>
                    <p className="text-[9px] uppercase tracking-widest text-charcoal-light mt-1">
                      Global Shipping
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Premium Image */}
              <div className="lg:col-span-12 xl:col-span-7 order-1 xl:order-2 animate-in fade-in slide-in-from-right-12 duration-1000">
                <div className="relative group">
                  <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-luxury transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(27,28,26,0.15)]">
                    <img
                      src="/images/home_hero.png"
                      alt="SNITCH. Editorial"
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent"></div>
                  </div>

                  {/* Floating floating glass card */}
                  <div className="absolute -bottom-10 -left-10 hidden xl:block animate-in fade-in zoom-in duration-1000 delay-500">
                    <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-luxury border border-white/20">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gold mb-2">
                        Authenticated
                      </p>
                      <p className="text-lg font-serif text-charcoal leading-tight">
                        Hand-picked <br />
                        Excellence
                      </p>
                      <div className="mt-4 flex -space-x-3">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={`w-8 h-8 rounded-full border-2 border-white bg-[#f3eee8] overflow-hidden`}
                          >
                            <img
                              src={`https://i.pravatar.cc/100?u=${i}`}
                              alt="avatar"
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

        {/* ================= FEATURED COLLECTION ================= */}
        <section className="bg-white py-24 sm:py-32 rounded-t-[4rem] sm:rounded-t-[6rem] shadow-[0_-40px_100px_rgba(27,28,26,0.03)] pb-40">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
            {/* Header Content */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="space-y-4 max-w-xl">
                <div className="inline-flex items-center gap-3">
                  <span className="w-6 h-[1px] bg-gold"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">
                    COLLECTION
                  </span>
                </div>
                <h2 className="text-5xl sm:text-6xl font-serif text-charcoal leading-tight">
                  Featured <span className="italic font-light">Pieces</span>
                </h2>
                <p className="text-charcoal-light font-light text-base sm:text-md">
                  Our latest curated drops, selected for their impeccable craft
                  and unique silhouettes.
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleGetAllProducts()}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal-light hover:text-gold transition-colors duration-300"
                >
                  <span>Refresh Catalog</span>
                </button>
                <div className="w-12 h-[1px] bg-charcoal/5 hidden sm:block"></div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="relative">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 animate-in fade-in duration-500">
                  <Skeleton />
                </div>
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 sm:gap-y-20">
                  {products.slice(0, 8).map((product, idx) => (
                    <div
                      key={product._id}
                      className={`animate-in fade-in slide-in-from-bottom-12 duration-1000`}
                      style={{ animationDelay: `${idx * 150}ms` }}
                    >
                      <Product product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-32 rounded-3xl border border-dashed border-charcoal/5 bg-cream/30 flex flex-col items-center justify-center text-center px-6">
                  <div className="w-16 h-16 rounded-full bg-cream-dark/50 flex items-center justify-center mb-6">
                    <Sparkles className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-3xl font-serif text-charcoal">
                    No Pieces Found
                  </h3>
                  <p className="mt-4 text-charcoal-light max-w-sm font-light">
                    Our current archives are momentarily empty. <br /> Check
                    back for our next curated drop.
                  </p>
                  <button
                    onClick={() => handleGetAllProducts()}
                    className="mt-10 px-10 py-4 bg-charcoal text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-gold transition-all duration-500"
                  >
                    Refresh Atelier
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= LUXURY FOOTER ================= */}
        <footer className="bg-charcoal text-white py-24 rounded-t-[4rem] sm:rounded-t-[6rem] relative z-10 -mt-20 overflow-hidden">
          {/* Decorative Grid BG */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#C9A96E 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 relative z-20">
            <div className="grid lg:grid-cols-12 gap-16 lg:gap-20">
              {/* Brand Col */}
              <div className="lg:col-span-5 space-y-8">
                <Link
                  to="/"
                  className="text-4xl font-serif tracking-[0.4em] uppercase text-gold block"
                >
                  Snitch.
                </Link>
                <p className="max-w-xs text-white/40 text-sm font-light leading-relaxed tracking-wide">
                  Architects of contemporary style. We curate, craft, and
                  celebrate the art of modern minimalism.
                </p>
                <div className="flex gap-5">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-500 text-white/60 hover:text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="20"
                      height="20"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                      <path d="M16 11.37a4 4 0 1 1-7.75 1.26 4 4 0 0 1 7.75-1.26z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-500 text-white/60 hover:text-white"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-500 text-white/60 hover:text-white"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Links Col 1 */}
              <div className="lg:col-span-3 space-y-8">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">
                  Discovery
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-white/60 hover:text-gold transition-colors text-sm font-light tracking-widest"
                    >
                      New Arrivals
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/60 hover:text-gold transition-colors text-sm font-light tracking-widest"
                    >
                      All Collections
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/60 hover:text-gold transition-colors text-sm font-light tracking-widest"
                    >
                      The Atelier
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-white/60 hover:text-gold transition-colors text-sm font-light tracking-widest"
                    >
                      Limited Drops
                    </a>
                  </li>
                </ul>
              </div>

              {/* Links Col 2 */}
              <div className="lg:col-span-4 space-y-8">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">
                  The House
                </h4>
                <div className="space-y-4">
                  <p className="text-white/60 text-sm font-light tracking-widest leading-loose">
                    SNITCH Studio, <br />
                    Design District, Atelier No. 42 <br />
                    Milan, Italy
                  </p>
                  <a
                    href="mailto:atelier@snitch.studio"
                    className="block text-gold text-sm font-serif italic border-b border-gold/10 w-fit pb-1 hover:border-gold transition-all duration-300"
                  >
                    atelier@snitch.studio
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-24 pt-10 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">
                © {new Date().getFullYear()} SNITCH STUDIO
              </p>
              <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">
                <span className="cursor-pointer hover:text-white/60 transition-colors">
                  Privacy
                </span>
                <span className="cursor-pointer hover:text-white/60 transition-colors">
                  Terms
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

// Help helper for icons that might be missing in local imports but needed for premium look
const Sparkles = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

export default Home;
