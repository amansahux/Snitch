import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});
export const uploadProfilePic = async (formData) => {
  const res = await API.patch("/auth/profile/upload-pic", formData);
  return res.data;
};
export const orderCancelByUser = async (orderId) => {
  const res = await API.put(`/orders/${orderId}/cancel`);
  return res.data;
};