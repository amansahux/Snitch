import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../services/wishlist.api.js";
import {
  setWishlist,
  addWishlistItem,
  removeWishlistItem,
  setLoading,
  setError,
} from "../state/wishlist.slice.js";
import { notify } from "../../../app/toast/toast.system.jsx";

const useWishlist = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.wishlist);

  const fetchWishlist = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getWishlist();
      if (res.success) {
        dispatch(setWishlist(res.products));
      }
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAddWishlist = async (productId, productData) => {
    try {
      const res = await addToWishlist(productId);
      if (res.success) {
        dispatch(addWishlistItem({ product: productData, addedAt: new Date() }));
        notify.success("Added to wishlist.");
      }
    } catch (err) {
      notify.error(err.response?.data?.message || "Failed to add to wishlist.");
    }
  };

  const handleRemoveWishlist = async (productId) => {
    try {
      const res = await removeFromWishlist(productId);
      if (res.success) {
        dispatch(removeWishlistItem(productId));
        notify.success("Removed from wishlist.");
      }
    } catch (err) {
      notify.error(err.response?.data?.message || "Failed to remove from wishlist.");
    }
  };

  const isWishlisted = (productId) => {
    return items.some((item) => item.product._id === productId);
  };

  return {
    items,
    loading,
    error,
    fetchWishlist,
    handleAddWishlist,
    handleRemoveWishlist,
    isWishlisted,
  };
};

export default useWishlist;
