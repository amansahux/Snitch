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
      const preservedSelected = addresses.find((a) => a._id === currentSelectedId);
      const fallbackSelected = addresses.find((a) => a.isDefault) || addresses[0];

      state.selectedAddress = preservedSelected || fallbackSelected;
      state.error = null;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload || null;
    },
    addAddress: (state, action) => {
      if (!action.payload) return;
      state.addresses = [action.payload, ...state.addresses.filter((a) => a._id !== action.payload._id)];
      state.selectedAddress = action.payload;
      state.error = null;
    },
    updateAddressInState: (state, action) => {
      const updated = action.payload;
      if (!updated?._id) return;

      state.addresses = state.addresses.map((address) =>
        address._id === updated._id ? updated : address,
      );

      if (state.selectedAddress?._id === updated._id || updated.isDefault) {
        state.selectedAddress = updated;
      }
      state.error = null;
    },
    removeAddressFromState: (state, action) => {
      const removeId = action.payload;
      state.addresses = state.addresses.filter((address) => address._id !== removeId);

      if (state.selectedAddress?._id === removeId) {
        state.selectedAddress =
          state.addresses.find((address) => address.isDefault) || state.addresses[0] || null;
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
