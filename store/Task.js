import { createSlice } from "@reduxjs/toolkit";
import { editTaskTM, getDetailProjectTM, getDetailTaskTM, getListDashboardTM, getListTaskTM, getTreeTM, postAttachmentTM, postCategoryTM, postCommentTM, postTaskTM } from "../service/api";

const TaskSlice = createSlice({
    name: 'Task',
    initialState: {
        treeView: [],
        list: {
            id: '1',
            name: 'Dashboard',
            type: 'Dashboard',
            data: [],
            detail: null
        },
        attachment: [],
        detailProject: null,
        variant: 'list',
        refresh: null,
        status: '',
        loading: false
    },
    reducers: {
        setVariant: (state, action) => {
            state.variant = action.payload;
        },
        setAddTask: (state, action) => {
            state.addTask = action.payload;
        },
        setRefresh: (state, action) => {
            state.refresh = action.payload
        },
        setStatus: (state, action) => {
            state.status = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(getTreeTM.fulfilled, (state, action) => {
                state.treeView = action.payload;
            })
            .addCase(getListTaskTM.fulfilled, (state, action) => {
                const { data, type } = action.payload
                const newDataList = {
                    id: data.id,
                    name: data.name,
                    type: type,
                    data: data.tasks,
                    detail: null
                }
                state.list = newDataList;
                state.loading = false
            })
            .addCase(getListTaskTM.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getListDashboardTM.fulfilled, (state, action) => {
                const data = action.payload
                const newDataList = {
                    id: '1',
                    name: 'Dashboard',
                    type: 'Dashboard',
                    data: data,
                    detail: null
                }
                state.list = newDataList;
                state.loading = false
            })
            .addCase(getListDashboardTM.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getDetailTaskTM.fulfilled, (state, action) => {
                state.list = {
                    ...state.list,
                    detail: action.payload
                };
                state.loading = false
            })
            .addCase(getDetailTaskTM.pending, (state, action) => {
                state.loading = true
            })
            .addCase(postCommentTM.fulfilled, (state, action) => {
                state.refresh = 'comment'
                state.loading = false
            })
            .addCase(postCommentTM.pending, (state, action) => {
                state.loading = true
            })
            .addCase(postCategoryTM.fulfilled, (state, action) => {
                state.status = 'berhasil'
                state.refresh = 'tree'
                state.loading = false
            })
            .addCase(postCategoryTM.pending, (state, action) => {
                state.loading = true
            })
            .addCase(postCategoryTM.rejected, (state, action) => {
                state.status = 'error'
                state.loading = false
            })
            .addCase(getDetailProjectTM.fulfilled, (state, action) => {
                const data = action.payload.data
                const type = action.payload.type
                if (type !== '') {
                    const newDataList = {
                        ...state.list,
                        id: data.id,
                        name: data.nama,
                        type: 'Detail Project',
                    }
                    state.list = newDataList;
                }
                state.detailProject = data
                state.loading = false
            })
            .addCase(getDetailProjectTM.pending, (state, action) => {
                state.loading = true
            })
            .addCase(postAttachmentTM.fulfilled, (state, action) => {
                state.attachment = [...state.attachment, action.payload]
                state.loading = false
            })
            .addCase(postAttachmentTM.pending, (state, action) => {
                state.attachment = [...state.attachment, action.payload]
                state.loading = true
            })
            .addCase(postTaskTM.fulfilled, (state, action) => {
                state.status = 'berhasil'
                state.refresh = 'list_task'
                state.loading = false
            })
            .addCase(postTaskTM.pending, (state, action) => {
                state.loading = true
            })
            .addCase(postTaskTM.rejected, (state, action) => {
                state.status = 'error'
                state.loading = false
            })
            .addCase(editTaskTM.fulfilled, (state, action) => {
                state.status = 'berhasil'
                state.refresh = 'list_task'
                state.loading = false
            })
            .addCase(editTaskTM.pending, (state, action) => {
                state.loading = true
            })
            .addCase(editTaskTM.rejected, (state, action) => {
                state.status = 'error'
                state.loading = false
            })
    }
})

export const { setVariant, setAddTask, setRefresh, setStatus } =
    TaskSlice.actions;

export default TaskSlice.reducer;