import { createSlice } from "@reduxjs/toolkit";
import {
  getArsipCuti,
  getCutiPersonal,
  getDashboardSPPD,
  getDocumentAttachmentSPPD,
  getDocumentDetailSPPD,
  getDocumentListSPPD,
} from "../service/api";

const SPPDSlice = createSlice({
  name: "SPPD",
  initialState: {
    dashboard: {},
    loading: false,
    dokumen: {
      lists: [],
      detail: {},
    },
    surat: {},
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDashboardSPPD.fulfilled, (state, action) => {
        state.dashboard = action.payload;
        state.loading = false;
      })
      .addCase(getDashboardSPPD.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDashboardSPPD.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDocumentListSPPD.fulfilled, (state, action) => {
        state.dokumen.lists = action.payload;
        state.loading = false;
      })
      .addCase(getDocumentListSPPD.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDocumentListSPPD.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDocumentDetailSPPD.fulfilled, (state, action) => {
        state.dokumen.detail = action.payload;
        state.loading = false;
      })
      .addCase(getDocumentDetailSPPD.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDocumentDetailSPPD.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDocumentAttachmentSPPD.fulfilled, (state, action) => {
        state.surat = action.payload;
        state.loading = false;
        console.log(action.payload);
      })
      .addCase(getDocumentAttachmentSPPD.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDocumentAttachmentSPPD.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {} = SPPDSlice.actions;

export default SPPDSlice.reducer;
