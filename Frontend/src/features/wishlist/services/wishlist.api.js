import axios from "axios";

const API = axios.create({
  baseURL: "/api/wishlist",
});

export const addToWishlist = async (productId) => {
  const res = await API.post(`/${productId}`);
  return res.data;
};

export const removeFromWishlist = async (productId) => {
  const res = await API.delete(`/${productId}`);
  return res.data;
};

export const getWishlist = async () => {
  const res = await API.get("/");
  return res.data;
};
