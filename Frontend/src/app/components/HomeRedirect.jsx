import useAuth from "../../features/Auth/hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomeRedirect = ({ children }) => {
  const {loading } = useAuth();
  if (loading) return children;

  return children;
};