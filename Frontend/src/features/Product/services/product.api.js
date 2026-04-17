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

export const getSellerProducts = async () => {
  try {
    const response = await API.get("/seller");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
