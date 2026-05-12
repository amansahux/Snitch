import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSellerProducts,
  setLoading,
  setError,
  setStats,
  setSellerOrders,
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
import { getSellerOrders, updateOrderStatus, updatePaymentStatus } from "../service/dashboard.api.js";

const useDashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, stats, sellerOrders } = useSelector(
    (state) => state.dashboard
  );
  const { products } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  const sellerProducts = products.filter(
    (p) => p.seller?._id === user?._id || p.seller === user?._id
  );

  const handleGetProductById = useCallback(async (id) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await getProductById(id);
      if (response && response.data && response.data.product) {
        const prod = response.data.product;
        const variants = response.data.variants || [];
        const defaultVariant =
          variants.find((v) => v.isDefault) || variants[0];
        if (defaultVariant) {
          prod.price = prod.price || defaultVariant.price;
          prod.stock = prod.stock ?? defaultVariant.stock;
          prod.images =
            prod.images && prod.images.length > 0
              ? prod.images
              : defaultVariant.images;
        }
        return { ...response, data: prod };
      } else {
        dispatch(setError(response?.message || "Failed to fetch product"));
      }
      return response;
    } catch (error) {
      dispatch(setError("An unexpected error occurred"));
      return undefined;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleGetVariant = useCallback(async (id) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await getVariants(id);
      return response;
    } catch (error) {
      dispatch(setError("An unexpected error occurred"));
      return undefined;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);


  const handleCreateProduct = useCallback(
    async (data) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await createProducts(data);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to create product"));
        }
        return response;
      } catch (error) {
        dispatch(setError("An unexpected error occurred"));
        return undefined;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const handleUpdateProduct = useCallback(
    async (id, data) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await updateProduct(id, data);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to update product"));
        }
        return response;
      } catch (error) {
        dispatch(setError("An unexpected error occurred"));
        return undefined;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const handleDeleteProduct = useCallback(
    async (id) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await deleteProduct(id);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to delete product"));
        }
        return response;
      } catch (error) {
        dispatch(setError("An unexpected error occurred"));
        return undefined;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const handleAddVariant = useCallback(
    async (id, data) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await createVariant(id, data);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to add variant"));
        }
        return response;
      } catch (error) {
        dispatch(setError("An unexpected error occurred"));
        return undefined;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const handleUpdateVariant = useCallback(
    async (variantId, data) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await updateVariant(variantId, data);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to update variant"));
        }
        return response;
      } catch (error) {
        dispatch(setError("An unexpected error occurred"));
        return undefined;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const handleDeleteVariant = useCallback(
    async (variantId) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await deleteVariant(variantId);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to delete variant"));
        }
        return response;
      } catch (error) {
        dispatch(setError("An unexpected error occurred"));
        return undefined;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const handleGetSellerOrders = useCallback(
    async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await getSellerOrders();
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to get seller orders"));
        }
        dispatch(setSellerOrders(response.data));
        return response;
      } catch (error) {
        dispatch(setError("An unexpected error occurred"));
        return undefined;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const handleUpdateOrderStatus = useCallback(
    async (orderId, orderStatus) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await updateOrderStatus(orderId, orderStatus);
        if (response?.success) {
          handleGetSellerOrders();
        }
        return response;
      } catch (error) {
        dispatch(setError("Failed to update order status"));
        return undefined;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, handleGetSellerOrders]
  );
  const handleUpdatePaymentStatus = useCallback(
    async (orderId, paymentStatus) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await updatePaymentStatus(orderId, paymentStatus);
        if (response?.success) {
          handleGetSellerOrders();
        }
        return response;
      } catch (error) {
        dispatch(setError("Failed to update payment status"));
        return undefined;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, handleGetSellerOrders]
  );

  return {
    sellerProducts,
    sellerOrders,
    loading,
    error,
    stats,
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
  };
};

export default useDashboard;
