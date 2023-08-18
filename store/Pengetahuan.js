import { createSlice } from "@reduxjs/toolkit";

const PengetahuanSlice = createSlice({
    name: 'Pengetahuan',
    initialState: {
        linimasa: {
            lists: [],
        },
        penilaian: {
            lists: []
        }
    },
    reducers: {
        setLiniMasa: (state, action) => {
            state.linimasa.lists = action.payload;
        },
        setPenilaian: (state, action) => {
            state.penilaian.lists = action.payload;
        },
    }
})

export const { setLiniMasa, setPenilaian } =
    PengetahuanSlice.actions;

export default PengetahuanSlice.reducer;
