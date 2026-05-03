import { useDispatch } from "react-redux";
import { createOrder, verifyOrderPayment } from "../services/order.api.js";
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
      return res.data;
    } catch (error) {
      dispatch(setOrderError(error));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
  const handleVerifyOrderPayment = async (body) => {
    dispatch(setOrderLoading(true));
    try {
      const res = await verifyOrderPayment(body);
      return res;
    } catch (error) {
      dispatch(setOrderError(error));
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
  return {
    handleCreateOrder,
    handleVerifyOrderPayment,
  };
};

export default useOrder;
