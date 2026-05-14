import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: false,
  message: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    resetProfileState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = "";
    },
  },
});

export const { setLoading, setError, setSuccess, setMessage, resetProfileState } =
  profileSlice.actions;

export default profileSlice.reducer;
