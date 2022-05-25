import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GroupReducer {
  entityName: string;
  icon: string;
  isMainEntity: boolean;
  attributes: string[];
  searchConfig: any;
  tileConfig: any;
  detailConfig: any;
}

export interface MePlayer {
  name: string;
  isGM: boolean;
  pic: string;
}

export interface Player {
  name: string;
  isGM: boolean;
  peerAddress: string;
  pic: string;
}

export interface Group {
  id: number;
  name: string;
  pic: string;
  me: MePlayer;
  players: Player[];
}

export const initialGroupState: Group = {
  id: -1,
  name: "",
  pic: "",
  me: { name: "me", isGM: true, pic: "" },
  players: [],
};

export const groupReducer = createSlice({
  name: "group",
  initialState: initialGroupState,
  reducers: {
    setGroup: (state, action: PayloadAction<Group>) => action.payload,
  },
});

export const { setGroup } = groupReducer.actions;

export default groupReducer.reducer;
