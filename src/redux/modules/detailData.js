import { createSlice } from "@reduxjs/toolkit";

const initialState = { dataList: [], pagination: {} };

const detailData = createSlice({
  name: "detailData",
  initialState,
  reducers: {
    getDataList: (state, action) => {
      return (state = { ...state, dataList: action.payload });
    },
    getPagination: (state, action) => {
      return (state = { ...state, pagination: action.payload });
    }
  }
});

export const { getDataList, getPagination } = detailData.actions;
export default detailData.reducer;
