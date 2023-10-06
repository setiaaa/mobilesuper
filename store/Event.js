import { createSlice } from "@reduxjs/toolkit";
import {
  getDetailNotulensi,
  getDetailTodo,
  getDivision,
  getDivisionTree,
  getEmployee,
  getEvent,
  getEventAgenda,
  getEventAgendaDetail,
  getEventDetail,
  getEventProgress,
  getEventToday,
  getlistAbsen,
  getlistApprover,
  getlistKalender,
  getlistNotulensi,
  getlistTodo,
  postKomenTodo,
  putAbsen,
} from "../service/api";

const EventSlice = createSlice({
  name: "Task",
  initialState: {
    event: {
      lists: [],
      listsprogress: [],
      detailEvent: {},
    },
    agenda: {
      lists: [],
      detail: {},
    },
    approver: {
      lists: [],
    },
    notulensi: {
      lists: [],
      detail: {},
    },
    todo: {
      lists: [],
      detail: {},
    },
    absen: {
      lists: [],
      detail: {},
      checkin: {},
    },
    kalenderLists: [],
  },
  reducers: {
    setEventLists: (state, action) => {
      state.event.lists = action.payload;
    },
    setEventListsToday: (state, action) => {
      state.event.lists = action.payload;
    },
    setEventListsProgress: (state, action) => {
      state.event.listsprogress = action.payload;
    },
    setEventDetail: (state, action) => {
      state.event.detailEvent = action.payload;
    },
    setAgendaLists: (state, action) => {
      state.agenda.lists = action.payload;
    },
    setAgendaDetail: (state, action) => {
      state.agenda.detail = action.payload;
    },
    setApproversiLists: (state, action) => {
      state.approver.lists = action.payload;
    },
    setNotulensiLists: (state, action) => {
      state.notulensi.lists = action.payload;
    },
    setNotulensDetail: (state, action) => {
      state.notulensi.detail = action.payload;
    },
    setTodoLists: (state, action) => {
      state.todo.lists = action.payload;
    },
    setTodoDetail: (state, action) => {
      state.todo.detail = action.payload;
    },
    setAbsenlists: (state, action) => {
      state.absen.lists = action.payload;
    },
    setkalenderlists: (state, action) => {
      state.kalenderLists = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEvent.fulfilled, (state, action) => {
        state.event.lists = action.payload;
      })
      .addCase(getEventToday.fulfilled, (state, action) => {
        state.event.lists = action.payload;
      })
      .addCase(getEventProgress.fulfilled, (state, action) => {
        state.event.listsprogress = action.payload;
      })
      .addCase(getEventDetail.fulfilled, (state, action) => {
        state.event.detailEvent = action.payload;
      })
      .addCase(getEventAgenda.fulfilled, (state, action) => {
        state.agenda.lists = action.payload;
      })
      .addCase(getEventAgendaDetail.fulfilled, (state, action) => {
        state.agenda.detail = action.payload;
      })
      .addCase(getlistApprover.fulfilled, (state, action) => {
        state.approver.lists = action.payload;
      })
      .addCase(getlistNotulensi.fulfilled, (state, action) => {
        state.notulensi.lists = action.payload;
      })
      .addCase(getDetailNotulensi.fulfilled, (state, action) => {
        state.notulensi.detail = action.payload;
      })
      .addCase(getlistTodo.fulfilled, (state, action) => {
        state.todo.lists = action.payload;
      })
      .addCase(getDetailTodo.fulfilled, (state, action) => {
        state.todo.detail = action.payload;
      })
      .addCase(getlistAbsen.fulfilled, (state, action) => {
        state.absen.lists = action.payload;
      })
      .addCase(putAbsen.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(putAbsen.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getlistKalender.fulfilled, (state, action) => {
        let kategori = [];
        const data = action.payload;
        data.map((item) => {
          kategori.push({
            key: item.id,
            value: item.name,
          });
        });
        state.kalenderLists = kategori;
      })
      .addCase(postKomenTodo.fulfilled, (state, action) => {
        const newComment = action.payload.newComment;
        const newDetailTodo = action.payload.detailTodo;
        const parent_id = action.payload.parent_id;

        const index = newDetailTodo.comments.findIndex((item) => {
          return item.id === parent_id;
        });

        if (parent_id === "") {
          newDetailTodo.comments.push(newComment);
        } else {
          newDetailTodo.comments[index].children.push(newComment);
        }
        state.todo.detail = newDetailTodo;
      });
  },
});

export const {
  setEventLists,
  setEventDetail,
  setAgendaLists,
  setAgendaDetail,
  setAbsenlists,
  setEventListsToday,
  setEventListsProgress,
  setApproversiLists,
  setNotulensiLists,
  setNotulensDetail,
  setTodoLists,
  setTodoDetail,
  setkalenderlists,
} = EventSlice.actions;

export default EventSlice.reducer;
