import axios from "axios";

const API = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export const getSellerOrders = async () => {
    const response = await API.get("/orders/seller");
    return response.data;
};

export const updateOrderStatus = async (orderId, orderStatus) => {
    const response = await API.put(`/orders/my-orders/${orderId}/status`, { orderStatus });
    return response.data;
};

export const updatePaymentStatus = async (orderId, paymentStatus) => {
    const response = await API.put(`/orders/payment/${orderId}/status`, { paymentStatus });
    return response.data;
};

export const getDashboardStats = async () => {
    const response = await API.get("/dashboard/data");
    return response.data;
};