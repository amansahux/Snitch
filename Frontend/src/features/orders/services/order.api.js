import axios from "axios";

const API = axios.create({
  baseURL: "/api/orders",
});

export const createOrder = async () => {
  const response = await API.post("/create");
  return response.data;
};
