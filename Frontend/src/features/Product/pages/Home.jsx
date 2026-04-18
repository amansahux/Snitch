import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import useAuth from "../../Auth/hooks/useAuth";
import Product from "../components/Product";
import Skeleton from "../components/Skeleton";

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
      {/* Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen selection:bg-[#C9A96E]/30 selection:text-black"
        style={{
          backgroundColor: "#fbf9f6",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ================= NAVBAR ================= */}
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

        {/* ================= HERO ================= */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 pt-16 sm:pt-24 pb-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              <span className="text-[11px] uppercase tracking-[0.28em] text-[#C9A96E] font-medium">
                New Season Drop
              </span>

              <h1
                className="mt-5 text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-[#1b1c1a]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Curated Luxury
                <br />
                For Modern Style
              </h1>

              <p className="mt-6 max-w-lg text-sm sm:text-base leading-7 text-[#7A6E63]">
                Discover refined essentials crafted for elegance, confidence,
                and timeless presence. Minimal forms. Premium finish.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/shop")}
                  className="px-7 py-3 bg-[#1b1c1a] text-white text-xs uppercase tracking-[0.22em] hover:opacity-90 transition"
                >
                  Shop Now
                </button>

                <button className="px-7 py-3 border border-[#d8d0c7] text-xs uppercase tracking-[0.22em] text-[#1b1c1a] hover:border-[#C9A96E] transition">
                  Explore
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm bg-[#f3eee8]">
                <img
                  src={
                    products?.[0]?.images?.[0]?.url ||
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"
                  }
                  alt="Luxury"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* <div className="absolute -bottom-6 -left-6 bg-white px-6 py-5 shadow-xl border border-[#eee7de] hidden sm:block">
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#C9A96E]">
                  Premium Grade
                </p>
                <p className="mt-2 text-sm text-[#1b1c1a] font-medium">
                  Designed to Last
                </p>
              </div> */}
            </div>
          </div>
        </section>

        {/* ================= PRODUCTS ================= */}
        <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 pb-28">
          {/* Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
            <div>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#C9A96E]">
                Collection
              </span>

              <h2
                className="mt-2 text-4xl sm:text-5xl text-[#1b1c1a]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Featured Pieces
              </h2>
            </div>

            <button
              onClick={() => handleGetAllProducts()}
              className="text-[11px] uppercase tracking-[0.22em] text-[#1b1c1a] hover:text-[#C9A96E] transition"
            >
              Refresh Catalog
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <Skeleton />
          ) : products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-14">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-28 text-center border border-dashed border-[#e8e2da] bg-white">
              <h3
                className="text-3xl text-[#1b1c1a]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                No Pieces Available
              </h3>

              <p className="mt-3 text-sm text-[#7A6E63] max-w-md mx-auto">
                Our next curated drop is in preparation. Return soon for new
                arrivals.
              </p>

              <button
                onClick={() => handleGetAllProducts()}
                className="mt-7 px-7 py-3 bg-black text-white text-xs uppercase tracking-[0.22em]"
              >
                Refresh
              </button>
            </div>
          )}
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-[#e8e2da] py-14">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2
                className="text-xl tracking-[0.35em] uppercase text-[#C9A96E]"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Snitch.
              </h2>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#7A6E63]">
                Architects of Style
              </p>
            </div>

            <div className="flex gap-6 text-[11px] uppercase tracking-[0.18em] text-[#7A6E63]">
              <span>Instagram</span>
              <span>Journal</span>
              <span>About</span>
            </div>

            <p className="text-[10px] tracking-[0.22em] text-[#7A6E63] uppercase">
              © {new Date().getFullYear()} Snitch Studio
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;