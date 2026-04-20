import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
      index: true,
    },
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
    },

    color: {
      type: String,
      required: true,
      trim: true,
    },

    fit: {
      type: String,
      enum: ["Slim", "Regular", "Relaxed", "Oversized"],
      default: "Regular",
    },

    material: {
      type: String,
      default: "Cotton",
    },

    price: {
      mrp: {
        type: Number,
        required: true,
      },
      selling: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: "INR",
      },
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);
variantSchema.index({ product: 1, size: 1, color: 1 }, { unique: true });
const VariantModel = mongoose.model("variants", variantSchema);

export default VariantModel;
