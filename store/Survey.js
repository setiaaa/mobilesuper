import { createSlice } from "@reduxjs/toolkit";
import { postSurvey } from "../service/api";

const SurveySlice = createSlice({
  name: "Survey",
  initialState: {
    loading: true,
    status: "",
  },
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postSurvey.fulfilled, (state, action) => {
        state.status = "berhasil";
        state.loading = false;
      })
      .addCase(postSurvey.pending, (state, action) => {
        state.status = "";
        state.loading = true;
      })
      .addCase(postSurvey.rejected, (state, action) => {
        state.status = "error";
        console.log("gagal");
        state.loading = true;
      });
  },
});

export const { setStatus } = SurveySlice.actions;

export default SurveySlice.reducer;
