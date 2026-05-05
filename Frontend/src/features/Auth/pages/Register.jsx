import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../validation/auth.validation";
import useAuth from "../hooks/useAuth";
import GoogleBtn from "../components/GoogleBtn";
import { toast } from "react-hot-toast";

const Register = () => {
  const { handleRegister } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const res = await handleRegister(data);
    if (res?.success) {
      toast.success("Account created successfully. Welcome to the collective!");
      navigate("/");
      reset();
    } else {
      toast.error(res?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-page-wrapper min-h-screen flex bg-cream font-sans overflow-x-hidden relative">
      {/* Mobile Hero Background (Only Mobile) */}
      <div className="lg:hidden absolute top-0 left-0 w-full h-[40vh] z-0">
        <img src="/images/register_hero.png" className="w-full h-full object-cover grayscale-[20%]" alt="Hero" />
        <div className="absolute inset-0 bg-charcoal/30 backdrop-blur-sm"></div>
      </div>

      {/* Hero Image Section (Desktop: Left, Mobile: Hidden) */}
      <div className="hidden lg:block lg:w-[45%] relative bg-charcoal">
        <div className="absolute inset-0">
          <img
            src="/images/register_hero.png"
            alt="Luxury Register Hero"
            className="w-full h-full object-cover opacity-85 scale-110 grayscale-[20%] hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-charcoal/30 via-transparent to-gold/10"></div>
        </div>

        {/* Hero Text Content */}
        <div className="absolute top-24 left-16 z-20">
          <div className="space-y-6">
            <h2 className="text-8xl font-serif text-white/90 leading-[0.85] tracking-tighter">
              Create <br />
              <span className="italic">Legacy</span>
            </h2>
            <div className="w-16 h-1 bg-gold px-2"></div>
            <p className="text-white/60 font-light tracking-widest uppercase text-sm">
              The Journey of a Thousand Stitches Starts Here.
            </p>
          </div>
        </div>
        
        {/* Decorative corner tag */}
        <div className="absolute bottom-16 left-16 border-l border-white/20 pl-4">
          <p className="text-white/40 text-xs font-serif italic max-w-[200px]">
            "Fashion is the armor to survive the reality of everyday life."
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-[55%] flex flex-col justify-start px-6 sm:px-12 lg:px-20 pb-12 lg:pb-24 overflow-y-auto no-scrollbar relative z-10 mt-[25vh] lg:mt-0 lg:-ml-20">
        <div className="max-w-md w-full mx-auto bg-cream px-8 py-10 rounded-[2.5rem] lg:rounded-none lg:bg-transparent shadow-luxury lg:shadow-none">
          {/* Mobile Text (Visible only on mobile) */}
          <div className="lg:hidden mb-4 text-center">
            <h2 className="text-3xl font-serif text-charcoal">SNITCH</h2>
            <div className="w-8 h-0.5 bg-gold mx-auto mt-2"></div>
          </div>

          <div className="mb-6">
            <Link to="/" className="hidden lg:flex text-3xl font-serif font-bold tracking-[0.2em] text-charcoal items-center gap-2">
              SNITCH
              <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
            </Link>
          </div>

          <div className="mb-6 space-y-3">
            <h1 className="text-4xl font-serif text-charcoal">Join the Collective</h1>
            <p className="text-charcoal-light font-light text-lg">
              Start your journey into high-end fashion and exclusive drops.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-1 gap-2">
               {/* Full Name */}
               <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-charcoal-light font-bold">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("fullname")}
                    className={`w-full bg-white/50 rounded-xl px-4 py-4 pr-10 border transition-all duration-300 outline-none ${
                        errors.fullname 
                        ? "border-red-300 focus:ring-1 focus:ring-red-400" 
                        : "border-charcoal/5 focus:border-gold focus:ring-1 focus:ring-gold/20"
                    }`}
                    placeholder="E.g. Alexander McQueen"
                  />
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/20" />
                </div>
                {errors.fullname && (
                  <p className="text-[10px] text-red-500 italic mt-1">{errors.fullname.message}</p>
                )}
              </div>

               {/* Email */}
               <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-charcoal-light font-bold">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full bg-white/50 rounded-xl px-4 py-4 pr-10 border transition-all duration-300 outline-none ${
                        errors.email 
                        ? "border-red-300 focus:ring-1 focus:ring-red-400" 
                        : "border-charcoal/5 focus:border-gold focus:ring-1 focus:ring-gold/20"
                    }`}
                    placeholder="you@atlier.com"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/20" />
                </div>
                {errors.email && (
                  <p className="text-[10px] text-red-500 italic mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
               {/* Contact */}
               <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-charcoal-light font-bold">
                  Contact Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    {...register("contact")}
                    className={`w-full bg-white/50 rounded-xl px-4 py-4 pr-10 border transition-all duration-300 outline-none ${
                        errors.contact 
                        ? "border-red-300 focus:ring-1 focus:ring-red-400" 
                        : "border-charcoal/5 focus:border-gold focus:ring-1 focus:ring-gold/20"
                    }`}
                    placeholder="+1 (555) 000-0000"
                  />
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/20" />
                </div>
                {errors.contact && (
                  <p className="text-[10px] text-red-500 italic mt-1">{errors.contact.message}</p>
                )}
              </div>

               {/* Password */}
               <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-[0.2em] text-charcoal-light font-bold">
                  Secret Keyword
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`w-full bg-white/50 rounded-xl px-4 py-4 pr-10 border transition-all duration-300 outline-none ${
                        errors.password 
                        ? "border-red-300 focus:ring-1 focus:ring-red-400" 
                        : "border-charcoal/5 focus:border-gold focus:ring-1 focus:ring-gold/20"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-charcoal/20 group-hover:text-gold transition-colors" />
                    ) : (
                      <Eye className="w-4 h-4 text-charcoal/20 group-hover:text-gold transition-colors" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[10px] text-red-500 italic mt-1">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Seller Option */}
            <div className="flex items-center gap-3 py-2 px-1">
              <div className="relative flex items-center">
                <input
                    id="isSeller"
                    type="checkbox"
                    {...register("isSeller")}
                    className="peer w-5 h-5 border-2 border-charcoal/10 rounded-md cursor-pointer checked:bg-gold checked:border-gold transition-all duration-300 appearance-none"
                    />
                <div className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 left-1 top-1 transition-opacity duration-200">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-white fill-current stroke-current" strokeWidth="4">
                        <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                </div>
              </div>
              <label htmlFor="isSeller" className="text-sm text-charcoal-light cursor-pointer select-none">
                Apply for a <span className="font-bold text-charcoal">Pro Seller</span> account
              </label>
            </div>

            <div className="pt-3 space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold cursor-pointer text-white py-4 rounded-luxury font-medium tracking-widest uppercase text-sm flex items-center justify-center gap-3 hover:translate-y-[-2px] hover:shadow-luxury transition-all duration-300 disabled:opacity-70 group relative overflow-hidden"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="relative z-10">Create Account</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-charcoal/5"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-cream/80 backdrop-blur-sm px-4 text-[10px] uppercase tracking-[0.2em] text-charcoal-light">
                    Or register with
                  </span>
                </div>
              </div>

              <div className="flex justify-center">
                <GoogleBtn />
              </div>
            </div>
          </form>

          <p className="mt-12 text-center text-charcoal-light">
            Already a member?{" "}
            <Link to="/login" className="text-charcoal font-bold hover:text-gold transition-colors border-b border-charcoal/20 hover:border-gold pb-0.5 ml-1">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      
      {/* Decorative floating glass element (Desktop) */}
      <div className="hidden xl:block absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 z-30">
        <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 shadow-luxury flex items-center justify-center text-white/40 font-serif italic text-2xl">
          S
        </div>
      </div>
    </div>
  );
};

export default Register;
