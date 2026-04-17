
import config from "../config/config.js";

export const errorMiddleware = (err, req, res, next) => {
  console.log(err);
  console.error(err.message);

  const statusCode = err.statusCode || 500;
  const stack = config.NODE_ENV === "development" ? err.stack : null;

  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    success: false,
    error: err.errors,
    stack: stack,
  });
};
