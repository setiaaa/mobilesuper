import { createSlice } from "@reduxjs/toolkit";
import {
  getArsipCuti,
  getCutiPersonal,
  getDetailArsipCuti,
  getDetailPegawai,
  getDokumenPersetujuan,
  getFormCuti,
  getKuotaCuti,
  getLiburKhusus,
  getPegawai,
  getPilihApproval,
  getTanggalLibur,
  postApproval,
  postAttachmentCuti,
  postPembatalanCuti,
  postPengajuanCuti,
  postPengajuanCutiDraft,
  postTanggalCuti,
} from "../service/api";

const CutiSlice = createSlice({
  name: "Cuti",
  initialState: {
    personal: {},
    loading: false,
    kuota: {},
    libur: [],
    liburKhusus: [],
    arsip: {
      lists: [],
      detail: {},
    },
    form: {},
    pilih: [],
    persetujuan: {
      lists: [],
    },
    status: "",
    attachment: [],
    jumlahCuti: {},
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setAttachmentCuti: (state, action) => {
      state.attachment = action.payload;
    },
    setJumlahCuti: (state, action) => {
      state.jumlahCuti = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCutiPersonal.fulfilled, (state, action) => {
        state.personal = action.payload;
        state.loading = false;
      })
      .addCase(getCutiPersonal.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCutiPersonal.rejected, (state, action) => {
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(getKuotaCuti.fulfilled, (state, action) => {
        state.kuota = action.payload;
        state.loading = false;
      })
      .addCase(getKuotaCuti.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getKuotaCuti.rejected, (state, action) => {
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(getTanggalLibur.fulfilled, (state, action) => {
        state.libur = action.payload;
        state.loading = false;
      })
      .addCase(getTanggalLibur.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTanggalLibur.rejected, (state, action) => {
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(getLiburKhusus.fulfilled, (state, action) => {
        state.liburKhusus = action.payload;
        state.loading = false;
      })
      .addCase(getLiburKhusus.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getLiburKhusus.rejected, (state, action) => {
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(getArsipCuti.fulfilled, (state, action) => {
        state.arsip.lists = action.payload;
        state.loading = false;
      })
      .addCase(getArsipCuti.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getArsipCuti.rejected, (state, action) => {
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(getDetailArsipCuti.fulfilled, (state, action) => {
        state.arsip.detail = action.payload;
        state.loading = false;
      })
      .addCase(getDetailArsipCuti.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailArsipCuti.rejected, (state, action) => {
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(getFormCuti.fulfilled, (state, action) => {
        state.form = action.payload;
        state.loading = false;
      })
      .addCase(getFormCuti.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFormCuti.rejected, (state, action) => {
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(getPilihApproval.fulfilled, (state, action) => {
        state.pilih = action.payload;
      })
      .addCase(getDokumenPersetujuan.fulfilled, (state, action) => {
        state.persetujuan.lists = action.payload;
        state.loading = false;
      })
      .addCase(getDokumenPersetujuan.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDokumenPersetujuan.rejected, (state, action) => {
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(postPengajuanCuti.fulfilled, (state, action) => {
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(postPengajuanCuti.pending, (state, action) => {
        state.status = "";
        state.loading = true;
      })
      .addCase(postPengajuanCuti.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(postApproval.fulfilled, (state, action) => {
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(postApproval.pending, (state, action) => {
        state.status = "";
        state.loading = true;
      })
      .addCase(postApproval.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(postAttachmentCuti.fulfilled, (state, action) => {
        // let id_attachment = [];
        // id_attachment.push({ id: action.payload.data.id });
        state.attachment = [{ id: action.payload.data.id }];
        state.loading = false;
      })
      .addCase(postAttachmentCuti.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postAttachmentCuti.rejected, (state, action) => {
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(postPembatalanCuti.fulfilled, (state, action) => {
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(postPembatalanCuti.pending, (state, action) => {
        state.status = "";
        state.loading = true;
      })
      .addCase(postPembatalanCuti.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(postTanggalCuti.fulfilled, (state, action) => {
        state.jumlahCuti = action.payload;
        state.loading = false;
      })
      .addCase(postTanggalCuti.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postTanggalCuti.rejected, (state, action) => {
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(postPengajuanCutiDraft.fulfilled, (state, action) => {
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(postPengajuanCutiDraft.pending, (state, action) => {
        state.status = "";
        state.loading = true;
      })
      .addCase(postPengajuanCutiDraft.rejected, (state, action) => {
        state.status = "error";
        state.loading = false;
        throw new Error(action.payload);
      });
  },
});

export const { setStatus, setAttachmentCuti, setJumlahCuti } =
  CutiSlice.actions;

export default CutiSlice.reducer;
