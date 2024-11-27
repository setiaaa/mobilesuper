import { createSlice } from "@reduxjs/toolkit";
import {
  getDetailDocument,
  getDivisionFilter,
  getDocument,
  getDocumentDibagikan,
  getDocumentTamplate,
  getDownloadLampiran,
  getSubDivisionFilter,
  postAttachmentRepo,
  postBerbagiDokumen,
  postRating,
  putBerbagiDokumen,
} from "../service/api";
import * as Sentry from "@sentry/react-native";

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
    attachment: [],
    dokumenBerbagi: {},
    refresh: false,
    rating: false,
    status: "",
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
    setStatus: (state, action) => {
      state.status = action.payload;
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
      })
      .addCase(postAttachmentRepo.fulfilled, (state, action) => {
        let data = [...state.attachment, action.payload];
        state.attachment = data;
        state.loading = false;
      })
      .addCase(postAttachmentRepo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postAttachmentRepo.rejected, (state, action) => {
        state.loading = false;
        Sentry.captureException(action.payload);
      })
      .addCase(postBerbagiDokumen.fulfilled, (state, action) => {
        state.dokumenBerbagi = action.payload;
        state.loading = false;
        state.status = "berhasil";
      })
      .addCase(postBerbagiDokumen.pending, (state, action) => {
        state.dokumenBerbagi = action.payload;
        state.loading = true;
      })
      .addCase(postBerbagiDokumen.rejected, (state, action) => {
        state.dokumenBerbagi = action.payload;
        state.loading = false;
        state.status = "gagal";
        console.log(action.error);
      })
      .addCase(putBerbagiDokumen.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "berhasil";
      })
      .addCase(putBerbagiDokumen.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(putBerbagiDokumen.rejected, (state, action) => {
        state.loading = false;
        state.status = "gagal";
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
  setStatus,
} = RepositorySlice.actions;

export default RepositorySlice.reducer;
