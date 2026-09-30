import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const sendTokenResponse = (res, user, message , statusCode = 200) => {
  const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: config.NODE_ENV === "production" ? "strict" : "lax",
  });

  return res.status(statusCode).json({
    message: message,
    success: true,
    data: user,
    error: null,
  });
};
