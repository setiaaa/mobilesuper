import { createSlice } from "@reduxjs/toolkit";
import { getCutiPersonal, getDetailPegawai, getKuotaCuti, getLiburKhusus, getPegawai, getTanggalLibur } from "../service/api";

const CutiSlice = createSlice({
    name: 'Cuti',
    initialState: {
        personal: {},
        loading: false,
        kuota: {},
        libur: [],
        liburKhusus: [],
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
    }
})

export const { } =
    CutiSlice.actions;

export default CutiSlice.reducer;
