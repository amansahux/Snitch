import rajorpay from "razorpay";
import config from "../config/config.js";

const razorpay = new rajorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_KEY_SECRET,
});

export const createOrder = async ({ amount, currency } = {}) => {
  if (!amount || !currency) {
    const error = new Error("Amount and currency are required");
    error.statusCode = 400;
    throw error;
  }
  const options = {
    amount: amount * 100, // it contains price in paisa
    currency,
  };
  const order = await razorpay.orders.create(options);
  return order;
};
