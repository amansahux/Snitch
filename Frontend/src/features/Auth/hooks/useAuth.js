import React from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../services/auth.api";
import { setError, setUser, setLoading } from "../state/auth.slice.js";

const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async (formData) => {
    try {
      dispatch(setLoading(true));
      const response = await register(formData);
      dispatch(setUser(response.user));
      dispatch(setLoading(false));
      return response;
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
    }
  };
  const handleLogin = async (formData) => {
    try {
      dispatch(setLoading(true));
      const response = await login(formData);
      dispatch(setUser(response.user));
      dispatch(setLoading(false));
      return response;
    } catch (error) {
      dispatch(setError(error));
      dispatch(setLoading(false));
    }
  };

  return {
    handleLogin,
    handleRegister,
  };
};

export default useAuth;
