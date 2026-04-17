import { useDispatch, useSelector } from "react-redux";
import { createProducts, getSellerProducts } from "../services/product.api.js";
import { setSellerProducts } from "../state/product.slice.js";

const useProduct = () => {
  const dispatch = useDispatch();
  const { sellerProducts } = useSelector((state) => state.product);

  const handleCreateProduct = async (data) => {
    try {
      const response = await createProducts(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetSellerProducts = async () => {
    try {
      const response = await getSellerProducts();
      console.log(response)
      dispatch(setSellerProducts(response.data));
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  
  return {
    sellerProducts,
    handleCreateProduct,
    handleGetSellerProducts,
  };
};

export default useProduct;
