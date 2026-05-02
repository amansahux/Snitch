import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  clearAddressError,
  removeAddressFromState,
  setAddressError,
  setAddressLoading,
  setAddresses,
  setSelectedAddress,
  updateAddressInState,
} from "../state/address.slice.js";
import {
  createAddress,
  deleteAddress,
  getAddresses,
  updateAddress,
} from "../services/address.api.js";

const useAddress = () => {
  const dispatch = useDispatch();
  const { addresses, selectedAddress, isLoading, error } = useSelector(
    (state) => state.address,
  );

  const handleGetAddresses = useCallback(async () => {
    try {
      dispatch(setAddressLoading(true));
      const response = await getAddresses();
      dispatch(setAddresses(response?.data || []));
      return response;
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || "Failed to fetch addresses";
      dispatch(setAddressError(errorMessage));
      throw err;
    } finally {
      dispatch(setAddressLoading(false));
    }
  }, [dispatch]);

  const handleCreateAddress = useCallback(
    async (payload) => {
      try {
        dispatch(setAddressLoading(true));
        const response = await createAddress(payload);
        dispatch(addAddress(response?.data));
        return response;
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message || "Failed to create address";
        dispatch(setAddressError(errorMessage));
        throw err;
      } finally {
        dispatch(setAddressLoading(false));
      }
    },
    [dispatch],
  );

  const handleUpdateAddress = useCallback(
    async (id, payload) => {
      try {
        dispatch(setAddressLoading(true));
        const response = await updateAddress(id, payload);
        dispatch(updateAddressInState(response?.data));
        return response;
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message || "Failed to update address";
        dispatch(setAddressError(errorMessage));
        throw err;
      } finally {
        dispatch(setAddressLoading(false));
      }
    },
    [dispatch],
  );

  const handleDeleteAddress = useCallback(
    async (id) => {
      try {
        dispatch(setAddressLoading(true));
        const response = await deleteAddress(id);
        dispatch(removeAddressFromState(id));
        return response;
      } catch (err) {
        const errorMessage =
          err?.response?.data?.message || "Failed to delete address";
        dispatch(setAddressError(errorMessage));
        throw err;
      } finally {
        dispatch(setAddressLoading(false));
      }
    },
    [dispatch],
  );

  const handleSelectAddress = useCallback(
    (address) => {
      dispatch(setSelectedAddress(address || null));
    },
    [dispatch],
  );

  const handleClearAddressError = useCallback(() => {
    dispatch(clearAddressError());
  }, [dispatch]);

  return {
    addresses,
    selectedAddress,
    isLoading,
    error,
    handleGetAddresses,
    handleCreateAddress,
    handleUpdateAddress,
    handleDeleteAddress,
    handleSelectAddress,
    handleClearAddressError,
  };
};

export default useAddress;
