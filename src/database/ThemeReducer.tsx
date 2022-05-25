import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Theme, { darkTheme } from "../components/theme/Theme";

const localTheme = localStorage.getItem("theme");
let initialState: Theme = darkTheme;
console.log(localTheme)
if(localTheme !== null) {
  initialState = JSON.parse(localTheme) as Theme;
}

export const themeReducer = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => action.payload,
  },
});

export const { setTheme } = themeReducer.actions;

export default themeReducer.reducer;
