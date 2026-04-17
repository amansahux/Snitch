import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const sendTokenResponse = (res, user, message) => {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // production me true karna
  });

  return res.status(201).json({
    message: message,
    success: true,
    data: user,
    error: null,
  });
};
