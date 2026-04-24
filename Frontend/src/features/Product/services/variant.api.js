import axios from "axios";

const API = axios.create({
  baseURL: "/api/variants",
});

const safeRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch {
    return undefined;
  }
};

export const createVariant = async (productId, data) => {
  return safeRequest(() => API.post(`/create/${productId}`, data));
};

export const getVariants = async (productId) => {
  return safeRequest(() => API.get(`/get-variants/${productId}`));
};
