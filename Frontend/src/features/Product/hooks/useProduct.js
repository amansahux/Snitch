import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProducts,
  getAllProducts,
  getSellerProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getSimilarProducts,
} from "../services/product.api.js";
import {
  setProducts,
  setSellerProducts,
  setLoading,
  setError,
} from "../state/product.slice.js";
import {
  createVariant,
  deleteVariant,
  getVariants,
  updateVariant,
} from "../services/variant.api.js";

const useProduct = () => {
  const dispatch = useDispatch();
  const { sellerProducts, products, loading, error } = useSelector(
    (state) => state.product
  );

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

  const handleGetSellerProducts = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await getSellerProducts();
      if (response?.success) {
        dispatch(setSellerProducts(response.data));
      } else {
        dispatch(setError(response?.message || "Failed to fetch seller products"));
      }
      return response;
    } catch (error) {
      dispatch(setError("An unexpected error occurred"));
      return undefined;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleGetAllProducts = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const response = await getAllProducts();
      if (response?.success) {
        dispatch(setProducts(response.data));
      } else {
        dispatch(setError(response?.message || "Failed to fetch products"));
      }
      return response;
    } catch (error) {
      dispatch(setError("An unexpected error occurred"));
      return undefined;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const handleGetProductById = useCallback(
    async (id) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await getProductById(id);
        if (response && response.data && response.data.product) {
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

  const handleGetSimilarProducts = useCallback(
    async (id) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await getSimilarProducts(id);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to fetch similar products"));
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

  const handleGetVariant = useCallback(
    async (id) => {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await getVariants(id);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to fetch variants"));
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

  return {
    sellerProducts,
    products,
    loading,
    error,
    handleCreateProduct,
    handleDeleteProduct,
    handleGetSellerProducts,
    handleGetAllProducts,
    handleGetProductById,
    handleUpdateProduct,
    handleGetSimilarProducts,
    handleAddVariant,
    handleGetVariant,
    handleUpdateVariant,
    handleDeleteVariant,
  };
};

export default useProduct;
