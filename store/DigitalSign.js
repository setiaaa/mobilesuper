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
} from "../service/api";

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
      .addCase(getDetailDigisign.fulfilled, (state, action) => {
        state.loading = false;
        state.digitalsign.detail = action.payload;
      })
      .addCase(getDetailDigisign.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCourseDigiSign.fulfilled, (state, action) => {
        state.loading = false;
        state.courseList = action.payload;
      })
      .addCase(getCourseDigiSign.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addDocumentDigiSign.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(addDocumentDigiSign.fulfilled, (state, action) => {
        state.status = "berhasil";
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
