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
    getSurveyData: (state, action) => {
      localStorage.setItem("detailData", JSON.stringify(action.payload));
      return (state = { ...state, dataList: action.payload });
    },
    getMarkerData: (state, action) => {
      return (state = { ...state, marker: action.payload });
    }
  }
});

export const { getDataList, getPagination, getSurveyData, getMarkerData } = detailData.actions;
export default detailData.reducer;
