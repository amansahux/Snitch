import axios from "axios";

const API = axios.create({
  baseURL: "/api/auth",
});

export const register = async (data) => {
  const response = await API.post("/register", data);
  return response.data;
};

export const login = async (data) => {
  const response = await API.post("/login", data);
  return response.data;
};
