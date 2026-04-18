import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import userModel from "../models/user.model.js";
import { sendTokenResponse } from "../utils/sendTokenResponse.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const registerController = asyncHandler(async (req, res, next) => {
  const { email, contact } = req.body;

  // 1. Check if user already exists
  const orConditions = [{ email }];
  if (contact) {
    orConditions.push({ contact });
  }

  const existingUser = await userModel.findOne({
    $or: orConditions,
  });
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    return next(error);
  }

  // 3. Create user
  const user = await userModel.create(req.body);

  // 4. Remove sensitive data
  const userResponse = {
    _id: user._id,
    email: user.email,
    fullname: user.fullname,
    contact: user.contact,
    role: user.role,
  };

  // 5. Send response
  sendTokenResponse(res, userResponse, "User registered successfully");
});

export const loginController = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 404;
    return next(error);
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    return next(error);
  }
  const userResponse = {
    _id: user._id,
    email: user.email,
    fullname: user.fullname,
    contact: user.contact,
    role: user.role,
  };
  sendTokenResponse(res, userResponse, "User logged in successfully");
});

export const googleCallback = asyncHandler(async (req, res, next) => {
  try {
    if (!req.user) {
      return res.redirect(
        config.NODE_ENV === "development"
          ? "http://localhost:5173/login"
          : "/login",
      );
    }

    const { id, displayName, emails } = req.user;
    const email = emails[0].value;

    let user = await userModel.findOne({ email });

    if (!user) {
      // Sign up the user

      user = await userModel.create({
        fullname: displayName,
        email: email,
        googleId: id,
      });
    } else if (!user.googleId) {
      // User exists, but might have signed up normally before. Update googleId.
      user.googleId = id;
      await user.save();
    }

    // Set token
    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production
    });

    // Successfully logged in
    const frontendUrl = "http://localhost:5173";
    const redirectUrl = user.role === "seller" ? `${frontendUrl}/seller/dashboard` : `${frontendUrl}`;
    
    res.redirect(redirectUrl);
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.redirect(
      config.NODE_ENV === "development"
        ? "http://localhost:5173/login"
        : "/login",
    );
  }
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }
  const userResponse = {
    _id: user._id,
    email: user.email,
    fullname: user.fullname,
    contact: user.contact,
    role: user.role,
  };
  res.status(200).json({
    success: true,
    user: userResponse,
    error: null,
  });
});
