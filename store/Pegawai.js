import { createSlice } from "@reduxjs/toolkit";

const PegawaiSlice = createSlice({
    name: 'Pegawai',
    initialState: {
        pegawai: {
            lists: [],
        },
    },
    reducers: {
        setPegawai: (state, action) => {
            state.pegawai.lists = action.payload;
        },
    }
})

export const { setPegawai } =
    PegawaiSlice.actions;

export default PegawaiSlice.reducer;
