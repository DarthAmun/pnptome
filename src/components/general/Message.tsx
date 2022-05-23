import { useSelector } from "react-redux";
import styled from "styled-components";
import { Group, Player } from "../../database/GroupReducer";
import { RootState } from "../../database/Store";
import { EventDto } from "../../services/ChatService";

interface $MessageProps {
  event: EventDto;
  visible: boolean;
  opacity: number;
}

const Message = ({ event, visible, opacity }: $MessageProps) => {
  const liveGroup: Group = useSelector((state: RootState) => state.group);

  const foundPlayer: Player[] = liveGroup.players.filter(
    (player) => player.peerAddress === event.uuid
  );
  const playerImg: string =
    foundPlayer.length > 0 ? foundPlayer[0].pic : liveGroup.me.pic;

  return (
    <MessageContainer opacity={opacity}>
      <PlayerImg src={playerImg}></PlayerImg>
      <Tooltip visible={visible}>{event.payload}</Tooltip>
    </MessageContainer>
  );
};

export default Message;

const Tooltip = styled.span<{ visible: boolean }>`
  visibility: ${(props) => (props.visible ? "block" : "hidden")};
  width: 120px;
  padding: 5px 0;
  margin-top: -5px;

  z-index: 200;
  position: absolute;
  right: 70px;

  font-size: 16px;
  text-align: center;

  background-color: ${({ theme }) => theme.highlight};
  color: #fff;
  border-radius: 10px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
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
