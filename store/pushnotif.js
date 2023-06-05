import { createSlice } from "@reduxjs/toolkit";

const pushnotifSlice = createSlice({
  name: "pushnotif",
  initialState: {
    dataNotif: {},
  },
  reducers: {
    setDataNotif: (state, action) => {
      state.dataNotif = action.payload;
    },
  },
});

export const { setDataNotif } = pushnotifSlice.actions;

export default pushnotifSlice.reducer;
