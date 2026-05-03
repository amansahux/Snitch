import { z } from "zod";

const orderObjectSchema = z.object({
  user: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid user id")
    .optional(),

  items: z
    .array(
      z.object({
        product: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product id"),

        variant: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid variant id"),

        quantity: z.number().int().positive("Quantity must be greater than 0"),

        price: z.number().nonnegative("Price cannot be negative"),

        discountedPrice: z
          .number()
          .nonnegative("Discounted price cannot be negative"),

        size: z.string().trim().min(1, "Size is required"),

        color: z.string().trim().min(1, "Color is required"),

        images: z
          .array(
            z.object({
              url: z.string().url("Invalid image url"),
            }),
          )
          .optional()
          .default([]),
      }),
    )
    .optional(),
  totalAmount: z
    .number()
    .positive("Total amount must be greater than 0")
    .optional(),
  shippingAddress: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid shipping address id")
    .optional(),
  razorpay: z
    .object({
      orderId: z.string().optional(),
      paymentId: z.string().optional(),
      signature: z.string().optional(),
    })
    .optional(),

  paymentStatus: z
    .enum(["pending", "paid", "failed", "refunded"])
    .optional()
    .default("pending"),

  orderStatus: z
    .enum([
      "pending",
      "placed",
      "confirmed",
      "shipped",
      "out_for_delivery",
      "delivered",
      "cancelled",
      "returned",
    ])
    .optional()
    .default("pending"),

  isDelivered: z.boolean().optional().default(false),

  deliveredAt: z.coerce.date().optional(),

  isCancelled: z.boolean().optional().default(false),

  cancelledAt: z.coerce.date().optional(),
});

export const orderSchema = orderObjectSchema.optional().default({});
