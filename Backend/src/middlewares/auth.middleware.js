import jwt from "jsonwebtoken";
import config from "../config/config.js";

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token, config.JWT_SECRET);
    req.user = decodedToken;
    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export const authenticateUser = authenticate;
export const authenticateSeller = authenticate;
