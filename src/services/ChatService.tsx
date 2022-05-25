import Peer, { DataConnection } from "peerjs";
import { EventDto } from "../database/chatLogReducer";

export const postEvent = (
  event: EventDto,
  peer: Peer | undefined,
  conns: DataConnection[]
) => {
  if (peer) {
    if (peer.disconnected && !peer.destroyed) {
      peer.reconnect();
    }
    console.log("Send event...");
    conns.forEach((conn) => {
      if (conn.open) {
        console.log("... to " + conn.peer + " ...");
        conn.send(event);
      }
    });
  }
};

export const postEvents = (
  events: EventDto[],
  peer: Peer | undefined,
  conns: DataConnection[]
) => {
  if (peer) {
    if (peer.disconnected && !peer.destroyed) {
      peer.reconnect();
    }
    console.log("Send event...");
    conns.forEach((conn) => {
      if (conn.open) {
        console.log("... to " + conn.peer + " ...");
        conn.send(events);
      }
    });
  }
};
