import { createSlice } from "@reduxjs/toolkit";
import { getLastLogAttendence } from "../service/api";
import * as Sentry from "@sentry/react";

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
        Sentry.captureException(action.payload);
      });
  },
});

export const { setLogout } = LoginAuthSlice.actions;

export default LoginAuthSlice.reducer;
