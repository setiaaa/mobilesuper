import { createSlice } from "@reduxjs/toolkit";
import {
  getListSignedDigiSign,
  getCourseDigiSign,
  getListComposer,
  getListCompleted,
  getListInProgress,
  getDetailDigisign,
  getListDraft,
  addDocumentDigiSign,
  getSummaryCount,
  getSummaryList,
  putTandaTangan,
  getListRejected,
  getListReady,
  getListRetry,
  getListSertifikatEksternal,
  getDetailSertifikatEksternal,
  tandaTanganMentri,
  getSubjectList,
  getCounterPerizinanMenteri,
} from "../service/api";
import * as Sentry from "@sentry/react-native";

const DigitalSignSlice = createSlice({
  name: "DigitalSign",
  initialState: {
    digitalsign: {
      lists: [],
      detail: {},
    },
    dokumenlain: {
      lists: [],
      detail: {},
    },
    courseList: [],
    status: "",
    summary: {
      count: {},
      lists: [],
    },
    loading: false,
    eksternal: {
      lists: [],
      detail: {},
    },
    subjectLists: [],
    counter: {},
  },
  reducers: {
    setDigitalSignLists: (state, action) => {
      state.digitalsign.lists = action.payload;
    },
    setDigitalSignCourseList: (state, action) => {
      state.courseList = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setLaporanList: (state, action) => {
      state.summary.lists = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListComposer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.tipe === "bankom") {
          state.digitalsign.lists = action.payload.data;
        } else {
          state.dokumenlain.lists = action.payload.data;
        }
      })
      .addCase(getListComposer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListComposer.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getListInProgress.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.tipe === "bankom") {
          state.digitalsign.lists = action.payload.data;
        } else {
          state.dokumenlain.lists = action.payload.data;
        }
      })
      .addCase(getListInProgress.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListInProgress.rejected, (state, action) => {
        state.loading = false;
        Sentry.captureException(action.error);
      })
      .addCase(getListReady.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.tipe === "bankom") {
          state.digitalsign.lists = action.payload.data;
        } else {
          state.dokumenlain.lists = action.payload.data;
        }
      })
      .addCase(getListReady.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListReady.rejected, (state, action) => {
        state.loading = false;
        Sentry.captureException(action.error);
      })
      .addCase(getListRetry.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.tipe === "bankom") {
          state.digitalsign.lists = action.payload.data;
        } else {
          state.dokumenlain.lists = action.payload.data;
        }
      })
      .addCase(getListRetry.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListRetry.rejected, (state, action) => {
        state.loading = false;
        Sentry.captureException(action.error);
      })
      .addCase(getListCompleted.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.tipe === "bankom") {
          state.digitalsign.lists = action.payload.data;
        } else {
          state.dokumenlain.lists = action.payload.data;
        }
      })
      .addCase(getListCompleted.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListCompleted.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getListDraft.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.tipe === "bankom") {
          state.digitalsign.lists = action.payload.data;
        } else {
          state.dokumenlain.lists = action.payload.data;
        }
      })
      .addCase(getListDraft.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListDraft.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getListSignedDigiSign.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.tipe === "bankom") {
          state.digitalsign.lists = action.payload.data;
        } else {
          state.dokumenlain.lists = action.payload.data;
        }
      })
      .addCase(getListSignedDigiSign.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListSignedDigiSign.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDetailDigisign.fulfilled, (state, action) => {
        state.loading = false;
        state.digitalsign.detail = action.payload;
      })
      .addCase(getDetailDigisign.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailDigisign.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCourseDigiSign.fulfilled, (state, action) => {
        state.loading = false;
        state.courseList = action.payload;
      })
      .addCase(getCourseDigiSign.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCourseDigiSign.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addDocumentDigiSign.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        Sentry.captureException(action.error);
      })
      .addCase(addDocumentDigiSign.fulfilled, (state, action) => {
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(addDocumentDigiSign.pending, (state, action) => {
        state.status = "berhasil";
        state.loading = true;
      })
      .addCase(getSummaryCount.fulfilled, (state, action) => {
        state.summary.count = action.payload;
        state.loading = false;
      })
      .addCase(getSummaryCount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSummaryCount.rejected, (state, action) => {
        state.loading = false;
        Sentry.captureException(action.error);
      })
      .addCase(getSummaryList.fulfilled, (state, action) => {
        state.summary.lists = action.payload;
        state.loading = false;
      })
      .addCase(getSummaryList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSummaryList.rejected, (state, action) => {
        state.loading = false;
        Sentry.captureException(action.error);
      })
      .addCase(putTandaTangan.fulfilled, (state, action) => {
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(putTandaTangan.pending, (state, action) => {
        state.status = "";
        state.loading = true;
      })
      .addCase(putTandaTangan.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        console.log(action.error);
        Sentry.captureException(action.error);
      })
      .addCase(getListRejected.fulfilled, (state, action) => {
        state.loading = false;
        state.dokumenlain.lists = action.payload.data;
      })
      .addCase(getListRejected.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListRejected.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getListSertifikatEksternal.fulfilled, (state, action) => {
        state.loading = false;
        state.eksternal.lists = action.payload;
      })
      .addCase(getListSertifikatEksternal.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListSertifikatEksternal.rejected, (state, action) => {
        state.loading = false;
        Sentry.captureException(action.error);
      })
      .addCase(getDetailSertifikatEksternal.fulfilled, (state, action) => {
        state.loading = false;
        state.eksternal.detail = action.payload;
      })
      .addCase(getDetailSertifikatEksternal.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailSertifikatEksternal.rejected, (state, action) => {
        state.loading = false;
        Sentry.captureException(action.error);
      })
      .addCase(tandaTanganMentri.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "berhasil";
      })
      .addCase(tandaTanganMentri.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(tandaTanganMentri.rejected, (state, action) => {
        state.loading = false;
        state.status = "error";
        console.log(action.error);
        Sentry.captureException(action.error);
      })
      .addCase(getSubjectList.fulfilled, (state, action) => {
        state.loading = false;
        state.subjectLists = action.payload;
      })
      .addCase(getSubjectList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSubjectList.rejected, (state, action) => {
        state.loading = false;
        Sentry.captureException(action.error);
      })
      .addCase(getCounterPerizinanMenteri.fulfilled, (state, action) => {
        state.loading = false;
        state.counter = action.payload;
      })
      .addCase(getCounterPerizinanMenteri.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCounterPerizinanMenteri.rejected, (state, action) => {
        state.loading = false;
        // console.log(action.error);
        Sentry.captureException(action.error);
      });
  },
});

export const {
  setDigitalSignLists,
  setDigitalSignCourseList,
  setStatus,
  setLaporanList,
} = DigitalSignSlice.actions;

export default DigitalSignSlice.reducer;
