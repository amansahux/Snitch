import { z } from "zod";

export const productValidationSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Product title must be at least 3 characters long" })
    .max(100, { message: "Product title cannot exceed 100 characters" }),
  
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters long" }),
  
  mrp: z.coerce
    .number({ invalid_type_error: "MRP must be a number" })
    .positive({ message: "MRP must be greater than 0" }),
  
  selling: z.coerce
    .number({ invalid_type_error: "Selling price must be a number" })
    .positive({ message: "Selling price must be greater than 0" }),
  
  currency: z.enum(["INR", "USD", "EUR", "GBP"], {
    errorMap: () => ({ message: "Please select a valid currency" }),
  }),

  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"], {
    errorMap: () => ({ message: "Please select a valid size" }),
  }),
  color: z.string().min(1, "Color is required"),
  fit: z.enum(["Slim", "Regular", "Relaxed", "Oversized"]).default("Regular"),
  material: z.string().min(1, "Material is required"),
  category: z.enum(["Tops", "Bottoms", "Outerwear", "Footwear"], {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  stock: z.coerce
    .number({ invalid_type_error: "Stock must be a number" })
    .min(0, { message: "Stock cannot be negative" }),

  images: z
    .array(z.any())
    .min(1, { message: "You must upload at least 1 image" })
    .max(7, { message: "You can upload a maximum of 7 images" }),
});

export const updateProductSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  description: z.string().min(10, "Description must be at least 10 characters").optional(),
  category: z.string().min(1, "Please select a category").optional(),
  existingImages: z.string().optional(),
  // Note: Variant-specific fields (price, stock, size, color, fit, material)
  // are intentionally excluded here and should be managed via Variant APIs.
});
export const addVariantSchema = z.object({
  size: z.enum(["XS", "S", "M", "L", "XL", "XXL"], {
    errorMap: () => ({ message: "Please select a valid size" }),
  }),
  color: z.string().min(1, "Color is required").trim(),
  fit: z.enum(["Slim", "Regular", "Relaxed", "Oversized"], {
    errorMap: () => ({ message: "Please select a fit type" }),
  }),
  material: z.string().min(1, "Material is required"),
  price: z.object({
    mrp: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "MRP is required"),
    ),
    selling: z.preprocess(
      (val) => Number(val),
      z.number().min(1, "Selling price is required"),
    ),
    currency: z.string().default("INR"),
  }),
  stock: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Stock cannot be negative"),
  ),
});
  