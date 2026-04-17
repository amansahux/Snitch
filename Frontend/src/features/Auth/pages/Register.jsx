import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Mail,
  Lock,
  User,
  Phone,
  ShoppingBag,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../validation/auth.validation";
import useAuth from "../hooks/useAuth";
import GoogleBtn from "../components/GoogleBtn";

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
    // console.log("Form Data:", data);
    const res = await handleRegister(data);
    console.log(res);
    if (res.success) {
      navigate("/");
    }
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <span className="text-4xl font-black tracking-widest text-black uppercase">SNITCH</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Join <span className="font-semibold text-black">Snitch</span> and
            start shopping
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  {...register("fullname")}
                  className={`block w-full pl-10 sm:text-sm rounded-lg border px-3 py-2.5 focus:ring-black focus:border-black outline-none transition-colors ${
                    errors.fullname ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullname && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`block w-full pl-10 sm:text-sm rounded-lg border px-3 py-2.5 focus:ring-black focus:border-black outline-none transition-colors ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`block w-full pl-10 pr-10 sm:text-sm rounded-lg border px-3 py-2.5 focus:ring-black focus:border-black outline-none transition-colors ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Contact */}
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="contact"
              >
                Contact Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="contact"
                  type="text"
                  {...register("contact")}
                  className={`block w-full pl-10 sm:text-sm rounded-lg border px-3 py-2.5 focus:ring-black focus:border-black outline-none transition-colors ${
                    errors.contact ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              {errors.contact && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.contact.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="isSeller"
              type="checkbox"
              {...register("isSeller")}
              className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded cursor-pointer accent-black"
            />
            <label
              htmlFor="isSeller"
              className="ml-2 block text-sm text-gray-900 cursor-pointer"
            >
              Sign up as a <span className="font-semibold">Seller</span>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isSubmitting ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <GoogleBtn />
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-black hover:underline transition-all"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
