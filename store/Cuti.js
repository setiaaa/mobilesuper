import { createSlice } from "@reduxjs/toolkit";
import { getArsipCuti, getCutiPersonal, getDetailArsipCuti, getDetailPegawai, getFormCuti, getKuotaCuti, getLiburKhusus, getPegawai, getPilihApproval, getTanggalLibur } from "../service/api";

const CutiSlice = createSlice({
    name: 'Cuti',
    initialState: {
        personal: {},
        loading: false,
        kuota: {},
        libur: [],
        liburKhusus: [],
        arsip: {
            lists: [],
            detail: {}
        },
        form: {},
        pilih: []
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getCutiPersonal.fulfilled, (state, action) => {
                state.personal = action.payload
                state.loading = false
            })
            .addCase(getCutiPersonal.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getCutiPersonal.rejected, (state, action) => {
                state.loading = false
            })
            .addCase(getKuotaCuti.fulfilled, (state, action) => {
                state.kuota = action.payload
                state.loading = false
            })
            .addCase(getKuotaCuti.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getKuotaCuti.rejected, (state, action) => {
                state.loading = false
            })
            .addCase(getTanggalLibur.fulfilled, (state, action) => {
                state.libur = action.payload
                state.loading = false
            })
            .addCase(getTanggalLibur.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getTanggalLibur.rejected, (state, action) => {
                state.loading = false
            })
            .addCase(getLiburKhusus.fulfilled, (state, action) => {
                state.liburKhusus = action.payload
                state.loading = false
            })
            .addCase(getLiburKhusus.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getLiburKhusus.rejected, (state, action) => {
                state.loading = false
            })
            .addCase(getArsipCuti.fulfilled, (state, action) => {
                state.arsip.lists = action.payload
                state.loading = false
            })
            .addCase(getArsipCuti.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getArsipCuti.rejected, (state, action) => {
                state.loading = false
            })
            .addCase(getDetailArsipCuti.fulfilled, (state, action) => {
                state.arsip.detail = action.payload
                state.loading = false
            })
            .addCase(getDetailArsipCuti.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getDetailArsipCuti.rejected, (state, action) => {
                state.loading = false
            })
            .addCase(getFormCuti.fulfilled, (state, action) => {
                state.form = action.payload
                state.loading = false
            })
            .addCase(getFormCuti.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getFormCuti.rejected, (state, action) => {
                state.loading = false
            })
            .addCase(getPilihApproval.fulfilled, (state, action) => {
                state.pilih = action.payload
            })
    }
})

export const { } =
    CutiSlice.actions;

export default CutiSlice.reducer;
