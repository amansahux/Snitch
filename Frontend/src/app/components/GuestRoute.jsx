import React from "react";
import useAuth from "../../features/Auth/hooks/useAuth.js";
import { Navigate } from "react-router-dom";

/**
 * GuestRoute prevents authenticated users from accessing login/register pages.
 * If logged in, redirects to the home page or dashboard.
 */
const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // While checking auth, allow rendering (for potential skeletons)
  if (loading) {
    return children;
  }

  // If user is already logged in, redirect them away from guest-only pages
  if (user) {
    // Optionally redirect sellers to dashboard, others to home
    const redirectPath = user.role === "seller" ? "/seller/dashboard" : "/";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default GuestRoute;
