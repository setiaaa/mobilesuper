import { createSlice } from "@reduxjs/toolkit";
import { getKesejahteraan, getPerencanaan, getTeknologi } from "../service/api";

const DashboardSlice = createSlice({
    name: 'Dashboard',
    initialState: {
        berita: {
            lists: [],
            detail: {}
        },
        pengumuman: {
            lists: [],
            detail: {}
        },
        teknologi: {
            lists: [],
            detail: {}
        },
        kesejahteraan: {
            lists: []
        },
        perencanaan: {
            lists: []
        },
        loading: false
    },
    reducers: {
        setBerita: (state, action) => {
            state.berita.lists = action.payload;
        },
        setPengumuman: (state, action) => {
            state.pengumuman.lists = action.payload;
        },
        setTeknologiList: (state, action) => {
            state.teknologi.lists = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getKesejahteraan.fulfilled, (state, action) => {
                state.kesejahteraan.lists = action.payload;
                state.loading = false
            })
            .addCase(getKesejahteraan.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getKesejahteraan.rejected, (state, action) => {
                state.loading = false
            })
            .addCase(getPerencanaan.fulfilled, (state, action) => {
                state.perencanaan.lists = action.payload;
                state.loading = false
            })
            .addCase(getPerencanaan.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getPerencanaan.rejected, (state, action) => {
                state.loading = false
            })
            .addCase(getTeknologi.fulfilled, (state, action) => {
                state.teknologi.lists = action.payload;
                state.loading = false
            })
            .addCase(getTeknologi.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getTeknologi.rejected, (state, action) => {
                state.loading = false
            })
    }
})

export const { setBerita, setPengumuman, setTeknologiList } =
    DashboardSlice.actions;

export default DashboardSlice.reducer;
