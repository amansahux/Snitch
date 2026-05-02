import axios from "axios";

const addressAPI = axios.create({
  baseURL: "/api/addresses",
  withCredentials: true,
});

export const getAddresses = async () => {
  const response = await addressAPI.get("/");
  return response.data;
};

export const createAddress = async (payload) => {
  const response = await addressAPI.post("/create", payload);
  return response.data;
};

export const updateAddress = async (id, payload) => {
  const response = await addressAPI.put(`/update/${id}`, payload);
  return response.data;
};

export const deleteAddress = async (id) => {
  const response = await addressAPI.delete(`/delete/${id}`);
  return response.data;
};

