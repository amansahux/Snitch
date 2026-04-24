import axios from "axios";

const API = axios.create({
  baseURL: "/api/products",
});

const safeRequest = async (request) => {
  try {
    const response = await request();
    return response.data;
  } catch {
    return undefined;
  }
};

export const createProducts = async (data) => {
  return safeRequest(() => API.post("/create", data));
};

export const deleteProduct = async (id) => {
  return safeRequest(() => API.delete(`/delete/${id}`));
};

export const getSellerProducts = async () => {
  return safeRequest(() => API.get("/seller"));
};

export const getAllProducts = async () => {
  return safeRequest(() => API.get("/"));
};

export const getProductById = async (id) => {
  return safeRequest(() => API.get(`/${id}`));
};

export const updateProduct = async (id, data) => {
  return safeRequest(() => API.post(`/update/${id}`, data));
};

export const getSimilarProducts = async (id) => {
  return safeRequest(() => API.get(`/similar/${id}`));
};
