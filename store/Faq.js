import { createSlice } from "@reduxjs/toolkit";
import { getFaq } from "../service/api";
import * as Sentry from "@sentry/react-native";

const FaqSlice = createSlice({
  name: "Faq",
  initialState: {
    faq: {
      lists: [],
    },
    loading: false,
  },
  reducers: {
    setFaq: (state, action) => {
      state.faq.lists = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getFaq.fulfilled, (state, action) => {
        // let dataPrev = state.pegawai.lists
        // let dataNext = action.payload
        // let gabung = dataPrev.concat(dataNext)
        state.faq.lists = action.payload;
        state.loading = false;
      })
      .addCase(getFaq.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFaq.rejected, (state, action) => {
        state.loading = false;
        Sentry.captureException(action.payload);
      });
  },
});

export const { setFaq } = FaqSlice.actions;

export default FaqSlice.reducer;
