import { createSlice } from "@reduxjs/toolkit";
import { getParts, getTicket, postTicket, updateTicket } from "../service/api";

const HelpDeskSlice = createSlice({
  name: "HelpDesk",
  initialState: {
    tiket: {
      list: [],
    },
    parts: [],
    status: "",
  },
  reducers: {
    setTiket: (state, action) => {
      state.tiket.list = action.payload;
    },
    setParts: (state, action) => {
      state.parts = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getTicket.fulfilled, (state, action) => {
        state.tiket.list = action.payload;
        state.loading = false;
      })
      .addCase(getTicket.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.loading = false;
        throw new Error(action.payload);
      })
      .addCase(getParts.fulfilled, (state, action) => {
        state.parts = action.payload;
        state.loading = false;
      })
      .addCase(postTicket.rejected, (state, action) => {
        state.status = "error";
        throw new Error(action.payload);
      })
      .addCase(postTicket.fulfilled, (state, action) => {
        state.status = "berhasil";
      });
  },
});

export const { setTiket, setParts, setStatus } = HelpDeskSlice.actions;

export default HelpDeskSlice.reducer;
