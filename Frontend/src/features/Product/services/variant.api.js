import axios from "axios";

const API = axios.create({
    baseURL:"/api/variants"
})

export const createVariant = async (productId, data) => {
    try {
        const response = await API.post(`/create/${productId}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const getVariants = async (productId) => {
    try {
        const response = await API.get(`/get-variants/${productId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}