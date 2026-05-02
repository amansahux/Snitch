import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./config/config.js";
import productRouter from "./routes/product.routes.js";
import VariantRouter from "./routes/varient.routes.js";
import cartRouter from "./routes/cart.routes.js";
import addressRouter from "./routes/address.routes.js";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(passport.initialize());

passport.use(new GoogleStrategy(
  {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  },
));

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to Snitch Backend API" });
});

app.use("/api/auth", AuthRouter);
app.use("/api/products", productRouter);
app.use("/api/variants", VariantRouter);
app.use("/api/cart", cartRouter);
app.use("/api/addresses", addressRouter);

app.use((req, res, next) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

app.use(errorMiddleware);

export default app;
