import { createSlice } from "@reduxjs/toolkit";

const listBulkSlice = createSlice({
  name: "listbulk",
  initialState: {
    selectedAll: false,
    listAll: [],
    list: [],
  },
  reducers: {
    setSelectedAll: (state, action) => {
      state.selectedAll = action.payload;
    },
    initListAll: (state, action) => {
      state.listAll = action.payload;
    },
    initList: (state, action) => {
      state.list = action.payload;
    },
    setSelectedList: (state, action) => {
      let index;
      if (action.payload != undefined) {
        if (action?.payload?.id) {
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
      }
      if (state.list.length == state.listAll.length) {
        state.selectedAll = true;
      } else {
        state.selectedAll = false;
      }
    },
    removeAllSelectedList: (state) => {
      state.list = [];
    },
  },
});

export const {
  setSelectedAll,
  initListAll,
  initList,
  setSelectedList,
  removeAllSelectedList,
} = listBulkSlice.actions;

export default listBulkSlice.reducer;
