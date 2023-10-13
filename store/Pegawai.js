import { createSlice } from "@reduxjs/toolkit";
import { getDetailPegawai, getPegawai } from "../service/api";

const PegawaiSlice = createSlice({
    name: 'Pegawai',
    initialState: {
        pegawai: {
            lists: [],
            detail: {}
        },
    },
    reducers: {
        setPegawai: (state, action) => {
            state.pegawai.lists = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getPegawai.fulfilled, (state, action) => {
                state.pegawai.lists = action.payload;
            })
            .addCase(getDetailPegawai.fulfilled, (state, action) => {
                state.pegawai.detail = action.payload;
            })
    }
})

export const { setPegawai } =
    PegawaiSlice.actions;

export default PegawaiSlice.reducer;
