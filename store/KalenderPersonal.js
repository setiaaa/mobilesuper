import { createSlice } from "@reduxjs/toolkit";
import {
  getDetailKalenderPersonal,
  getlistKalenderPersonal,
} from "../service/api";
import * as Sentry from "@sentry/react-native";

const KalenderPersonalSlice = createSlice({
  name: "KalenderPersonal",
  initialState: {
    personal: {
      lists: [],
      detail: {},
    },
    status: "",
    loading: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getlistKalenderPersonal.fulfilled, (state, action) => {
        state.personal.lists = action.payload;
        state.loading = false;
      })
      .addCase(getlistKalenderPersonal.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getlistKalenderPersonal.rejected, (state, action) => {
        state.loading = false;
        Sentry.captureException(action.error);
      })
      .addCase(getDetailKalenderPersonal.fulfilled, (state, action) => {
        state.personal.detail = action.payload;
        state.loading = false;
      })
      .addCase(getDetailKalenderPersonal.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailKalenderPersonal.rejected, (state, action) => {
        state.loading = false;
        Sentry.captureException(action.error);
      });
  },
});

export default KalenderPersonalSlice.reducer;
