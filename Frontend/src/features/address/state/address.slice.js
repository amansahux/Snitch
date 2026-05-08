import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addresses: [],
  selectedAddress: null,
  isLoading: false,
  error: null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      const addresses = Array.isArray(action.payload) ? action.payload : [];
      state.addresses = addresses;

      if (!addresses.length) {
        state.selectedAddress = null;
        state.error = null;
        return;
      }

      const currentSelectedId = state.selectedAddress?._id;
      const preservedSelected = addresses.find(
        (a) => a._id === currentSelectedId,
      );
      const fallbackSelected =
        addresses.find((a) => a.isDefault) || addresses[0];

      state.selectedAddress = preservedSelected || fallbackSelected;
      state.error = null;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload || null;
    },
    addAddress: (state, action) => {
      const newAddress = action.payload;
      if (!newAddress?._id) return;

      // If new address is default, set all others to non-default
      let currentAddresses = state.addresses;
      if (newAddress.isDefault) {
        currentAddresses = currentAddresses.map((a) => ({
          ...a,
          isDefault: false,
        }));
      }

      // Add new address and filter out any existing with same ID
      const updatedAddresses = [
        newAddress,
        ...currentAddresses.filter((a) => a._id !== newAddress._id),
      ];

      // Sort: Default first, then by date (most recent first)
      state.addresses = updatedAddresses.sort((a, b) => {
        if (a.isDefault) return -1;
        if (b.isDefault) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      state.selectedAddress = newAddress;
      state.error = null;
    },
    updateAddressInState: (state, action) => {
      const updated = action.payload;
      if (!updated?._id) return;

      // Map over addresses, updating the target and unsetting others if updated is default
      const updatedAddresses = state.addresses.map((address) => {
        if (address._id === updated._id) return updated;
        if (updated.isDefault) return { ...address, isDefault: false };
        return address;
      });

      // Maintain sorting: Default first, then by date
      state.addresses = updatedAddresses.sort((a, b) => {
        if (a.isDefault) return -1;
        if (b.isDefault) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      if (state.selectedAddress?._id === updated._id || updated.isDefault) {
        state.selectedAddress = updated;
      }
      state.error = null;
    },
    removeAddressFromState: (state, action) => {
      const removeId = action.payload;
      state.addresses = state.addresses.filter(
        (address) => address._id !== removeId,
      );

      if (state.selectedAddress?._id === removeId) {
        state.selectedAddress =
          state.addresses.find((address) => address.isDefault) ||
          state.addresses[0] ||
          null;
      }
      state.error = null;
    },
    setAddressLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAddressError: (state, action) => {
      state.error = action.payload;
    },
    clearAddressError: (state) => {
      state.error = null;
    },
    resetAddressState: () => initialState,
  },
});

export const {
  setAddresses,
  setSelectedAddress,
  addAddress,
  updateAddressInState,
  removeAddressFromState,
  setAddressLoading,
  setAddressError,
  clearAddressError,
  resetAddressState,
} = addressSlice.actions;

export default addressSlice.reducer;
