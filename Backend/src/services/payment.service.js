import rajorpay from "razorpay";
import config from "../config/config.js";

const razorpay = new rajorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_KEY_SECRET,
});

export const createOrder = async ({ amount = 1000, currency = "INR" } = {}) => {
  const options = {
    amount: amount * 100, // it contains price in paisa
    currency,
  };
  const order = await razorpay.orders.create(options);
  return order;
};
