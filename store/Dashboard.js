import { createSlice } from "@reduxjs/toolkit";

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
    }
})

export const { setBerita, setPengumuman, setTeknologiList } =
    DashboardSlice.actions;

export default DashboardSlice.reducer;
