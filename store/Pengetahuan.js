import { createSlice } from "@reduxjs/toolkit";
import {
  getDetailLinimasa,
  getDetailPegawai,
  getDetailPenilaian,
  getLinimasa,
  getListPenilaian,
  getListsLike,
  getMyPostCount,
  getMyPostDetail,
  getMyPostLike,
  getMyPostList,
  getMyPostPoint,
  getMyPostPost,
  getMyPostView,
  getNilai,
  getSummaryBadUser,
  getSummaryTotalPost,
  getViewLinimasa,
  patchLike,
  patchUnlike,
  postComment,
  putTakeDown,
} from "../service/api";

const PengetahuanSlice = createSlice({
  name: "Pengetahuan",
  initialState: {
    refresh: false,
    error: "",
    linimasa: {
      lists: [],
      detail: {},
      listsLike: [],
    },
    postinganSaya: {
      lists: [],
      detail: {},
    },
    postinganSayaJumlah: {
      dilihat: {},
      disukai: {},
      nilai: {},
      draft: {},
    },
    summary: {
      total_post: {},
      bad_user: {},
    },
    penilaian: {
      lists: [],
      detail: null,
    },
    nilai: [],
    komen: [],
  },
  reducers: {
    setLiniMasa: (state, action) => {
      state.linimasa.lists = action.payload;
    },
    setPostinganSaya: (state, action) => {
      state.postinganSaya.lists = action.payload;
    },
    setPostinganSayaJumlah: (state, action) => {
      state.postinganSayaJumlah.dilihat = action.payload;
    },
    setPenilaian: (state, action) => {
      state.penilaian.lists = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(getLinimasa.fulfilled, (state, action) => {
        state.linimasa.lists = action.payload;
      })
      .addCase(getDetailLinimasa.fulfilled, (state, action) => {
        state.linimasa.detail = action.payload;
      })
      .addCase(getViewLinimasa.fulfilled, (state, action) => {
        state.linimasa.view = action.payload;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        console.log(action.payload + "berhasil");
        state.refresh = true;
      })
      .addCase(postComment.rejected, (state, action) => {
        console.log(action.payload + "gagal");
      })
      .addCase(getListsLike.fulfilled, (state, action) => {
        state.linimasa.listsLike = action.payload;
      })
      .addCase(patchLike.fulfilled, (state, action) => {
        state.refresh = true;
      })
      .addCase(patchUnlike.fulfilled, (state, action) => {
        state.refresh = true;
      })
      .addCase(getListPenilaian.fulfilled, (state, action) => {
        state.penilaian.lists = action.payload;
      })
      .addCase(getDetailPenilaian.fulfilled, (state, action) => {
        state.penilaian.detail = action.payload;
      })
      .addCase(getNilai.fulfilled, (state, action) => {
        state.nilai = action.payload;
      })
      .addCase(putTakeDown.fulfilled, (state, action) => {
        state.error = false;
        console.log("berhasil");
      })
      .addCase(putTakeDown.rejected, (state, action) => {
        state.error = true;
        console.log("gagal");
      })
      .addCase(getMyPostList.fulfilled, (state, action) => {
        state.postinganSaya.lists = action.payload;
      })
      .addCase(getMyPostDetail.fulfilled, (state, action) => {
        state.postinganSaya.detail = action.payload;
      })
      .addCase(getMyPostView.fulfilled, (state, action) => {
        state.postinganSayaJumlah.dilihat = action.payload;
      })
      .addCase(getMyPostPoint.fulfilled, (state, action) => {
        state.postinganSayaJumlah.nilai = action.payload;
      })
      .addCase(getMyPostLike.fulfilled, (state, action) => {
        state.postinganSayaJumlah.disukai = action.payload;
      })
      .addCase(getMyPostCount.fulfilled, (state, action) => {
        state.postinganSayaJumlah.draft = action.payload;
      })
      .addCase(getSummaryTotalPost.fulfilled, (state, action) => {
        state.summary.total_post = action.payload;
      })
      .addCase(getSummaryBadUser.fulfilled, (state, action) => {
        state.summary.bad_user = action.payload;
      });
  },
});

export const {
  setLiniMasa,
  setPostinganSaya,
  setPostinganSayaJumlah,
  setPenilaian,
  setRefresh,
} = PengetahuanSlice.actions;

export default PengetahuanSlice.reducer;
