import { createSlice } from "@reduxjs/toolkit";
import {
  getCategory,
  getCategoryId,
  getCategoryIdPage,
  getDokHukum,
} from "../service/api";

const KebijakanSilce = createSlice({
  name: "kebijakan",
  initialState: {
    dokumen: [],
    lists: {},
    dokumenList: [],
    loading: false,
    refresh: false,
  },
  reducers: {
    setDokumen: (state, action) => {
      state.dokumen = action.payload;
    },
    setLists: (state, action) => {
      state.lists = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.map((item) => {
          state.dokumen = [
            ...state.dokumen,
            {
              label: item.bentuk,
              value: item.id_peraturan_cat,
            },
          ];
        });
      })

      .addCase(getCategoryId.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        // action.payload.map((item) => {
        //     state.dokumen = [
        //         ...state.dokumen,
        //         {
        //             label: item.bentuk,
        //             value: item.id_peraturan_cat
        //         }
        //     ]
        // })
        state.lists = action.payload;
      })

      .addCase(getDokHukum.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getDokHukum.fulfilled, (state, action) => {
        state.loading = false;
        state.dokumenList = action.payload;
      });
  },
});

export const { setRefresh } = KebijakanSilce.actions;

export default KebijakanSilce.reducer;
