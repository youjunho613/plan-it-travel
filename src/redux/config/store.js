import { configureStore } from "@reduxjs/toolkit";
import modal from "../modules/modal";
import detailData from "../modules/detailData";
import firebaseError from "../modules/firebaseError";

const store = configureStore({
  reducer: { modal, detailData, firebaseError },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
