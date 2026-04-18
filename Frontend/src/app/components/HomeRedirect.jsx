import useAuth from "../../features/Auth/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomeRedirect = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // Global Loader already handles this, but safe to return null

  return children;
};