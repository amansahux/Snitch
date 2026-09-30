import { z } from "zod";

export const registerSchema = z
  .object({
    fullname: z.string().trim().min(3, "Full name must be at least 3 characters"),
    email: z.string().trim().toLowerCase().email("Invalid email address"),
    contact: z
      .union([
        z.number().int().refine((val) => val.toString().length === 10, "Contact must be a 10-digit number"),
        z.string().regex(/^\d{10}$/, "Contact must be a 10-digit number").transform(Number),
      ])
      .optional(),
    password: z.string().min(6, "Password must be at least 6 characters").optional(),
    role: z.enum(["buyer", "seller"]).default("buyer"),
    googleId: z.string().optional(),
    profilePic: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.googleId) {
        return !!data.password && data.password.length >= 6;
      }
      return true;
    },
    {
      message: "Password is required when Google ID is not provided",
      path: ["password"],
    }
  );

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
