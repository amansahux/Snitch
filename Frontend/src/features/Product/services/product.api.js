import axios from "axios";

const API = axios.create({
  baseURL: "/api/products",
});

export const createProducts = async (data) => {
  try {
    const response = await API.post("/create", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await API.delete(`/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSellerProducts = async () => {
  try {
    const response = await API.get("/seller");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await API.get("/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await API.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await API.post(`/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
