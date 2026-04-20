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
