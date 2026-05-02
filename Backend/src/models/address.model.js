import mongoose from "mongoose";

const AddressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    fullName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    pincode: { type: String, required: true, trim: true },
    town: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    landmark: { type: String, trim: true },
    alternateMobile: { type: String, trim: true },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const addressModel = mongoose.model("addresses", AddressSchema);
export default addressModel;
