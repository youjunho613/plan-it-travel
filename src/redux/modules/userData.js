import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userData = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      return (state = { ...state, currentUser: action.payload });
    },
    deleteUserData: (state) => {
      return (state = { ...state, currentUser: null });
    }
  }
});

export const { addUserData, deleteUserData } = userData.actions;
export default userData.reducer;
