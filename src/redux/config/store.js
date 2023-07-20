import { configureStore } from "@reduxjs/toolkit";
import modal from "../modules/modal";
import detailData from "../modules/detailData";

const store = configureStore({
reducer: { modal, detailData },
middleware: getDefaultMiddleware =>
getDefaultMiddleware({
serializableCheck: false
})
});

export default store;