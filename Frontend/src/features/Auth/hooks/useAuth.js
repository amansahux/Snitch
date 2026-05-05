import { useDispatch } from "react-redux";
import { login, register, getProfile, logout } from "../services/auth.api.js";
import { setError, setUser, setLoading } from "../state/auth.slice.js";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { user, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleRegister = async (formData) => {
    try {
      dispatch(setLoading(true));
      const response = await register(formData);
      dispatch(setUser(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      dispatch(setError(errorMsg));
      return { success: false, error: errorMsg };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async (formData) => {
    try {
      dispatch(setLoading(true));
      const response = await login(formData);
      dispatch(setUser(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed";
      dispatch(setError(errorMsg));
      return { success: false, error: errorMsg };
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetProfile = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getProfile();
      dispatch(setUser(response.user));
      return { success: true, user: response.user };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      dispatch(setLoading(false));
    }
  };
  const handleLogout = async () => {
    try{
      dispatch(setLoading(true));
      const response = await logout();
      dispatch(setUser(response.data));
      return { success: true, data: response.data };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Logout failed";
      dispatch(setError(errorMsg));
      return { success: false, error: errorMsg };
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleLogin,
    handleRegister,
    handleGetProfile,
    user,
    loading,
    handleLogout,
  };
};

export default useAuth;
