import * as z from "zod";
export const registerSchema = z
  .object({
    fullname: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .trim(),
    email: z
      .string()
      .email("Please enter a valid email address")
      .trim()
      .toLowerCase()
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    password: z.string().min(6, "Password must be at least 6 characters"),
    contact: z
      .string()
      .min(10, "Contact must be at least 10 digits")
      .regex(/^[0-9]{10}$/, "Contact must be 10 digits"),
    isSeller: z.boolean().optional(),
  })
  .transform(({ isSeller, ...rest }) => ({
    ...rest,
    role: isSeller ? "seller" : "buyer",
  }));
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
