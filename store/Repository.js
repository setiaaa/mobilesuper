import { createSlice } from "@reduxjs/toolkit";
import { getDetailDocument, getDocument, getDocumentDibagikan } from "../service/api";

const RepositorySlice = createSlice({
  name: "Repository",
  initialState: {
    dokumen: {
      lists: [],
      detail: {},
    },
    dibagikan: {
      lists: [],
      detail: {},
    },
    loading: false,
    load: false
  },
  reducers: {
    // setDokumentlists: (state, action) => {
    //   state.dokumen.lists = action.payload;
    // },
    // setDokumenDetail: (state, action) => {
    //   state.dokumen.detail = action.payload;
    // },
    // setDibagikanLists: (state, action) => {
    //   state.dibagikan.lists = action.payload;
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(getDocument.fulfilled, (state, action) => {
        state.dokumen.lists = action.payload;
        state.loading = false
        state.load = false
      })
      .addCase(getDocument.pending, (state, action) => {
        state.loading = true
        state.load = true
      })
      .addCase(getDocument.rejected, (state, action) => {
        state.loading = false
        state.load = false
      })
      .addCase(getDetailDocument.fulfilled, (state, action) => {
        state.dokumen.detail = action.payload;
      })
      .addCase(getDocumentDibagikan.fulfilled, (state, action) => {
        state.dibagikan.lists = action.payload;
        state.loading = false
        state.load = false
      })
      .addCase(getDocumentDibagikan.pending, (state, action) => {
        state.loading = true
        state.load = true
      })
      .addCase(getDocumentDibagikan.rejected, (state, action) => {
        state.loading = false
        state.load = false
      })
  },
});

export const { setDokumentlists, setDokumenDetail, setDibagikanLists, setLoadMore } =
  RepositorySlice.actions;

export default RepositorySlice.reducer;
