import { createSlice } from "@reduxjs/toolkit";

const TaskSlice = createSlice({
    name: 'Task',
    initialState: {
        task: {
            lists: [],
            detail: {},
        }
    },
    reducers: {
        setTaskLists: (state, action) => {
            state.task.lists = action.payload;

        },
        setTaskDetail: (state, action) => {
            state.task.detail = action.payload;

        },
    }
})

export const { setTaskLists, setTaskDetail } =
    TaskSlice.actions;

export default TaskSlice.reducer;