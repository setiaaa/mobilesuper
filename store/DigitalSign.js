import { createSlice } from "@reduxjs/toolkit";
import { getListSignedDigiSign, getCourseDigiSign,getListComposer, getListCompleted, getListInProgress, getDetailDigisign, getListDraft, addDocumentDigiSign, getSummaryCount, getSummaryList } from "../service/api";

const DigitalSignSlice = createSlice({
    name: 'DigitalSign',
    initialState: {
        digitalsign: {
            lists: [],
            detail: {}
        },
        dokumenlain: {
            lists: [],
            detail: {}
        },
        courseList: [],
        status:'',
        summary: {
            count: {},
            lists: [],
        },
        loading: false
    },
    reducers: {
        setDigitalSignLists: (state, action) => {
            state.digitalsign.lists = action.payload;
        },
        setDigitalSignCourseList: (state, action) => {
            state.courseList = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
        setLaporanList: (state, action) => {
            state.summary.lists = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getListComposer.fulfilled, (state, action) => {
                if (action.payload.tipe === 'bankom') {
                    state.digitalsign.lists = action.payload.data;
                } else {
                    state.dokumenlain.lists = action.payload.data;
                }
            })
            .addCase(getListInProgress.fulfilled, (state, action) => {
                if (action.payload.tipe === 'bankom') {
                    state.digitalsign.lists = action.payload.data;
                } else {
                    state.dokumenlain.lists = action.payload.data;
                }
            })
            .addCase(getListCompleted.fulfilled, (state, action) => {
                if (action.payload.tipe === 'bankom') {
                    state.digitalsign.lists = action.payload.data;
                } else {
                    state.dokumenlain.lists = action.payload.data;
                }
            })
            .addCase(getListDraft.fulfilled, (state, action) => {
                if (action.payload.tipe === 'bankom') {
                    state.digitalsign.lists = action.payload.data;
                } else {
                    state.dokumenlain.lists = action.payload.data;
                }
            })
            .addCase(getListSignedDigiSign.fulfilled, (state, action) => {
                if (action.payload.tipe === 'bankom') {
                    state.digitalsign.lists = action.payload.data;
                } else {
                    state.dokumenlain.lists = action.payload.data;
                }
            })
            .addCase(getDetailDigisign.fulfilled, (state, action) => {
                state.digitalsign.detail = action.payload;
            })
            .addCase(getCourseDigiSign.fulfilled, (state, action) => {
                state.courseList = action.payload
            })
            .addCase(addDocumentDigiSign.rejected, (state, action) => {
                console.log(action.payload + ' Error')
                state.status = 'error'
            })
              .addCase(addDocumentDigiSign.fulfilled, (state, action) => {
                console.log(action.payload + ' Berhasil')
                state.status = 'berhasil'
            })
            .addCase(getSummaryCount.fulfilled, (state, action) => {
                state.summary.count = action.payload;
                state.loading = false;
            })
            .addCase(getSummaryCount.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSummaryCount.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getSummaryList.fulfilled, (state, action) => {
                state.summary.lists = action.payload;
                state.loading = false;
            })
            .addCase(getSummaryList.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getSummaryList.rejected, (state, action) => {
                state.loading = false;
            })
    }
})

export const { setDigitalSignLists,setDigitalSignCourseList,setStatus, setLaporanList } =
    DigitalSignSlice.actions;

export default DigitalSignSlice.reducer;
