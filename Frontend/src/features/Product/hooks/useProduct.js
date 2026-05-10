import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setProducts,
  setLoading,
  setError,
  setProductCache,
  setVariantCache,
  setSimilarProducts,
  setSimilarCache,
} from "../state/product.slice.js";
import {
  getAllProducts,
  getProductById,
  getSimilarProducts,
} from "../services/product.api.js";
import {
  getVariants,
} from "../services/variant.api.js";

const useProduct = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    productCache,
    variantCache,
    similarCache,
  } = useSelector((state) => state.product);

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
      // Return cached product if available
      if (productCache && productCache[id]) {
        return { success: true, data: productCache[id] };
      }
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
          // Cache enriched product
          dispatch(setProductCache({ id, data: prod }));
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
    [dispatch, productCache]
  );

  const handleGetSimilarProducts = useCallback(
    async (id) => {
      if (similarCache && similarCache[id]) {
        dispatch(setSimilarProducts(similarCache[id]));
        return { success: true, data: similarCache[id] };
      }
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await getSimilarProducts(id);
        if (!response?.success) {
          dispatch(
            setError(response?.message || "Failed to fetch similar products")
          );
        } else {
          dispatch(setSimilarProducts(response.data));
          dispatch(setSimilarCache({ id, data: response.data }));
        }
        return response;
      } catch (error) {
        dispatch(setError("An unexpected error occurred"));
        return undefined;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, similarCache]
  );

  const handleGetVariant = useCallback(
    async (id) => {
      // Return cached variants if present
      if (variantCache && variantCache[id]) {
        return { success: true, variants: variantCache[id] };
      }
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await getVariants(id);
        if (!response?.success) {
          dispatch(setError(response?.message || "Failed to fetch variants"));
        } else {
          // Cache the variants list
          dispatch(setVariantCache({ id, variants: response.variants }));
        }
        return response;
      } catch (error) {
        dispatch(setError("An unexpected error occurred"));
        return undefined;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, variantCache]
  );

  return {
    products,
    loading,
    error,
    handleGetAllProducts,
    handleGetProductById,
    handleGetSimilarProducts,
    handleGetVariant,
  };
};

export default useProduct;
