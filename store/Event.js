import { createSlice } from "@reduxjs/toolkit";



const EventSlice = createSlice({
    name: 'Task',
    initialState: {
        event: {
            lists: [],
            detail: {}
        },
        agenda: {
            lists: [],
            detail: {}
        },
        absen: []
    },
    reducers: {
        setEventLists: (state, action) => {
            state.event.lists = action.payload;
        },
        setEventDetail: (state, action) => {
            state.event.detail = action.payload;
        },
        setAgendaLists: (state, action) => {
            state.agenda.lists = action.payload;
        },
        setAgendaDetail: (state, action) => {
            state.agenda.detail = action.payload;
        },
        setAbsen: (state, action) => {
            state.absen = action.payload
        }
    }
})

export const { setEventLists, setEventDetail, setAgendaLists, setAgendaDetail, setAbsen } =
    EventSlice.actions;

export default EventSlice.reducer;