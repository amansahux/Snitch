import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setStats,
  setSellerOrders,
  setTopProducts,
  setStockIntelligence,
  setActionLoading,
} from "../state/dashboard.slice.js";
import {
  createProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../../Product/services/product.api.js";
import {
  createVariant,
  deleteVariant,
  updateVariant,
  getVariants,
} from "../../Product/services/variant.api.js";
import {
  getSellerOrders,
  updateOrderStatus,
  updatePaymentStatus,
  getDashboardStats,
} from "../service/dashboard.api.js";

const useDashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, stats, sellerOrders, actionLoading } = useSelector(
    (state) => state.dashboard,
  );
  const { products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  const sellerProducts = products.filter(
    (p) => p.seller?._id === user?._id || p.seller === user?._id,
  );

  const runAction = useCallback(
    async (key, fn, fallbackError) => {
      dispatch(setActionLoading({ key, value: true }));
      dispatch(setError(null));
      try {
        return await fn();
      } catch {
        dispatch(setError(fallbackError || "An unexpected error occurred"));
        return undefined;
      } finally {
        dispatch(setActionLoading({ key, value: false }));
      }
    },
    [dispatch],
  );

  const handleGetProductById = useCallback(
    async (id) =>
      runAction("fetchProductById", async () => {
        const response = await getProductById(id);
        if (response?.data?.product) {
          const prod = response.data.product;
          const variants = response.data.variants || [];
          const defaultVariant = variants.find((v) => v.isDefault) || variants[0];
          if (defaultVariant) {
            prod.price = prod.price || defaultVariant.price;
            prod.stock = prod.stock ?? defaultVariant.stock;
            prod.images =
              prod.images && prod.images.length > 0
                ? prod.images
                : defaultVariant.images;
          }
          return { ...response, data: prod };
        }
        dispatch(setError(response?.message || "Failed to fetch product"));
        return response;
      }, "Failed to fetch product"),
    [dispatch, runAction],
  );

  const handleGetVariant = useCallback(
    async (id) =>
      runAction("fetchVariants", async () => {
        const response = await getVariants(id);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to fetch variants"));
        }
        return response;
      }, "Failed to fetch variants"),
    [dispatch, runAction],
  );

  const handleCreateProduct = useCallback(
    async (data) =>
      runAction("createProduct", async () => {
        const response = await createProducts(data);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to create product"));
        }
        return response;
      }, "Failed to create product"),
    [dispatch, runAction],
  );

  const handleUpdateProduct = useCallback(
    async (id, data) =>
      runAction("updateProduct", async () => {
        const response = await updateProduct(id, data);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to update product"));
        }
        return response;
      }, "Failed to update product"),
    [dispatch, runAction],
  );

  const handleDeleteProduct = useCallback(
    async (id) =>
      runAction("deleteProduct", async () => {
        const response = await deleteProduct(id);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to delete product"));
        }
        return response;
      }, "Failed to delete product"),
    [dispatch, runAction],
  );

  const handleAddVariant = useCallback(
    async (id, data) =>
      runAction("addVariant", async () => {
        const response = await createVariant(id, data);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to add variant"));
        }
        return response;
      }, "Failed to add variant"),
    [dispatch, runAction],
  );

  const handleUpdateVariant = useCallback(
    async (variantId, data) =>
      runAction("updateVariant", async () => {
        const response = await updateVariant(variantId, data);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to update variant"));
        }
        return response;
      }, "Failed to update variant"),
    [dispatch, runAction],
  );

  const handleDeleteVariant = useCallback(
    async (variantId) =>
      runAction("deleteVariant", async () => {
        const response = await deleteVariant(variantId);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to delete variant"));
        }
        return response;
      }, "Failed to delete variant"),
    [dispatch, runAction],
  );

  const handleGetSellerOrders = useCallback(
    async () =>
      runAction("fetchSellerOrders", async () => {
        const response = await getSellerOrders();
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to get seller orders"));
          return response;
        }
        dispatch(setSellerOrders(response.data));
        return response;
      }, "Failed to get seller orders"),
    [dispatch, runAction],
  );

  const handleUpdateOrderStatus = useCallback(
    async (orderId, orderStatus) =>
      runAction("updateOrderStatus", async () => {
        const response = await updateOrderStatus(orderId, orderStatus);
        if (response?.success) {
          await handleGetSellerOrders();
        }
        return response;
      }, "Failed to update order status"),
    [handleGetSellerOrders, runAction],
  );

  const handleUpdatePaymentStatus = useCallback(
    async (orderId, paymentStatus) =>
      runAction("updatePaymentStatus", async () => {
        const response = await updatePaymentStatus(orderId, paymentStatus);
        if (response?.success) {
          await handleGetSellerOrders();
        }
        return response;
      }, "Failed to update payment status"),
    [handleGetSellerOrders, runAction],
  );

  const handleGetDashboardStats = useCallback(
    async () =>
      runAction("fetchDashboardStats", async () => {
        const response = await getDashboardStats();
        if (response?.success) {
          dispatch(setStats(response.data.stats));
          dispatch(setTopProducts(response.data.topProducts || []));
          dispatch(setStockIntelligence(response.data.stockIntelligence || []));
          return response;
        }
        dispatch(setError(response?.message || "Failed to get dashboard stats"));
        return response;
      }, "Failed to get dashboard stats"),
    [dispatch, runAction],
  );

  return {
    sellerProducts,
    sellerOrders,
    loading,
    error,
    stats,
    actionLoading,
    handleGetProductById,
    handleGetVariant,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleAddVariant,
    handleUpdateVariant,
    handleDeleteVariant,
    handleGetSellerOrders,
    handleUpdateOrderStatus,
    handleUpdatePaymentStatus,
    handleGetDashboardStats,
  };
};

export default useDashboard;
