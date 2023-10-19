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
        }
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
            })
            .addCase(getPerencanaan.fulfilled, (state, action) => {
                state.perencanaan.lists = action.payload;
            })
            .addCase(getTeknologi.fulfilled, (state, action) => {
                state.teknologi.lists = action.payload;
            })
    }
})

export const { setBerita, setPengumuman, setTeknologiList } =
    DashboardSlice.actions;

export default DashboardSlice.reducer;
