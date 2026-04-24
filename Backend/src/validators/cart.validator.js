import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const addCartItemSchema = z.object({
  productId: z
    .string({ required_error: "Product ID is required" })
    .regex(objectIdRegex, "Invalid product ID"),
  variantId: z
    .string({ required_error: "Variant ID is required" })
    .regex(objectIdRegex, "Invalid variant ID"),
  quantity: z.coerce
    .number({
      invalid_type_error: "Quantity must be a number",
    })
    .int("Quantity must be an integer")
    .positive("Quantity must be at least 1")
    .optional()
    .default(1),
});

export const updateCartItemSchema = z.object({
  quantity: z.coerce
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .int("Quantity must be an integer")
    .positive("Quantity must be at least 1"),
});
