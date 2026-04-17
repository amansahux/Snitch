import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/auth.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import config from "./config/config.js";
import productRouter from "./routes/product.routes.js";
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(passport.initialize());

// console.log("CLIENT ID:", config.GOOGLE_CLIENT_ID, config.GOOGLE_CLIENT_SECRET);

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}))

// Base Route
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Welcome to Snitch Backend API" });
});

// routes
app.use("/api/auth", AuthRouter);
app.use("/api/products", productRouter);

// Generic 404 Route
app.use((req, res, next) => {
  res.status(404).json({ status: "error", message: "Route not found" });
});

app.use(errorMiddleware);

export default app;
