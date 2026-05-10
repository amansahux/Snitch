import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { createOrder, verifyOrderPayment, getOrderById, getOrders } from "../services/order.api.js";
import {
  setOrders,
  setOrderLoading,
  setOrderError,
  setOrderCache,
} from "../state/order.slice.js";

const useOrder = () => {
  const dispatch = useDispatch();
  const { orderCache } = useSelector((state) => state.order);

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
    if (orderCache && orderCache[id]) {
      return { success: true, data: orderCache[id] };
    }
    dispatch(setOrderLoading(true));
    try {
      const res = await getOrderById(id);
      if (res && res.data) {
        dispatch(setOrderCache({ id, data: res.data }));
      }
      return res;
    } catch (error) {
      dispatch(setOrderError(error));
    } finally {
      dispatch(setOrderLoading(false));
    }
  }, [dispatch, orderCache]);

  return {
    handleCreateOrder,
    handleVerifyOrderPayment,
    handleGetOrderById,
    handleGetOrders
  };
};

export default useOrder;
