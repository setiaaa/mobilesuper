import { createSlice } from "@reduxjs/toolkit";
import {
  getBanner,
  getProfileMe,
  getGaleri,
  getBerita,
  getDetailBerita,
} from "../service/api";

const SuperAppsSlice = createSlice({
  name: "SuperApps",
  initialState: {
    profile: {},
    berita: {
      lists: [],
      detail: {},
    },
    agenda: [],
    program: [],
    mading: [],
    linimasa: [],
    ultah: [],
    galeri: {
      lists: [],
      detail: {},
    },
    visimisi: {
      visi: {},
      misi: [],
    },
    banner: [],
    loading: false
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setBerita: (state, action) => {
      state.berita.lists = action.payload;
    },
    setDetailBerita: (state, action) => {
      state.berita.detail = action.payload;
    },
    setAgenda: (state, action) => {
      state.agenda = action.payload;
    },
    setProgram: (state, action) => {
      state.program = action.payload;
    },
    setGaleri: (state, action) => {
      state.galeri.lists = action.payload;
    },
    setDetaiGaleri: (state, action) => {
      state.galeri.detail = action.payload;
    },
    setMading: (state, action) => {
      state.mading = action.payload;
    },
    setLinimasa: (state, action) => {
      state.linimasa = action.payload;
    },
    setUltah: (state, action) => {
      state.ultah = action.payload;
    },
    setVisiMisi: (state, action) => {
      state.visimisi = action.payload;
    },
    setBanner: (state, action) => {
      state.banner = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProfileMe.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false
      })
      .addCase(getProfileMe.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getProfileMe.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.banner = action.payload;
        state.loading = false
      })
      .addCase(getBanner.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getGaleri.fulfilled, (state, action) => {
        state.galeri.lists = action.payload;
        state.loading = false
      })
      .addCase(getGaleri.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getGaleri.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getBerita.fulfilled, (state, action) => {
        state.berita.lists = action.payload;
        state.loading = false
      })
      .addCase(getBerita.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getBerita.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(getDetailBerita.fulfilled, (state, action) => {
        state.berita.detail = action.payload;
        state.loading = false
      })
      .addCase(getDetailBerita.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getDetailBerita.rejected, (state, action) => {
        state.loading = false
      })
  },
});

export const {
  setProfile,
  setBerita,
  setDetailBerita,
  setAgenda,
  setProgram,
  setGaleri,
  setMading,
  setLinimasa,
  setUltah,
  setVisiMisi,
  setBanner,
} = SuperAppsSlice.actions;

export default SuperAppsSlice.reducer;
