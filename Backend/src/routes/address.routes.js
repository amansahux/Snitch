import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/zod.middleware.js";
import addressValidator from "../validators/address.validator.js";
import { createAddress, updateAddress, deleteAddress, getAddresses } from "../controllers/address.controller.js";

const addressRouter = Router()

addressRouter.get("/", authenticateUser, getAddresses)
addressRouter.post("/create", authenticateUser, validate(addressValidator.addressSchema), createAddress)
addressRouter.put("/update/:id", authenticateUser, validate(addressValidator.updateAddressSchema), updateAddress)
addressRouter.delete("/delete/:id", authenticateUser, deleteAddress)

export default addressRouter
