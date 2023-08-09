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
        mading: [],
        linimasa: [],
        ultah: [],
        galeri: {
            lists: [],
            detail: {},
        },
        visimisi: {
            visi: {},
            misi: [],
        },
        banner: []
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
            state.galeri.lists = action.payload;

        },
        setDetaiGaleri: (state, action) => {
            state.galeri.detail = action.payload;

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
        setVisiMisi: (state, action) => {
            state.visimisi = action.payload;

        },
        setBanner: (state, action) => {
            state.banner = action.payload;

        },

    }
})

export const { setProfile, setBerita, setDetailBerita, setAgenda, setProgram, setGaleri, setMading, setLinimasa, setUltah, setVisiMisi, setBanner } =
    SuperAppsSlice.actions;

export default SuperAppsSlice.reducer;
