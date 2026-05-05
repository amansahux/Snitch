import axios from "axios";

const API = axios.create({
  baseURL: "/api/orders",
});

export const createOrder = async () => {
  const response = await API.post("/create");
  return response.data;
};

export const verifyOrderPayment = async (body) => {
  const response = await API.post("/order/verify-order", body);
  return response.data;
};
export const getOrders = async () => {
  const response = await API.get("/my-orders");
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await API.get(`/my-orders/${id}`);
  return response.data;
};
