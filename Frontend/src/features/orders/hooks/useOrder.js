import { useDispatch } from "react-redux";
import { createOrder } from "../services/order.api";
import {
  setOrders,
  setOrderLoading,
  setOrderError,
} from "../state/order.slice.js";

const useOrder = () => {
  const dispatch = useDispatch();

  const handleCreateOrder = async () => {
    dispatch(setOrderLoading(true));
    try {
      const res = await createOrder();
      dispatch(setOrders(res.data));
    } catch (error) {
      dispatch(setOrderError(error));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
  return {
    handleCreateOrder,
  };
};

export default useOrder;
