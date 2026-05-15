import jwt from "jsonwebtoken";
import config from "../config/config.js";
import redis from "../config/cache.js";

const authenticate = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isTokenBlacklisted = await redis.get(token);
  if (isTokenBlacklisted) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    return next(error);
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

export const authenticateSeller = async (req, res, next) => {
  await authenticate(req, res, (err) => {
    if (err) return next(err);

    if (req.user && req.user.role === "seller") {
      return next();
    }

    if (!res.headersSent) {
      return res.status(403).json({ message: "Access denied. Sellers only." });
    }
  });
};
