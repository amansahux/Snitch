import React from "react";
import { useDispatch } from "react-redux";
import { login, register, getProfile } from "../services/auth.api.js";
import { setError, setUser, setLoading } from "../state/auth.slice.js";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { user, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleRegister = async (formData) => {
    try {
      dispatch(setLoading(true));
      const response = await register(formData);
      dispatch(setUser(response.data)); // backend sends { data: user }

      return response;
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleLogin = async (formData) => {
    try {
      dispatch(setLoading(true));
      const response = await login(formData);
      dispatch(setUser(response.data)); // backend sends { data: user }
      dispatch(setLoading(false));
      return response;
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
    }
  };
  const handleGetProfile = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getProfile();
      dispatch(setUser(response.user));
      return response;
    } catch (error) {
      
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    handleLogin,
    handleRegister,
    handleGetProfile,
    user,
    loading,
  };
};

export default useAuth;
