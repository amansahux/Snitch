import { z } from "zod";

export const createProductSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(3, "Title must be at least 3 characters")
    .trim(),

  description: z
    .string({ required_error: "Description is required" })
    .min(5, "Description must be at least 5 characters")
    .trim(),

  priceAmount: z.coerce
    .number({
      required_error: "Price amount is required",
      invalid_type_error: "Price amount must be a number",
    })
    .positive("Price must be a positive number"),

  priceCurrency: z
    .enum(["USD", "EUR", "GBP", "JPY", "INR"])
    .optional()
    .default("INR"),
});

export const updateProductSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  priceAmount: z.coerce.number().optional(),
  stock: z.coerce.number().optional(),
  images: z.array(z.string()).optional(),
  existingImages: z.string().optional(), // Added this
  category: z.enum(["Tops", "Bottoms", "Outerwear", "Footwear"]).optional(),
});

export const addVariantSchema = z.object({
  stock: z.coerce.number({
    required_error: "Stock is required",
    invalid_type_error: "Stock must be a number",
  }),
  priceAmount: z.coerce
    .number({
      required_error: "Price amount is required",
      invalid_type_error: "Price amount must be a number",
    })
    .positive("Price must be a positive number"),

  attributes: z
    .object({
      color: z.string().optional(),
      size: z.string().optional(),
    })
    .optional(),
});
