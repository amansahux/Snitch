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
import { setProducts, setSellerProducts } from "../state/product.slice.js";
import { createVariant, getVariants } from "../services/variant.api.js";

const useProduct = () => {
  const dispatch = useDispatch();
  const { sellerProducts, products } = useSelector((state) => state.product);

  const handleCreateProduct = useCallback(async (data) => {
    try {
      const response = await createProducts(data);
      return response;
    } catch {
      return undefined;
    }
  }, []);

  const handleDeleteProduct = useCallback(async (id) => {
    try {
      const response = await deleteProduct(id);
      return response;
    } catch {
      return undefined;
    }
  }, []);
  const handleGetSellerProducts = useCallback(async () => {
    try {
      const response = await getSellerProducts();
      if (response?.success) {
        dispatch(setSellerProducts(response.data));
      }
      return response;
    } catch {
      return undefined;
    }
  }, [dispatch]);

  const handleGetAllProducts = useCallback(async () => {
    try {
      const response = await getAllProducts();
      if (response?.success) {
        dispatch(setProducts(response.data));
      }
      return response;
    } catch {
      return undefined;
    }
  }, [dispatch]);

  const handleGetProductById = useCallback(async (id) => {
    try {
      const response = await getProductById(id);
      // Backend may return { product, variants } shape. For frontend compatibility,
      // unwrap and attach default variant fields (price, stock, images) onto product.
      if (response && response.data && response.data.product) {
        const prod = response.data.product;
        const variants = response.data.variants || [];
        const defaultVariant = variants.find((v) => v.isDefault) || variants[0];
        if (defaultVariant) {
          prod.price = prod.price || defaultVariant.price;
          prod.stock = prod.stock ?? defaultVariant.stock;
          prod.images = prod.images && prod.images.length > 0 ? prod.images : defaultVariant.images;
        }
        // Return a response-like object keeping other keys intact but with data = prod
        return { ...response, data: prod };
      }
      return response;
    } catch {
      return undefined;
    }
  }, []);

  const handleUpdateProduct = useCallback(async (id, data) => {
    try {
      const response = await updateProduct(id, data);
      return response;
    } catch {
      return undefined;
    }
  }, []);

  const handleAddVariant = useCallback(async (id, data) => {
    try {
      const response = await createVariant(id, data);
      return response;
    } catch {
      return undefined;
    }
  }, []);

  const handleGetVariant = useCallback(
    async (id) => {
      try {
        const response = await getVariants(id);
        return response;
      } catch {
        return undefined;
      }
    },
    [],
  );
  const handleGetSimilarProducts = useCallback(async (id) => {
    try {
      const response = await getSimilarProducts(id);
      return response;
    } catch {
      return undefined;
    }
  }, []);

  return {
    sellerProducts,
    products,
    handleCreateProduct,
    handleDeleteProduct,
    handleGetSellerProducts,
    handleGetAllProducts,
    handleGetProductById,
    handleUpdateProduct,
    handleAddVariant,
    handleGetVariant,
    handleGetSimilarProducts,
  };
};

export default useProduct;
