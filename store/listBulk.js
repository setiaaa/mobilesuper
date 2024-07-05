import { createSlice } from "@reduxjs/toolkit";

const listBulkSlice = createSlice({
  name: "listbulk",
  initialState: {
    list: [],
  },
  reducers: {
    initSelectedList: (state, action) => {
      state.list = action.payload;
    },
    setSelectedList: (state, action) => {
      let index;
      if (action.payload.id) {
        index = state.list.findIndex((item) => item == action.payload.id);
      }
      if (index == -1 || index == undefined) {
        //ADD
        if (!action.payload.progress) {
          state.list.push(action.payload.id);
        }
      } else {
        //REMOVE
        state.list.splice(index, 1);
      }
    },
    removeAllSelectedList: (state) => {
      state.list = [];
    },
  },
});

export const { initSelectedList, setSelectedList, removeAllSelectedList } =
  listBulkSlice.actions;

export default listBulkSlice.reducer;
