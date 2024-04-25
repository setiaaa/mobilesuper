import { createSlice } from "@reduxjs/toolkit";
import { getAksiPerubahan, getFilterAksiPerubahan } from "../service/api";

const AksiPerubahan = createSlice({
  name: "AksiPerubahan",
  initialState: {
    lists: [],
    loading: false,
    filter: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAksiPerubahan.fulfilled, (state, action) => {
        state.lists = action.payload;
        state.loading = false;
      })
      .addCase(getAksiPerubahan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAksiPerubahan.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getFilterAksiPerubahan.fulfilled, (state, action) => {
        state.filter = action.payload;
        state.loading = false;
      })
      .addCase(getFilterAksiPerubahan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFilterAksiPerubahan.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {} = AksiPerubahan.actions;

export default AksiPerubahan.reducer;
