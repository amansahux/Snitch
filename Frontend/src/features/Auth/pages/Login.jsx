import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../validation/auth.validation";
import useAuth from "../hooks/useAuth";
import GoogleBtn from "../components/GoogleBtn";
import { toast } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const res = await handleLogin(data);
    if (res?.success) {
      toast.success("Welcome back to Snitch!");
      if (res?.data?.role === "buyer") {
        navigate("/");
      } else if (res?.data?.role === "seller") {
        navigate("/seller/dashboard");
      }
      reset();
    } else {
      toast.error(res?.error || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="auth-page-wrapper min-h-screen flex bg-cream font-sans overflow-x-hidden relative">
      {/* Mobile Hero Background (Only Mobile) */}
      <div className="lg:hidden absolute top-0 left-0 w-full h-[40vh] z-0">
        <img src="/images/login_hero.png" className="w-full h-full object-cover grayscale-[30%]" alt="Hero" />
        <div className="absolute inset-0 bg-charcoal/40 backdrop-blur-sm"></div>
      </div>

      {/* Left Column: Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 relative z-10 mt-[25vh] lg:mt-0 lg:-mr-20 lg:overflow-y-auto no-scrollbar">
        <div className="max-w-md w-full mx-auto bg-cream px-8 py-10 rounded-[2.5rem] lg:rounded-none lg:bg-transparent shadow-luxury lg:shadow-none">
          {/* Logo */}
          <div className="mb-12">
            <Link to="/" className="text-3xl font-serif font-bold tracking-[0.2em] text-charcoal flex items-center gap-2">
              SNITCH
              <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
            </Link>
          </div>

          <div className="space-y-2 mb-10">
            <h1 className="text-5xl sm:text-6xl font-serif text-charcoal leading-tight">
              Welcome <br />
              <span className="italic">Back</span>
            </h1>
            <p className="text-charcoal-light text-lg">
              Sign in to access your curated wardrobe.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2 group">
              <label className="text-xs uppercase tracking-widest text-charcoal-light font-semibold ml-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  {...register("email")}
                  className={`w-full bg-transparent border-b-2 py-4 pl-2 pr-10 outline-none transition-all duration-300 ${
                    errors.email 
                    ? "border-red-400 focus:border-red-500" 
                    : "border-charcoal/10 focus:border-gold"
                  }`}
                  placeholder="Enter your email"
                />
                <Mail className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/30 group-focus-within:text-gold transition-colors" />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2 group">
              <label className="text-xs uppercase tracking-widest text-charcoal-light font-semibold ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full bg-transparent border-b-2 py-4 pl-2 pr-10 outline-none transition-all duration-300 ${
                    errors.password 
                    ? "border-red-400 focus:border-red-500" 
                    : "border-charcoal/10 focus:border-gold"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-charcoal/30 hover:text-charcoal transition-colors" />
                  ) : (
                    <Eye className="w-5 h-5 text-charcoal/30 hover:text-charcoal transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 ml-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm font-medium text-charcoal-light hover:text-gold transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <div className="pt-4 space-y-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-charcoal cursor-pointer text-white py-5 rounded-luxury font-medium tracking-widest uppercase text-sm flex items-center justify-center gap-3 hover:translate-y-[-2px] hover:shadow-luxury transition-all duration-300 disabled:opacity-70 group"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1  transition-transform" />
                  </>
                )}
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-charcoal/5"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-cream px-4 text-xs uppercase tracking-widest text-charcoal-light">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <GoogleBtn />
              </div>
            </div>
          </form>

          <p className="mt-12 text-center text-charcoal-light">
            New here?{" "}
            <Link to="/register" className="text-charcoal cursor-pointer font-bold hover:text-gold transition-colors border-b border-charcoal/20 hover:border-gold pb-0.5 ml-1">
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column: Image Hero (Desktop Only) */}
      <div className="hidden lg:block lg:w-3/5 relative bg-charcoal">
        <div className="absolute inset-0">
          <img
            src="/images/login_hero.png"
            alt="Luxury Fashion"
            className="w-full h-full object-cover opacity-90 scale-105"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent"></div>
        </div>

        {/* Hero Text */}
        <div className="absolute bottom-24 left-24 right-24 text-white z-20">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-gold/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-widest uppercase border border-gold/30">
              Luxury Essentials
            </span>
            <h2 className="text-7xl font-serif italic py-2">
              Wear <br /> Confidence
            </h2>
            <div className="w-24 h-0.5 bg-gold"></div>
            <p className="text-xl font-light opacity-80 max-w-sm">
              Discover the art of refined dressing with our curated luxury collections.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-24 right-24 text-white/10 text-[120px] font-serif select-none pointer-events-none italic">
          EST. 2024
        </div>
      </div>

      {/* Mobile background decorative circle */}
      <div className="lg:hidden absolute -top-24 -right-24 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10"></div>
    </div>
  );
};

export default Login;
