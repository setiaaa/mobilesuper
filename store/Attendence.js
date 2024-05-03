import { createSlice } from "@reduxjs/toolkit";
import { getLastLogAttendence } from "../service/api";

const AttendenceSlice = createSlice({
  name: "Attendence",
  initialState: {
    lastlog: {},
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLastLogAttendence.fulfilled, (state, action) => {
        state.lastlog = action.payload;
        state.loading = true;
      })
      .addCase(getLastLogAttendence.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLastLogAttendence.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setLogout } = LoginAuthSlice.actions;

export default LoginAuthSlice.reducer;
