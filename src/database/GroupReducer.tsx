import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Group from "../components/pages/Group";
import { RootState } from "./Store";

export interface GroupReducer {
  entityName: string;
  icon: string;
  isMainEntity: boolean;
  attributes: string[];
  searchConfig: any;
  tileConfig: any;
  detailConfig: any;
}

export interface Player {
  id: number;
  name: string;
  peerAddress: string;
  char?: string;
}

export interface Group {
  id: number;
  name: string;
  gm?: Player;
  players?: Player[];
}

const initialState: Group = { id: 0, name: "" };

export const groupReducer = createSlice({
  name: "group",
  initialState: initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<Group>) => action.payload,
  },
});

export const { setGroup } = groupReducer.actions;

export default groupReducer.reducer;
