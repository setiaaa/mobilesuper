import { createSlice } from "@reduxjs/toolkit";

const GrupKalenderSlice = createSlice({
    name: 'GrupKalender',
    initialState: {
        agenda: {
            lists: [],
            detail: {}
        },
        dropdown: {
            kategori: [],
            subKategori: {}
        }
    },
    reducers: {
        setAgenda: (state, action) => {
            state.agenda.lists = action.payload;

        },
        setAgendaDetail: (state, action) => {
            state.agenda.detail = action.payload;

        },
        setKategori: (state, action) => {
            state.dropdown.kategori = action.payload;

        },
        setSubKategori: (state, action) => {
            state.dropdown.subKategori = action.payload;

        },
    }
})

export const { setAgenda, setAgendaDetail, setKategori, setSubKategori } =
    GrupKalenderSlice.actions;

export default GrupKalenderSlice.reducer;