import { z } from "zod";

export const orderSchema = z
  .object({
    user: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid user id"),

    razorpay: z
      .object({
        orderId: z.string().optional(),
        paymentId: z.string().optional(),
        signature: z.string().optional(),
      })
      .optional(),

    items: z
      .array(
        z
          .object({
            product: z
              .string()
              .regex(/^[0-9a-fA-F]{24}$/, "Invalid product id"),

            variant: z
              .string()
              .regex(/^[0-9a-fA-F]{24}$/, "Invalid variant id"),

            quantity: z
              .number()
              .int()
              .positive("Quantity must be greater than 0"),

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
          })
          .refine((item) => item.discountedPrice <= item.price, {
            message: "Discounted price cannot be greater than price",
            path: ["discountedPrice"],
          }),
      )
      .min(1, "At least one item required"),

    totalAmount: z.number().positive("Total amount must be greater than 0"),

    paymentStatus: z
      .enum(["pending", "paid", "failed", "refunded"])
      .optional()
      .default("pending"),

    shippingAddress: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid shipping address id"),

    orderStatus: z
      .enum([
        "placed",
        "confirmed",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
      ])
      .optional()
      .default("placed"),

    isDelivered: z.boolean().optional().default(false),

    deliveredAt: z.coerce.date().optional(),

    isCancelled: z.boolean().optional().default(false),

    cancelledAt: z.coerce.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isDelivered && !data.deliveredAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["deliveredAt"],
        message: "deliveredAt is required when delivered",
      });
    }

    if (data.isCancelled && !data.cancelledAt) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["cancelledAt"],
        message: "cancelledAt is required when cancelled",
      });
    }
  });
