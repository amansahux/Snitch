import {
  addItemToCart,
  getMyCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  createCartPaymentOrder,
} from "../services/cart.api.js";
import { useDispatch } from "react-redux";
import {
  addToCart,
  updateCart,
  removeFromCart,
  setCart,
  setCartError,
  setCartLoading,
} from "../state/cart.slice";

// All API calls return response.data = { success, message, data: {...}, error }
// We unwrap .data to get the actual cart payload before dispatching.

const useCart = () => {
  const dispatch = useDispatch();

  const handleGetCart = async () => {
    try {
      dispatch(setCartLoading(true));
      const res = await getMyCart(); // res = { success, message, data: cart }
      dispatch(setCart(res.data));   // cart = { _id, items, totalSelling, ... }
      return res;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch cart";
      dispatch(setCartError(errorMessage));
      throw error;
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  const handleAddToCart = async (item) => {
    try {
      dispatch(setCartLoading(true));
      const res = await addItemToCart(item);
      dispatch(addToCart(res.data));
      return res;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to add item to cart";
      dispatch(setCartError(errorMessage));
      throw error;
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  const handleUpdateCart = async (itemId, quantity) => {
    try {
      const res = await updateCartItem({ itemId, quantity });
      dispatch(updateCart(res.data)); // res.data = aggregated cart with totals
      return res;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to update cart item";
      dispatch(setCartError(errorMessage));
      throw error;
    }
    // No setCartLoading here — optimistic UI keeps cart interactive
  };

  const handleRemoveCartItem = async (itemId) => {
    try {
      dispatch(setCartLoading(true));
      const res = await removeCartItem(itemId);
      dispatch(removeFromCart(res.data));
      return res;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to remove cart item";
      dispatch(setCartError(errorMessage));
      throw error;
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  const handleClearCart = async () => {
    try {
      dispatch(setCartLoading(true));
      const res = await clearCart();
      dispatch(setCart(res.data));
      return res;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to clear cart";
      dispatch(setCartError(errorMessage));
      throw error;
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  const handleCreateCartPaymentOrder = async () => {
    try {
      const res = await createCartPaymentOrder();
      return res;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to create cart payment order";
      dispatch(setCartError(errorMessage));
      throw error;
    }
  };

  return {
    handleGetCart,
    handleAddToCart,
    handleUpdateCart,
    handleRemoveCartItem,
    handleClearCart,
    handleCreateCartPaymentOrder,
  };
};

export default useCart;
