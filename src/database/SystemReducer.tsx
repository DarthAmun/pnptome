import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import systemJson from "../System.json";
import { RootState } from "./Store";

export interface SystemEntity {
  entityName: string;
  icon: string;
  isMainEntity: boolean;
  attributes: string[];
  searchConfig: any;
  tileConfig: any;
  detailConfig: any;
}

export interface System {
  id: number;
  version: string;
  name: string;
  pic: string;
  entities: SystemEntity[];
}

const initialState: System = systemJson as System;

export const systemReducer = createSlice({
  name: "system",
  initialState: initialState,
  reducers: {
    setSystem: (state, action: PayloadAction<System>) => action.payload,
  },
});

export const selectDBName = (state: RootState) =>
  `${state.system.name.toLowerCase()}-${state.system.version}`;

export const { setSystem } = systemReducer.actions;

export default systemReducer.reducer;
