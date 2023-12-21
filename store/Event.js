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
  getEventFilter,
  getEventProgress,
  getEventToday,
  getlistAbsen,
  getlistApprover,
  getlistKalender,
  getlistNotulensi,
  getlistTodo,
  postAttachment,
  postEvent,
  postKomenTodo,
  postSubAgenda,
  postTodo,
  putAbsen,
  readyToApprove,
  updateEvent,
  updateStatus,
  updateSubAgenda,
  updateTodo,
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
    eventFilter: {
      list: [],
    },
    kalenderLists: [],
    attachment: [],
    status: "",
    statusEvent: {},
    loading: false,
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
    setAttachment: (state, action) => {
      state.attachment = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEvent.fulfilled, (state, action) => {
        state.event.lists = action.payload;
        state.loading = false;
      })
      .addCase(getEvent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getEventToday.fulfilled, (state, action) => {
        state.event.lists = action.payload;
        state.loading = false;
      })
      .addCase(getEventToday.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEventToday.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getEventProgress.fulfilled, (state, action) => {
        state.event.listsprogress = action.payload;
        state.loading = false;
      })
      .addCase(getEventProgress.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEventProgress.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getEventFilter.fulfilled, (state, action) => {
        state.eventFilter.list = action.payload;
        state.loading = false;
      })
      .addCase(getEventFilter.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEventFilter.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getEventDetail.fulfilled, (state, action) => {
        state.event.detailEvent = action.payload;
        state.loading = false;
      })
      .addCase(getEventDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEventDetail.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getEventAgenda.fulfilled, (state, action) => {
        state.agenda.lists = action.payload;
        state.loading = false;
      })
      .addCase(getEventAgenda.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEventAgenda.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getEventAgendaDetail.fulfilled, (state, action) => {
        state.agenda.detail = action.payload;
        state.loading = false;
      })
      .addCase(getEventAgendaDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getEventAgendaDetail.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getlistApprover.fulfilled, (state, action) => {
        state.approver.lists = action.payload;
        state.loading = false;
      })
      .addCase(getlistApprover.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getlistApprover.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getlistNotulensi.fulfilled, (state, action) => {
        state.notulensi.lists = action.payload;
        state.loading = false;
      })
      .addCase(getlistNotulensi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getlistNotulensi.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getDetailNotulensi.fulfilled, (state, action) => {
        state.notulensi.detail = action.payload;
        state.loading = false;
      })
      .addCase(getDetailNotulensi.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailNotulensi.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getlistTodo.fulfilled, (state, action) => {
        state.todo.lists = action.payload;
        state.loading = false;
      })
      .addCase(getlistTodo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getlistTodo.rejected, (state, action) => {
        state.todo.lists = action.payload;
        state.loading = false;
      })
      .addCase(getDetailTodo.fulfilled, (state, action) => {
        state.todo.detail = action.payload;
        state.loading = false;
      })
      .addCase(getDetailTodo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDetailTodo.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getlistAbsen.fulfilled, (state, action) => {
        state.absen.lists = action.payload;
        state.loading = false;
      })
      .addCase(getlistAbsen.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getlistAbsen.rejected, (state, action) => {
        state.loading = false;
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
      })
      .addCase(postAttachment.fulfilled, (state, action) => {
        console.log("berhasi");
        state.attachment = [...state.attachment, action.payload];
      })
      .addCase(postAttachment.rejected, (state, action) => {
        console.log("gagal");
      })
      .addCase(postEvent.fulfilled, (state, action) => {
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(postEvent.pending, (state, action) => {
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(postEvent.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "error";
        state.loading = false;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.statusEvent = action.payload;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(updateEvent.pending, (state, action) => {
        state.status = "berhasil";
        state.loading = true;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "error";
        state.loading = false;
      })
      .addCase(postSubAgenda.fulfilled, (state, action) => {
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(postSubAgenda.pending, (state, action) => {
        state.status = "berhasil";
        state.loading = true;
      })
      .addCase(postSubAgenda.rejected, (state, action) => {
        console.log(action.payload, "error");
        state.status = "error";
        state.loading = false;
      })
      .addCase(updateSubAgenda.fulfilled, (state, action) => {
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(updateSubAgenda.pending, (state, action) => {
        state.status = "berhasil";
        state.loading = true;
      })
      .addCase(updateSubAgenda.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "error";
        state.loading = false;
      })
      .addCase(readyToApprove.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "error";
      })
      .addCase(readyToApprove.fulfilled, (state, action) => {
        state.status = "berhasil";
      })
      .addCase(postTodo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(postTodo.pending, (state, action) => {
        console.log(action.payload);
        state.status = "berhasil";
        state.loading = true;
      })
      .addCase(postTodo.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "error";
        state.loading = false;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(updateTodo.pending, (state, action) => {
        console.log(action.payload);
        state.status = "berhasil";
        state.loading = true;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        console.log(action.payload);
        state.status = "error";
        state.loading = false;
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
  setAttachment,
  setStatus,
} = EventSlice.actions;
export default EventSlice.reducer;
