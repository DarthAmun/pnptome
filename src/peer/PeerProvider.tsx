import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Peer, { DataConnection } from "peerjs";
import { RootState } from "../database/Store";
import { addConnections, changePeer } from "../database/peerReducer.tsx";

interface $PeerProvider {
  children?: React.ReactNode;
}

const PeerProvider = ({ children }: $PeerProvider) => {
  const liveGroup = useSelector((state: RootState) => state.group);
  const peer = useSelector((state: RootState) => state.peerContext.peer);
  const dispatch = useDispatch();

  let uuid = localStorage.getItem("playerID");

  const makePeerWithUuid = () => {
    if (uuid !== null) {
      console.log("Make peer with ", uuid);
      let newPeer = new Peer(uuid, {
        host: "peerjs.thorbenkuck.de",
        secure: true,
      });
      dispatch(changePeer(newPeer));
    } else {
      uuid = uuidv4();
      localStorage.setItem("playerID", uuid);
    }
  };

  useEffect(() => {
    makePeerWithUuid();
  }, [uuid]);

  useEffect(() => {
    if (peer && liveGroup) {
      let newPeer: Peer = peer;
      newPeer.removeAllListeners();
      newPeer.on("connection", function (conn: DataConnection) {
        console.log("Add new con from " + conn.peer);
        const isValid: boolean =
          liveGroup?.players.filter(
            (player) => player.peerAddress === conn.peer
          ).length > 0;
        if (isValid) {
          console.log("New Connection apporved!");
          dispatch(addConnections(conn));
        } else {
          console.log("New Connection not in current Group!");
        }
      });
      changePeer(newPeer);
      if (!liveGroup.me.isGM) {
        liveGroup.players
          .filter((player) => player.isGM)
          .forEach((player) => {
            const conn = peer.connect(player.peerAddress);
            if (conn) {
              conn.on("open", function () {
                // here you have conn.id
                conn.send(liveGroup.me.name + " connected!");
              });
              dispatch(addConnections(conn));
            }
          });
      }
    }

    if (peer && liveGroup.players.length == 0) {
      peer?.destroy();
      makePeerWithUuid();
    }
  }, [liveGroup]);

  return <>{children}</>;
};

export default PeerProvider;
