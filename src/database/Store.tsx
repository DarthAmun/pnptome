import { configureStore } from "@reduxjs/toolkit";
import systemReducer, { setSystem, System } from "./SystemReducer";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    system: systemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
