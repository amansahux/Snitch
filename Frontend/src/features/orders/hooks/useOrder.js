import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { createOrder, verifyOrderPayment, getOrderById, getOrders } from "../services/order.api.js";
import {
  setOrders,
  setOrderLoading,
  setOrderError,
} from "../state/order.slice.js";

const useOrder = () => {
  const dispatch = useDispatch();

  const handleCreateOrder = useCallback(async () => {
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
  }, [dispatch]);

  const handleVerifyOrderPayment = useCallback(async (body) => {
    dispatch(setOrderLoading(true));
    try {
      const res = await verifyOrderPayment(body);
      return res;
    } catch (error) {
      dispatch(setOrderError(error));
    } finally {
      dispatch(setOrderLoading(false));
    }
  }, [dispatch]);
  const handleGetOrders = useCallback(async () => {
    dispatch(setOrderLoading(true));
    try {
      const res = await getOrders();
      dispatch(setOrders(res.data));
      return res.data;
    } catch (error) {
      dispatch(setOrderError(error));
    } finally {
      dispatch(setOrderLoading(false));
    }
  }, [dispatch]);
  const handleGetOrderById = useCallback(async (id) => {
    dispatch(setOrderLoading(true));
    try {
      const res = await getOrderById(id);
      return res;
    } catch (error) {
      dispatch(setOrderError(error));
    } finally {
      dispatch(setOrderLoading(false));
    }
  }, [dispatch]);

  return {
    handleCreateOrder,
    handleVerifyOrderPayment,
    handleGetOrderById,
  };
};

export default useOrder;
