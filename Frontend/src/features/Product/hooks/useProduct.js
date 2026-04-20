import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProducts,
  getAllProducts,
  getSellerProducts,
  getProductById,
  updateProduct,
} from "../services/product.api.js";
import { setProducts, setSellerProducts } from "../state/product.slice.js";
import { createVariant } from "../services/variant.api.js";

const useProduct = () => {
  const dispatch = useDispatch();
  const { sellerProducts, products } = useSelector((state) => state.product);

  const handleCreateProduct = useCallback(async (data) => {
    try {
      const response = await createProducts(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleGetSellerProducts = useCallback(async () => {
    try {
      const response = await getSellerProducts();
      if (response?.success) {
        dispatch(setSellerProducts(response.data));
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleGetAllProducts = useCallback(async () => {
    try {
      const response = await getAllProducts();
      if (response?.success) {
        dispatch(setProducts(response.data));
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  const handleGetProductById = useCallback(async (id) => {
    try {
      const response = await getProductById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleUpdateProduct = useCallback(async (id, data) => {
    try {
      const response = await updateProduct(id, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleAddVariant = useCallback(async (id, data) => {
    try {
      const response = await createVariant(id, data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    sellerProducts,
    products,
    handleCreateProduct,
    handleGetSellerProducts,
    handleGetAllProducts,
    handleGetProductById,
    handleUpdateProduct,
    handleAddVariant,
  };
};

export default useProduct;
