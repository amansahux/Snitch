import { useDispatch } from "react-redux";
import { uploadProfilePic } from "../services/profile.api";
import { setLoading, setUser } from "../../Auth/state/auth.slice";

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
      }
      return res;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return { handleuploadProfilePic };
};

export default useProfile;
