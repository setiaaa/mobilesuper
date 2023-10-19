import { createSlice } from "@reduxjs/toolkit";
import { deleteAgendaGrup, deleteGrup, getDetailAcara, getDetailAgendaAcara, getDetailGrup, getListAcara, getListAgendaAcara, getListGrup, getListSubAgenda, postAgendaAcara, postGrup, putEditAgendaGrup, putEditGrup } from "../service/api";

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
    detailGrup: {},
    status: '',

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
    setStatus: (state, action) => {
      state.status = action.payload
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
      .addCase(postGrup.fulfilled, (state, action) => {
        state.status = 'berhasil'
      })
      .addCase(postGrup.rejected, (state, action) => {
        console.log(action.payload)
        state.status = 'error'
      })
      .addCase(getDetailGrup.fulfilled, (state, action) => {
        console.log('berhasil')
        state.detailGrup = action.payload;
      })
      .addCase(postAgendaAcara.fulfilled, (state, action) => {
        state.status = 'berhasil'
      })
      .addCase(postAgendaAcara.rejected, (state, action) => {
        console.log(action.payload)
        state.status = 'error'
      })
      .addCase(putEditGrup.fulfilled, (state, action) => {
        state.status = 'berhasil'
      })
      .addCase(putEditGrup.rejected, (state, action) => {
        console.log(action.payload)
        state.status = 'error'
      })
      .addCase(putEditAgendaGrup.fulfilled, (state, action) => {
        state.status = 'berhasil'
      })
      .addCase(putEditAgendaGrup.rejected, (state, action) => {
        console.log(action.payload)
        console.log('error')
        state.status = 'error'
      })
      .addCase(deleteAgendaGrup.fulfilled, (state, action) => {
        state.status = 'berhasil'
      })
      .addCase(deleteAgendaGrup.rejected, (state, action) => {
        console.log(action.payload)
        console.log('error')
        state.status = 'error'
      })
      .addCase(deleteGrup.fulfilled, (state, action) => {
        state.status = 'berhasil'
      })
      .addCase(deleteGrup.rejected, (state, action) => {
        console.log(action.payload)
        console.log('error')
        state.status = 'error'
      })
  }
});

export const { setAgenda, setAgendaDetail, setKategori, setSubKategori, setStatus } =
  GrupKalenderSlice.actions;

export default GrupKalenderSlice.reducer;
