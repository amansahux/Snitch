import axios from "axios";

const API = axios.create({
  baseURL: "/api/cart",
  withCredentials: true,
});

export const getMyCart = async () => {
  const response = await API.get("/");
  return response.data;
};

export const addItemToCart = async (item) => {
  const response = await API.post("/items", item);
  return response.data;
};

export const updateCartItem = async ({ itemId, quantity }) => {
  const response = await API.patch(`/items/${itemId}`, { quantity });
  return response.data;
};

export const removeCartItem = async (itemId) => {
  const response = await API.delete(`/items/${itemId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await API.delete("/");
  return response.data;
};

export const createCartPaymentOrder = async () => {
  const response = await API.post("/payment/create/order");
  return response.data;
};