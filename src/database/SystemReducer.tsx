import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import systemJson from "../System.json";

export interface SystemEntity {
  entityName: string;
  icon: string;
  attributes: string[];
  searchConfig: any;
  tileConfig: any;
  detailConfig: any;
}

export interface System {
  version: string;
  name: string;
  entities: SystemEntity[];
}

const initialState: System = systemJson as System;

export const systemReducer = createSlice({
  name: "system",
  initialState: initialState,
  reducers: {
    setSystem: (state, action: PayloadAction<System>) => {
      state = action.payload;
    },
  },
});

export const { setSystem } = systemReducer.actions;

export default systemReducer.reducer;
