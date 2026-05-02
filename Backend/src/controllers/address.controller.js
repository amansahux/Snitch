import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import addressModel from "../models/address.model.js";

// Helper: resolve user ID from JWT payload (signed as { id: user._id })
const resolveUserId = (req) => {
  const userId = req?.user?.id || req?.user?._id || req?.user?.userId;
  if (!userId) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }
  return userId.toString();
};

export const getAddresses = asyncHandler(async (req, res, next) => {
  try {
    const userId = resolveUserId(req);
    const addresses = await addressModel.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Addresses fetched successfully",
      data: addresses,
      error: null,
    });
  } catch (error) {
    return next(error);
  }
});

export const createAddress = asyncHandler(async (req, res, next) => {
  try {
    const userId = resolveUserId(req);
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

    // If this address is being set as default, unset all others first
    if (isDefault) {
      await addressModel.updateMany({ user: userId }, { isDefault: false });
    }

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
      isDefault: isDefault || false,
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
    const userId = resolveUserId(req);
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

    // If setting this as default, unset all others first
    if (isDefault) {
      await addressModel.updateMany({ user: userId }, { isDefault: false });
    }

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
        isDefault: isDefault || false,
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
    const userId = resolveUserId(req);
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