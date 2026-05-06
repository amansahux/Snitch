import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});
export const uploadProfilePic = async (formData) => {
  const res = await API.patch("/auth/profile/upload-pic", formData);
  return res.data;
};
