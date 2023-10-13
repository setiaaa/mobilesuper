import { createSlice } from "@reduxjs/toolkit";
import { getBennerSatker, getGallerySatker, getPesan, getSatkerLinimasa, getSatkerNews, getUltah } from "../service/api";

const SatkerSlice = createSlice({
    name: 'Satker',
    initialState: {
        benner: [],
        gallery: [],
        berita: {
            lists: [],
            detail: {}
        },
        pesan: [],
        ultah: [],
        linimasa: []
    },
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(getBennerSatker.fulfilled, (state, action) => {
                state.benner = action.payload;
            })
            .addCase(getGallerySatker.fulfilled, (state, action) => {
                state.gallery = action.payload;
            })
            .addCase(getSatkerNews.fulfilled, (state, action) => {
                state.berita.lists = action.payload;
            })
            .addCase(getPesan.fulfilled, (state, action) => {
                state.pesan = action.payload;
            })
            .addCase(getUltah.fulfilled, (state, action) => {
                state.ultah = action.payload;
            })
            .addCase(getSatkerLinimasa.fulfilled, (state, action) => {
                state.linimasa = action.payload;
            })
    }
})

export const {

} =
    SatkerSlice.actions;

export default SatkerSlice.reducer;