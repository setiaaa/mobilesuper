import { createSlice } from "@reduxjs/toolkit";
import {
  getAksiPerubahan,
  getDetailAksiPerubahan,
  getDivisionFilter,
  getFilterAksiPerubahan,
  getLaporanAksiPerubahan,
  getSubDivisionFilter,
} from "../service/api";

const AksiPerubahan = createSlice({
  name: "AksiPerubahan",
  initialState: {
    lists: [],
    loading: false,
    filter: [],
    detail: {},
    laporan: [],
    filterSatkerUnker: {
      unker: [],
      satker: [],
    },
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
      })
      .addCase(getDetailAksiPerubahan.fulfilled, (state, action) => {
        state.detail = action.payload;
        state.loading = false;
      })
      .addCase(getDetailAksiPerubahan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailAksiPerubahan.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getLaporanAksiPerubahan.fulfilled, (state, action) => {
        state.laporan = action.payload;
        state.loading = false;
      })
      .addCase(getLaporanAksiPerubahan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLaporanAksiPerubahan.rejected, (state, action) => {
        state.loading = false;
        console.log("gagal");
      })
      .addCase(getDivisionFilter.fulfilled, (state, action) => {
        state.filterSatkerUnker.unker = action.payload;
      })
      .addCase(getSubDivisionFilter.fulfilled, (state, action) => {
        state.filterSatkerUnker.satker = action.payload;
      });
  },
});

export const {} = AksiPerubahan.actions;

export default AksiPerubahan.reducer;
