import * as z from "zod"
export const VariantSchema = z.object({
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  fit: z.string().min(1, "Fit is required"),
  material: z.string().min(1, "Material is required"),
  price: z.preprocess((val) => {
    if (typeof val === "string") return JSON.parse(val);
    return val;
  }, z.object({
    mrp: z.number().min(1, "MRP is required"),
    selling: z.number().min(1, "Selling price is required"),
    currency: z.string().default("INR"),
  })),
  stock: z.preprocess((val) => Number(val), z.number().min(0, "Stock is required")),
  images: z.array(z.object({ url: z.string() })).optional(),
});
    
