import { z } from "zod";
const optionalTextField = (label, min = 3, max = 100) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      return trimmed === "" ? undefined : trimmed;
    },
    z
      .string()
      .min(min, `${label} must be at least ${min} characters`)
      .max(max, `${label} cannot exceed ${max} characters`)
      .optional(),
  );

const optionalMobileField = z.preprocess(
  (value) => {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    return trimmed === "" ? undefined : trimmed;
  },
  z
    .string()
    .regex(/^[0-9]{10}$/, "Alternate mobile must be 10 digits")
    .optional(),
);
export const addressFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot exceed 100 characters"),
  mobile: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
  pincode: z
    .string()
    .trim()
    .regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),
  town: z
    .string()
    .trim()
    .min(3, "Town must be at least 3 characters")
    .max(100, "Town cannot exceed 100 characters"),
  address: z
    .string()
    .trim()
    .min(3, "Address must be at least 3 characters")
    .max(100, "Address cannot exceed 100 characters"),
  city: z
    .string()
    .trim()
    .min(3, "City must be at least 3 characters")
    .max(100, "City cannot exceed 100 characters"),
  state: z
    .string()
    .trim()
    .min(3, "State must be at least 3 characters")
    .max(100, "State cannot exceed 100 characters"),
  landmark: optionalTextField("Landmark"),
  alternateMobile: optionalMobileField,
  isDefault: z.boolean().default(false),
});
