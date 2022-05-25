import Peer, { DataConnection } from "peerjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "rsuite";
import styled from "styled-components";
import { addEvent, EventDto, EventType } from "../../database/chatLogReducer";
import { RootState } from "../../database/Store";
import { postEvent } from "../../services/ChatService";
import Message from "./Message";

const Chat = () => {
  const dispatch = useDispatch();
  const peer: Peer | undefined = useSelector(
    (state: RootState) => state.peerContext.peer
  );
  const conns: DataConnection[] = useSelector(
    (state: RootState) => state.peerContext.connections
  );
  const events: EventDto[] = useSelector(
    (state: RootState) => state.chatLog.events
  );

  const postMessage = (msg: string) => {
    const uuid: string | null = localStorage.getItem("playerID");
    const ruuid: string = uuid !== null ? uuid : "";
    console.log(ruuid, msg);
    const newEvent: EventDto = {
      uuid: ruuid,
      payload: msg,
      type: EventType.Message,
    };
    dispatch(addEvent(newEvent));
    postEvent(newEvent, peer, conns);
  };

  useEffect(() => {
    console.log("Make listerners for " + conns.length + " Connections");
    conns.forEach((conn: DataConnection) => {
      conn.removeAllListeners();
      conn.on("data", (data) => {
        dispatch(addEvent(data));
      });
      conn.on("error", (data) => {
        console.log(data);
      });
    });
  }, [conns]);

  return (
    <ChatContainer>
      <Button onClick={() => postMessage("test")}>Test</Button>
      <Messages>
        {events.map((event: EventDto, index: number) => (
          <Message
            key={index}
            event={event}
            visible={events.length - 1 === index}
            opacity={1 - (events.length - index) * 0.1}
          />
        ))}
      </Messages>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  padding: 10px;
  overflow-y: auto;
`;

const Messages = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 10px;
`;
