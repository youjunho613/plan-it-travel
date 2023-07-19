import { configureStore } from "@reduxjs/toolkit";
import modal from "../modules/modal";
import detailData from "../modules/detailData";

const store = configureStore({
  reducer: { modal, detailData }
});

export default store;
