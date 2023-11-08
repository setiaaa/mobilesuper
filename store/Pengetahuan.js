import { createSlice } from "@reduxjs/toolkit";
import {
  getDetailLinimasa,
  getDetailPegawai,
  getDetailPenilaian,
  getLinimasa,
  getListCategory,
  getListCompetence,
  getListPegawai,
  getListPegawaiExport,
  getListPenilaian,
  getListPostPegawai,
  getListUnitKerja,
  getListsLike,
  getMyPostCount,
  getMyPostDetail,
  getMyPostLike,
  getMyPostList,
  getMyPostPoint,
  getMyPostView,
  getNilai,
  getSummaryAccumulation,
  getSummaryBadUser,
  getSummaryGraph,
  getSummaryReview,
  getSummaryTotalPost,
  getTotalPenilaian,
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
      graph: {},
      accumulation: {},
      review: {},
    },
    kategori: {
      lists: [],
    },
    kompetensi: {
      lists: [],
    },
    unitKerja: {
      lists: [],
    },
    pegawai: {
      lists: [],
    },
    postinganPegawai: {
      lists: [],
    },
    exportPegawai: {
      lists: [],
    },
    penilaian: {
      lists: [],
      total: {},
      detail: null,
    },
    nilai: [],
    komen: [],
    loading: false,
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
        state.loading = false;
      })
      .addCase(getLinimasa.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLinimasa.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDetailLinimasa.fulfilled, (state, action) => {
        state.linimasa.detail = action.payload;
        state.loading = false;
      })
      .addCase(getDetailLinimasa.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailLinimasa.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getViewLinimasa.fulfilled, (state, action) => {
        state.linimasa.view = action.payload;
        state.loading = false;
      })
      .addCase(getViewLinimasa.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getViewLinimasa.rejected, (state, action) => {
        state.loading = false;
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
        state.loading = false;
      })
      .addCase(getListsLike.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListsLike.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(patchLike.fulfilled, (state, action) => {
        state.refresh = true;
      })
      .addCase(patchUnlike.fulfilled, (state, action) => {
        state.refresh = true;
      })
      .addCase(getListPenilaian.fulfilled, (state, action) => {
        state.penilaian.lists = action.payload;
        state.loading = false;
      })
      .addCase(getListPenilaian.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListPenilaian.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getTotalPenilaian.fulfilled, (state, action) => {
        state.penilaian.total = action.payload;
        state.loading = false;
      })
      .addCase(getTotalPenilaian.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTotalPenilaian.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDetailPenilaian.fulfilled, (state, action) => {
        state.penilaian.detail = action.payload;
        state.loading = false;
      })
      .addCase(getDetailPenilaian.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailPenilaian.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getNilai.fulfilled, (state, action) => {
        state.nilai = action.payload;
        state.loading = false;
      })
      .addCase(getNilai.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getNilai.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(putTakeDown.fulfilled, (state, action) => {
        state.error = false;
        console.log("berhasil");
        state.loading = false;
      })
      .addCase(putTakeDown.pending, (state, action) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(putTakeDown.rejected, (state, action) => {
        state.error = true;
        state.loading = false;
        console.log("gagal");
      })
      .addCase(getMyPostList.fulfilled, (state, action) => {
        state.postinganSaya.lists = action.payload;
        state.loading = false;
      })
      .addCase(getMyPostList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyPostList.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getMyPostDetail.fulfilled, (state, action) => {
        state.postinganSaya.detail = action.payload;
        state.loading = false;
      })
      .addCase(getMyPostDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyPostDetail.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getMyPostView.fulfilled, (state, action) => {
        state.postinganSayaJumlah.dilihat = action.payload;
        state.loading = false;
      })
      .addCase(getMyPostView.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyPostView.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getMyPostPoint.fulfilled, (state, action) => {
        state.postinganSayaJumlah.nilai = action.payload;
        state.loading = false;
      })
      .addCase(getMyPostPoint.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyPostPoint.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getMyPostLike.fulfilled, (state, action) => {
        state.postinganSayaJumlah.disukai = action.payload;
        state.loading = false;
      })
      .addCase(getMyPostLike.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyPostLike.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getMyPostCount.fulfilled, (state, action) => {
        state.postinganSayaJumlah.draft = action.payload;
        state.loading = false;
      })
      .addCase(getMyPostCount.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyPostCount.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSummaryTotalPost.fulfilled, (state, action) => {
        state.summary.total_post = action.payload;
        state.loading = false;
      })
      .addCase(getSummaryTotalPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSummaryTotalPost.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSummaryBadUser.fulfilled, (state, action) => {
        state.summary.bad_user = action.payload;
        state.loading = false;
      })
      .addCase(getSummaryBadUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSummaryBadUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSummaryGraph.fulfilled, (state, action) => {
        state.summary.graph = action.payload;
        state.loading = false;
      })
      .addCase(getSummaryGraph.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSummaryGraph.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSummaryAccumulation.fulfilled, (state, action) => {
        state.summary.accumulation = action.payload;
        state.loading = false;
      })
      .addCase(getSummaryAccumulation.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSummaryAccumulation.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getSummaryReview.fulfilled, (state, action) => {
        state.summary.review = action.payload;
        state.loading = false;
      })
      .addCase(getSummaryReview.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSummaryReview.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getListCategory.fulfilled, (state, action) => {
        state.kategori.lists = action.payload;
        state.loading = false;
      })
      .addCase(getListCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListCategory.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getListCompetence.fulfilled, (state, action) => {
        state.kompetensi.lists = action.payload;
        state.loading = false;
      })
      .addCase(getListCompetence.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListCompetence.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getListUnitKerja.fulfilled, (state, action) => {
        state.unitKerja.lists = action.payload;
        state.loading = false;
      })
      .addCase(getListUnitKerja.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListUnitKerja.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getListPegawai.fulfilled, (state, action) => {
        state.pegawai.lists = action.payload;
        state.loading = false;
      })
      .addCase(getListPegawai.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListPegawai.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getListPostPegawai.fulfilled, (state, action) => {
        state.postinganPegawai.lists = action.payload;
        state.loading = false;
      })
      .addCase(getListPostPegawai.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListPostPegawai.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getListPegawaiExport.fulfilled, (state, action) => {
        state.exportPegawai.lists = action.payload;
        state.loading = false;
      })
      .addCase(getListPegawaiExport.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListPegawaiExport.rejected, (state, action) => {
        state.loading = false;
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
