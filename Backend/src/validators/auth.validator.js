import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(3).trim(),

  email: z
    .string()
    .email()
    .trim()
    .toLowerCase()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),

  contact: z.string().regex(/^[0-9]{10}$/).optional(),

  password: z.string().min(6).max(20),

  role: z.enum(["buyer", "seller"]).optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .trim()
    .toLowerCase()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: z.string().min(6).max(20),
});
