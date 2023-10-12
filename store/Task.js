import { createSlice } from "@reduxjs/toolkit";
import { getDetailTaskTM, getListDashboardTM, getListTaskTM, getTreeTM, postCategoryTM, postCommentTM } from "../service/api";

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
        variant: 'list',
        refresh: false,
        status: ''
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
            })
            .addCase(getDetailTaskTM.fulfilled, (state, action) => {
                state.list = {
                    ...state.list,
                    detail: action.payload
                };
            })
            .addCase(postCommentTM.fulfilled, (state, action) => {
                state.refresh = true
            })
            .addCase(postCategoryTM.fulfilled, (state, action) => {
                state.status = 'berhasil'
                state.refresh = true
            })
            .addCase(postCategoryTM.rejected, (state, action) => {
                state.status = 'error'
            })
    }
})

export const { setVariant, setAddTask, setRefresh, setStatus } =
    TaskSlice.actions;

export default TaskSlice.reducer;