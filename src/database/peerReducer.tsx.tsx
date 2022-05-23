import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Peer, { DataConnection } from "peerjs";

export interface PeerContext {
  peer: Peer | undefined;
  connections: DataConnection[];
}

export const initialPeerState: PeerContext = {
  peer: undefined,
  connections: [],
};

export const peerReducer = createSlice({
  name: "peerContext",
  initialState: initialPeerState,
  reducers: {
    setPeerContext: (state, action: PayloadAction<PeerContext>) =>
      action.payload,
    changePeer: (state, action: PayloadAction<Peer>) => {
      return { ...state, peer: action.payload };
    },
    changeConnections: (state, action: PayloadAction<DataConnection[]>) => {
      return { ...state, connections: action.payload };
    },
    addConnections: (state, action: PayloadAction<DataConnection>) => {
      let newConns = [...state.connections];
      newConns.push(action.payload);
      return { ...state, connections: newConns };
    },
  },
});

export const { setPeerContext, changePeer, changeConnections, addConnections } =
  peerReducer.actions;

export default peerReducer.reducer;
