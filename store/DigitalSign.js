import { createSlice } from "@reduxjs/toolkit";
import { getListSignedDigiSign, getCourseDigiSign,getListComposer, getListCompleted, getListInProgress, getDetailDigisign, getListDraft, addDocumentDigiSign } from "../service/api";

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
                state.digitalsign.lists = action.payload;
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
    }
})

export const { setDigitalSignLists,setDigitalSignCourseList,setStatus } =
    DigitalSignSlice.actions;

export default DigitalSignSlice.reducer;
