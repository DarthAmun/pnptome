import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import systemReducer from "./SystemReducer";
import groupReducer from "./GroupReducer";
import themeReducer from "./ThemeReducer";
import peerReducer from "./peerReducer.tsx";
import chatLogReducer from "./chatLogReducer";

const store = configureStore({
  reducer: {
    system: systemReducer,
    group: groupReducer,
    theme: themeReducer,
    peerContext: peerReducer,
    chatLog: chatLogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
