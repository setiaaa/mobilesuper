import { createSlice } from "@reduxjs/toolkit";

const PengetahuanSlice = createSlice({
    name: 'Pengetahuan',
    initialState: {
        linimasa: {
            lists: [],
        }
    },
    reducers: {
        setLiniMasa: (state, action) => {
            state.linimasa.lists = action.payload;
        },
    }
})

export const { setLiniMasa } =
    PengetahuanSlice.actions;

export default PengetahuanSlice.reducer;
