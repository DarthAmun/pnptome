import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IEntity from "../data/IEntity";

export enum EventType {
  Message,
  Entity,
}

export interface EventPayloadEntity {
  entityName: string;
  entity: IEntity;
}

export interface EventDto {
  uuid: string;
  payload: string | EventPayloadEntity;
  type: EventType;
}

export interface ChatLog {
  events: EventDto[];
}

export const initialChatLogState: ChatLog = {
  events: [],
};

export const chatLogReducer = createSlice({
  name: "chatLog",
  initialState: initialChatLogState,
  reducers: {
    setChatLog: (state, action: PayloadAction<ChatLog>) => action.payload,
    addEvent: (state, action: PayloadAction<EventDto>) => {
      let newConns = [...state.events];
      newConns.push(action.payload);
      return { ...state, events: newConns };
    },
  },
});

export const { setChatLog, addEvent } = chatLogReducer.actions;

export default chatLogReducer.reducer;
