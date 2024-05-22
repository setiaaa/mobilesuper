import { createSlice } from "@reduxjs/toolkit";
import {
  getDetailDocument,
  getDivisionFilter,
  getDocument,
  getDocumentDibagikan,
  getDocumentTamplate,
  getDownloadLampiran,
  getSubDivisionFilter,
  postRating,
} from "../service/api";
import * as Sentry from "@sentry/react";

const RepositorySlice = createSlice({
  name: "Repository",
  initialState: {
    dokumen: {
      lists: [],
      detail: {},
    },
    dibagikan: {
      lists: [],
      detail: {},
    },
    tamplate: {
      lists: [],
      detail: {},
    },
    loading: false,
    load: false,
    filter: {
      unker: [],
      satker: [],
    },
    download: {
      detail: {},
    },
    refresh: false,
    rating: false,
  },
  reducers: {
    // setDokumentlists: (state, action) => {
    //   state.dokumen.lists = action.payload;
    // },
    // setDokumenDetail: (state, action) => {
    //   state.dokumen.detail = action.payload;
    // },
    // setDibagikanLists: (state, action) => {
    //   state.dibagikan.lists = action.payload;
    // },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getDocument.fulfilled, (state, action) => {
        state.dokumen.lists = action.payload;
        state.loading = false;
        state.load = false;
      })
      .addCase(getDocument.pending, (state, action) => {
        state.loading = true;
        state.load = true;
      })
      .addCase(getDocument.rejected, (state, action) => {
        state.loading = false;
        state.load = false;
        Sentry.captureException(action.payload);
      })
      .addCase(getDetailDocument.fulfilled, (state, action) => {
        state.dokumen.detail = action.payload;
      })
      .addCase(getDocumentDibagikan.fulfilled, (state, action) => {
        state.dibagikan.lists = action.payload;
        state.loading = false;
        state.load = false;
      })
      .addCase(getDocumentDibagikan.pending, (state, action) => {
        state.loading = true;
        state.load = true;
      })
      .addCase(getDocumentDibagikan.rejected, (state, action) => {
        state.loading = false;
        state.load = false;
        Sentry.captureException(action.payload);
      })
      .addCase(getDocumentTamplate.fulfilled, (state, action) => {
        state.tamplate.lists = action.payload;
        state.loading = false;
        state.load = false;
      })
      .addCase(getDocumentTamplate.pending, (state, action) => {
        state.loading = true;
        state.load = true;
      })
      .addCase(getDocumentTamplate.rejected, (state, action) => {
        state.loading = false;
        state.load = false;
        Sentry.captureException(action.payload);
      })
      .addCase(getDivisionFilter.fulfilled, (state, action) => {
        state.filter.unker = action.payload;
      })
      .addCase(getSubDivisionFilter.fulfilled, (state, action) => {
        state.filter.satker = action.payload;
      })
      .addCase(getDownloadLampiran.fulfilled, (state, action) => {
        state.download.detail = action.payload;
        state.loading = false;
        state.load = false;
      })
      .addCase(getDownloadLampiran.pending, (state, action) => {
        state.loading = true;
        state.load = true;
      })
      .addCase(getDownloadLampiran.rejected, (state, action) => {
        state.loading = false;
        state.load = false;
        Sentry.captureException(action.payload);
      });
  },
});

export const {
  setDokumentlists,
  setDokumenDetail,
  setDibagikanLists,
  setLoadMore,
  setRefresh,
  setRating,
} = RepositorySlice.actions;

export default RepositorySlice.reducer;
