import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    clipboard: false,
  },
  reducers: {
    setClipboard: (state, action) => {
      state.clipboard = action.payload;
    },
  },
});

export const { setClipboard } = snackbarSlice.actions;

export default snackbarSlice.reducer;
