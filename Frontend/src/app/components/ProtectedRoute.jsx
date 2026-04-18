import React from "react";
import useAuth from "../../features/Auth/hooks/useAuth.js";
import { Navigate } from "react-router-dom";
import Loader from "./Loader.jsx";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  // Still fetching auth state — don't redirect yet
  if (loading) {
    return <Loader />;
  }

  // Not logged in — send to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-restricted route: redirect non-matching roles to home
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
