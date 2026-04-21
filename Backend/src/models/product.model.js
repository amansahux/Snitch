import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
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
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ["Tops", "Bottoms", "Outerwear", "Footwear"],
    },
  },
  { timestamps: true },
);

const productModel = mongoose.model("products", productSchema);

export default productModel;
