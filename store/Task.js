import { createSlice } from "@reduxjs/toolkit";

const TaskSlice = createSlice({
    name: 'Task',
    initialState: {
        task: {
            lists: [],
            detail: null,
        },
        variant: 'list',
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
    }
})

export const { setTaskLists, setTaskDetail, setVariant } =
    TaskSlice.actions;

export default TaskSlice.reducer;