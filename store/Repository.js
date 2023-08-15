import { createSlice } from "@reduxjs/toolkit";

const RepositorySlice = createSlice({
    name: 'Repository',
    initialState: {
        dokumen: {
            lists: [],
            detail: {},
        },
        dibagikan: {
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
        setDibagikanLists: (state, action) => {
            state.dibagikan.lists = action.payload;
        }
    }
})

export const { setDokumentlists, setDokumenDetail, setDibagikanLists } =
    RepositorySlice.actions;

export default RepositorySlice.reducer;