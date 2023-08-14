import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import { modalDataReducer } from "./modalDataReducer";
import { messagesDataReducer } from "./messagesDataReducer";
import { persistReducer } from "redux-persist"; // redux-persist의 persistReducer import
import storage from "redux-persist/lib/storage/session"; // storage engine

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // persist 적용될 리듀서
};

const rootReducer = combineReducers({
  auth: authReducer,
  modalData: modalDataReducer,
  messagesData: messagesDataReducer,
});

export default persistReducer(persistConfig, rootReducer);
