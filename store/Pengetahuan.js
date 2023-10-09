import { createSlice } from "@reduxjs/toolkit";
import { getDetailLinimasa, getLinimasa, getListsLike, getViewLinimasa, patchLike, patchUnlike, postComment } from "../service/api";

const PengetahuanSlice = createSlice({
    name: 'Pengetahuan',
    initialState: {
        refresh: false,
        linimasa: {
            lists: [],
            detail: {},
            listsLike: []
        },
        penilaian: {
            lists: []
        },
        komen: []
    },
    reducers: {
        setLiniMasa: (state, action) => {
            state.linimasa.lists = action.payload;
        },
        setPenilaian: (state, action) => {
            state.penilaian.lists = action.payload;
        },
        setRefresh: (state, action) => {
            state.refresh = action.payload
        }
    },

    extraReducers(builder) {
        builder
            .addCase(getLinimasa.fulfilled, (state, action) => {
                state.linimasa.lists = action.payload;
            })
            .addCase(getDetailLinimasa.fulfilled, (state, action) => {
                state.linimasa.detail = action.payload;
            })
            .addCase(getViewLinimasa.fulfilled, (state, action) => {
                state.linimasa.view = action.payload;
            })
            .addCase(postComment.fulfilled, (state, action) => {
                console.log(action.payload + 'berhasil')
                state.refresh = true
            })
            .addCase(postComment.rejected, (state, action) => {
                console.log(action.payload + 'gagal')
            })
            .addCase(getListsLike.fulfilled, (state, action) => {
                state.linimasa.listsLike = action.payload;
            })
            .addCase(patchLike.fulfilled, (state, action) => {
                state.refresh = true
            })
            .addCase(patchUnlike.fulfilled, (state, action) => {
                state.refresh = true
            })
    }
})

export const { setLiniMasa, setPenilaian, setRefresh } =
    PengetahuanSlice.actions;

export default PengetahuanSlice.reducer;
