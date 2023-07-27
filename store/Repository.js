import { createSlice } from "@reduxjs/toolkit";

const RepositorySlice = createSlice({
    name: 'Repository',
    initialState: {
        dokumen: {
            lists: [],
            detail: {},
        },
    },
    reducers: {
        setDokumentlists: (state, action) => {
            state.dokumen.lists = action.payload;

        },
        setDokumenDetail: (state, action) => {
            state.dokumen.detail = action.payload;

        },
    }
})

export const { setDokumentlists, setDokumenDetail } =
    RepositorySlice.actions;

export default RepositorySlice.reducer;