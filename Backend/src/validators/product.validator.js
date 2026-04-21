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

  mrp: z.coerce
    .number({
      required_error: "MRP is required",
      invalid_type_error: "MRP must be a number",
    })
    .positive("MRP must be a positive number"),

  selling: z.coerce
    .number({
      required_error: "Selling price is required",
      invalid_type_error: "Selling price must be a number",
    })
    .positive("Selling price must be a positive number"),

  currency: z
    .enum(["USD", "EUR", "GBP", "JPY", "INR"])
    .optional()
    .default("INR"),

  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"], { required_error: "Size is required" }),
  color: z.string({ required_error: "Color is required" }).trim(),
  fit: z.enum(["Slim", "Regular", "Relaxed", "Oversized"]).optional().default("Regular"),
  material: z.string().optional().default("Cotton"),
  stock: z.coerce
    .number({
      required_error: "Stock is required",
      invalid_type_error: "Stock must be a number",
    })
    .min(0, "Stock cannot be a negative number"),

    category: z.enum(["Tops", "Bottoms", "Outerwear", "Footwear"], { required_error: "Category is required" }),
});

export const updateProductSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  mrp: z.coerce.number().optional(),
  selling: z.coerce.number().optional(),
  stock: z.coerce.number().optional(),
  images: z.array(z.string()).optional(),
  existingImages: z.string().optional(),
  category: z.enum(["Tops", "Bottoms", "Outerwear", "Footwear"]).optional(),
  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"]).optional(),
  color: z.string().optional(),
  fit: z.enum(["Slim", "Regular", "Relaxed", "Oversized"]).optional(),
  material: z.string().optional(),
});


