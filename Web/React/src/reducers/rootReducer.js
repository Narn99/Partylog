import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./authReducer";
import { modalDataReducer } from "./modalDataReducer";
import { messagesDataReducer } from "./messagesDataReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  modalData: modalDataReducer,
  messagesData: messagesDataReducer,
});

export default rootReducer;
