import { useDispatch } from "react-redux";
import { uploadProfilePic, orderCancelByUser } from "../services/profile.api";
import { setUser } from "../../Auth/state/auth.slice";
import { setLoading, setError, setSuccess, setMessage } from "../state/profile.slice";
import { notify } from "../../../app/toast/toast.system.jsx";

const useProfile = () => {
  const dispatch = useDispatch();

  const handleuploadProfilePic = async ({ image }) => {
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append("profilePic", image);
      const res = await uploadProfilePic(formData);
      if (res.success) {
        dispatch(setUser(res.user));
        notify.success("Profile picture updated successfully.");
      }
      return res;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(setError(message));
      notify.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOrderCancelByUser = async ({ orderId }) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const res = await orderCancelByUser(orderId);
      if (res.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(res.message));
        notify.success("Your money will be refunded within 24 hours.", {
          position: "top-center",
        });
        return res;
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to cancel order";
      dispatch(setError(message));
      notify.error(message);
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { handleuploadProfilePic, handleOrderCancelByUser };
};

export default useProfile;
