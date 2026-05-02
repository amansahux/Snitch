import { asyncHandler } from "../middlewares/asyncHandler.middleware";
import addressModel from "../models/address.model";

export const createAddress = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {
      fullName,
      mobile,
      pincode,
      town,
      address,
      city,
      state,
      landmark,
      alternateMobile,
      isDefault,
    } = req.body;
    const createdAddress = await addressModel.create({
      user: userId,
      fullName,
      mobile,
      pincode,
      town,
      address,
      city,
      state,
      landmark,
      alternateMobile,
      isDefault,
    });
    return res.status(201).json({
      success: true,
      message: "Address created successfully",
      data: createdAddress,
      error: null,
    });
  } catch (error) {
    return next(error);
  }
});

export const updateAddress = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;
    const {
      fullName,
      mobile,
      pincode,
      town,
      address,
      city,
      state,
      landmark,
      alternateMobile,
      isDefault,
    } = req.body;
    const updatedAddress = await addressModel.findOneAndUpdate(
      { _id: addressId, user: userId },
      {
        fullName,
        mobile,
        pincode,
        town,
        address,
        city,
        state,
        landmark,
        alternateMobile,
        isDefault,
      },
      { new: true },
    );
    if (!updatedAddress) {
      const error = new Error("Address not found");
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updatedAddress,
      error: null,
    });
  } catch (error) {
    return next(error);
  }
});
export const deleteAddress = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.user._id;
    const addressId = req.params.id;
    const deletedAddress = await addressModel.findOneAndDelete({
      _id: addressId,
      user: userId,
    });
    if (!deletedAddress) {
      const error = new Error("Address not found");
      error.statusCode = 404;
      return next(error);
    }
    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      data: deletedAddress,
      error: null,
    });
  } catch (error) {
    return next(error);
  }
});
