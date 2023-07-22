import { createSlice } from "@reduxjs/toolkit";
const detailClickData = JSON.parse(localStorage.getItem("detailData")) ?? [];
const initialState = { dataList: detailClickData, pagination: {}, marker: {} };

const detailData = createSlice({
  name: "detailData",
  initialState,
  reducers: {
    getDataList: (state, action) => {
      localStorage.setItem("detailData", JSON.stringify(action.payload));
      return (state = { ...state, dataList: action.payload });
    },
    getPagination: (state, action) => {
      return (state = { ...state, pagination: action.payload });
    },
    getServeyData: (state, action) => {
      localStorage.setItem("detailData", JSON.stringify(action.payload));
      return (state = { ...state, dataList: action.payload });
    },
    getMarkerData: (state, action) => {
      return (state = { ...state, marker: action.payload });
    }
  }
});

export const { getDataList, getPagination, getServeyData, getMarkerData } = detailData.actions;
export default detailData.reducer;
