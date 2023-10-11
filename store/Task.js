import { createSlice } from "@reduxjs/toolkit";
import { getDetailTaskTM, getListDashboardTM, getListTaskTM, getTreeTM, postCommentTM } from "../service/api";

const TaskSlice = createSlice({
    name: 'Task',
    initialState: {
        treeView: [],
        task: {
            lists: [],
            detail: null,
        },
        list: {
            id: '1',
            name: 'Dashboard',
            type: 'Dashboard',
            data: [],
            detail: null
        },
        variant: 'list',
        addTask: {},
        refresh: false,
    },
    reducers: {
        setTaskLists: (state, action) => {
            state.task.lists = action.payload;
        },
        setTaskDetail: (state, action) => {
            state.task.detail = action.payload;

        },
        setVariant: (state, action) => {
            state.variant = action.payload;

        },
        setAddTask: (state, action) => {
            state.addTask = action.payload;
        },
        setRefresh: (state, action) => {
            state.refresh = action.payload
        }
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
    }
})

export const { setTaskLists, setTaskDetail, setVariant, setAddTask, setRefresh } =
    TaskSlice.actions;

export default TaskSlice.reducer;