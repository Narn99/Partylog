import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import rootReducer from "../reducers/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store);

// 여기를 수정해야 non-serializable 에러가 해결될 듯. register를 무시하면 어떻게 될까?
