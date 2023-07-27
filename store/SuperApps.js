import { createSlice } from "@reduxjs/toolkit";

const SuperAppsSlice = createSlice({
    name: 'SuperApps',
    initialState: {
        profile: {},
        berita: {
            lists: [],
            detail: {}
        },
        agenda: [],
        program: [],
        galeri: [],
        mading: [],
        linimasa: [],
        ultah: [],
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;

        },
        setBerita: (state, action) => {
            state.berita.lists = action.payload;
        },
        setDetailBerita: (state, action) => {
            state.berita.detail = action.payload;
        },
        setAgenda: (state, action) => {
            state.agenda = action.payload;

        },
        setProgram: (state, action) => {
            state.program = action.payload;

        },
        setGaleri: (state, action) => {
            state.galeri = action.payload;

        },
        setMading: (state, action) => {
            state.mading = action.payload;

        },
        setLinimasa: (state, action) => {
            state.linimasa = action.payload;

        },
        setUltah: (state, action) => {
            state.ultah = action.payload;

        },
    }
})

export const { setProfile, setBerita, setDetailBerita, setAgenda, setProgram, setGaleri, setMading, setLinimasa, setUltah } =
    SuperAppsSlice.actions;

export default SuperAppsSlice.reducer;
