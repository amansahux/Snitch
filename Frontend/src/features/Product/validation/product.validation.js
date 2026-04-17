import { z } from "zod";

export const productValidationSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Product title must be at least 3 characters long" })
    .max(100, { message: "Product title cannot exceed 100 characters" }),
  
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters long" }),
  
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .positive({ message: "Price must be greater than 0" }),
  
  currency: z.enum(["INR", "USD", "EUR", "GBP"], {
    errorMap: () => ({ message: "Please select a valid currency" }),
  }),

  // The images array is validated further in the component (for file typing/size), 
  // but we ensure it meets the count requirements here.
  images: z
    .array(z.any())
    .min(1, { message: "You must upload at least 1 image" })
    .max(7, { message: "You can upload a maximum of 7 images" }),
});
