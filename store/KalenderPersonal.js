import { createSlice } from "@reduxjs/toolkit";
import { getlistKalenderPersonal } from "../service/api";

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
      });
  },
});

export default KalenderPersonalSlice.reducer;
