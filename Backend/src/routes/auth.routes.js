import { Router } from "express";
import { validate } from "../middlewares/zod.middleware.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
import {
  getProfile,
  googleCallback,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import passport from "passport";
import config from "../config/config.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const AuthRouter = Router();

AuthRouter.post("/register", validate(registerSchema), registerController);
AuthRouter.post("/login", validate(loginSchema), loginController);
AuthRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
AuthRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      config.NODE_ENV === "development"
        ? "http://localhost:5173/login"
        : "/login",
  }),
  googleCallback,
);
AuthRouter.get("/profile", authenticateUser, getProfile)

export default AuthRouter;
