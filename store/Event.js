import { createSlice } from "@reduxjs/toolkit";

const EventSlice = createSlice({
    name: 'Task',
    initialState: {
        event: {
            lists: [],
        },
    },
    reducers: {
        setEventLists: (state, action) => {
            state.event.lists = action.payload;

        },
    }
})

export const { setEventLists } =
    EventSlice.actions;

export default EventSlice.reducer;