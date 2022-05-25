import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  EventDto,
  EventType,
  EventPayloadEntity,
} from "../../database/chatLogReducer";
import { Group, Player } from "../../database/GroupReducer";
import { RootState } from "../../database/Store";
import { System } from "../../database/SystemReducer";
import { getEntityTileConfig } from "../../services/SystemService";
import EntityTile from "../generic/EntityTile";

interface $MessageProps {
  event: EventDto;
  visible: boolean;
  opacity: number;
}

const Message = ({ event, visible, opacity }: $MessageProps) => {
  const system: System = useSelector((state: RootState) => state.system);
  const liveGroup: Group = useSelector((state: RootState) => state.group);

  const foundPlayer: Player[] = liveGroup.players.filter(
    (player) => player.peerAddress === event.uuid
  );
  const playerImg: string =
    foundPlayer.length > 0 ? foundPlayer[0].pic : liveGroup.me.pic;
  const playerName: string =
    foundPlayer.length > 0 ? foundPlayer[0].name : liveGroup.me.name;

  const renderMessageContentType = () => {
    switch (event.type) {
      case EventType.Message:
        return (
          <>
            <b>{playerName}:</b> {event.payload}
          </>
        );
      case EventType.Entity:
        const eventPayload: EventPayloadEntity =
          event.payload as EventPayloadEntity;
        return (
          <EntityTile
            configs={Object.getOwnPropertyNames(
              getEntityTileConfig(system, eventPayload.entityName)
            )}
            entity={eventPayload.entity}
            entityName={eventPayload.entityName}
            isChatTile
          />
        );
      default:
        return <>default</>;
    }
  };

  return (
    <MessageContainer opacity={opacity}>
      <PlayerImg src={playerImg}></PlayerImg>
      <Tooltip>{renderMessageContentType()}</Tooltip>
    </MessageContainer>
  );
};

export default Message;

const Tooltip = styled.span`
  visibility: "hidden";
  width: fit-content;
  max-width: 300px;
  padding: 5px;
  margin-top: -5px;

  z-index: 200;
  position: absolute;
  right: 80px;

  font-size: 16px;
  text-align: center;

  background-color: ${({ theme }) => theme.highlight};
  color: #fff;
  border-radius: 10px;
  opacity: 0;
  transition: 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent
      ${({ theme }) => theme.highlight};
  }
`;

const MessageContainer = styled.div<{ opacity: number }>`
  opacity: ${(props) => (props.opacity <= 0 ? 0.02 : props.opacity)};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 1;
  }
  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
`;

const PlayerImg = styled.div<{ src: string }>`
  height: 50px;
  width: 50px;
  border-radius: 50px;
  border: ${({ theme }) => theme.highlight} 2px solid;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-position: center; /* Center the image */
  background-size: cover;
`;
