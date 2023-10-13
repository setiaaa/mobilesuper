import { createSlice } from "@reduxjs/toolkit";
import { getDetailAcara, getDetailAgendaAcara, getListAcara, getListAgendaAcara, getListGrup, getListSubAgenda } from "../service/api";

const GrupKalenderSlice = createSlice({
  name: "GrupKalender",
  initialState: {
    agenda: {
      lists: [],
      detail: {},
    },
    dropdown: {
      kategori: [],
      subKategori: {},
    },
    acara: {
      lists: [],
      detail: {}
    },
    agendaAcara: {
      lists: [],
      detail: {},
      listsSub: []
    },

  },
  reducers: {
    setAgenda: (state, action) => {
      state.agenda.lists = action.payload;
    },
    setAgendaDetail: (state, action) => {
      state.agenda.detail = action.payload;
    },
    setKategori: (state, action) => {
      state.dropdown.kategori = action.payload;
    },
    setSubKategori: (state, action) => {
      state.dropdown.subKategori = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListGrup.fulfilled, (state, action) => {
        state.agenda.lists = action.payload;
      })
      .addCase(getListAcara.fulfilled, (state, action) => {
        state.acara.lists = action.payload;
      })
      .addCase(getDetailAcara.fulfilled, (state, action) => {
        state.acara.detail = action.payload;
      })
      .addCase(getListAgendaAcara.fulfilled, (state, action) => {
        state.acara.lists = action.payload;
      })
      .addCase(getDetailAgendaAcara.fulfilled, (state, action) => {
        state.acara.detail = action.payload;
      })
      .addCase(getListSubAgenda.fulfilled, (state, action) => {
        state.agendaAcara.listsSub = action.payload;
      })
  }
});

export const { setAgenda, setAgendaDetail, setKategori, setSubKategori } =
  GrupKalenderSlice.actions;

export default GrupKalenderSlice.reducer;
