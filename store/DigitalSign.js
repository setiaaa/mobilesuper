import { createSlice } from "@reduxjs/toolkit";

const DigitalSignSlice = createSlice({
    name: 'DigitalSign',
    initialState: {
        digitalsign: {
            lists: [],
            detail: {}
        },
    },
    reducers: {
        setDigitalSignLists: (state, action) => {
            state.digitalsign.lists = action.payload;
        },
    }
})

export const { setDigitalSignLists } =
    DigitalSignSlice.actions;

export default DigitalSignSlice.reducer;
