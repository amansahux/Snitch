import * as z from "zod";

const addressSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name cannot exceed 100 characters" }),
  mobile: z.string().length(10),
  pincode: z.string().length(6),
  town: z
    .string()
    .min(3, { message: "Town must be at least 3 characters long" })
    .max(100, { message: "Town cannot exceed 100 characters" }),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters long" })
    .max(100, { message: "Address cannot exceed 100 characters" }),
  city: z
    .string()
    .min(3, { message: "City must be at least 3 characters long" })
    .max(100, { message: "City cannot exceed 100 characters" }),
  state: z
    .string()
    .min(3, { message: "State must be at least 3 characters long" })
    .max(100, { message: "State cannot exceed 100 characters" }),
  landmark: z
    .string()
    .min(3, { message: "Landmark must be at least 3 characters long" })
    .max(100, { message: "Landmark cannot exceed 100 characters" })
    .optional(),
  alternateMobile: z.string().length(10).optional(),
  isDefault: z.boolean().default(false),
});

const updateAddressSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(100, { message: "Name cannot exceed 100 characters" })
    .optional(),
  mobile: z.string().length(10).optional(),
  pincode: z.string().length(6).optional(),
  town: z
    .string()
    .min(3, { message: "Town must be at least 3 characters long" })
    .max(100, { message: "Town cannot exceed 100 characters" })
    .optional(),
  address: z
    .string()
    .min(3, { message: "Address must be at least 3 characters long" })
    .max(100, { message: "Address cannot exceed 100 characters" })
    .optional(),
  city: z
    .string()
    .min(3, { message: "City must be at least 3 characters long" })
    .max(100, { message: "City cannot exceed 100 characters" })
    .optional(),
  state: z
    .string()
    .min(3, { message: "State must be at least 3 characters long" })
    .max(100, { message: "State cannot exceed 100 characters" })
    .optional(),
  landmark: z
    .string()
    .min(3, { message: "Landmark must be at least 3 characters long" })
    .max(100, { message: "Landmark cannot exceed 100 characters" })
    .optional(),
  alternateMobile: z.string().length(10).optional(),
  isDefault: z.boolean().default(false).optional(),
});

export default { addressSchema, updateAddressSchema };
