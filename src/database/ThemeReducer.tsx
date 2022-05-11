import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Theme, { darkTheme } from "../components/theme/Theme";

export const themeReducer = createSlice({
  name: "theme",
  initialState: darkTheme,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => action.payload,
  },
});

export const { setTheme } = themeReducer.actions;

export default themeReducer.reducer;
