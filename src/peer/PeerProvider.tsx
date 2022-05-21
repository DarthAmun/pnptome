import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Peer, { DataConnection } from "peerjs";
import { RootState } from "../database/Store";
import { Player } from "../database/GroupReducer";
import { Button } from "rsuite";

interface $PeerProvider {
  children?: React.ReactNode;
}

const PeerProvider = ({ children }: $PeerProvider) => {
  const liveGroup = useSelector((state: RootState) => state.group);
  const [peer, changePeer] = useState<Peer>();
  let uuid = localStorage.getItem("playerID");

  useEffect(() => {
    if (uuid !== null) {
      console.log("Make peer with ", uuid);
      let newPeer = new Peer(uuid, {
        host: "peerjs.thorbenkuck.de",
        secure: true,
      });
      newPeer.on("connection", function (conn) {
        conn.on("data", function (data) {
          // Will print 'hi!'
          console.log(data);
        });
        conn.on("error", function (errorData) {
          console.log(errorData);
        });
      });
      changePeer(newPeer);
    } else {
      uuid = uuidv4();
      localStorage.setItem("playerID", uuid);
    }
  }, [uuid]);

  useEffect(() => {
    if (peer && liveGroup) {
      if (!liveGroup.me.isGM) {
        liveGroup.players
          .filter((player) => player.isGM)
          .forEach((player) => {
            const conn = peer.connect(player.peerAddress);
            if (conn)
              conn.on("open", function () {
                // here you have conn.id
                conn.send(liveGroup.me.name + " connected!");
              });
          });
      }
    }
  }, [liveGroup]);

  const triggerGm = () => {
    if (peer) {
      if (peer.disconnected && !peer.destroyed) {
        peer.reconnect();
      }
      if (liveGroup.me.isGM) {
        liveGroup.players.forEach((player) => {
          const conn = peer.connect(player.peerAddress);
          if (conn)
            conn.on("open", function () {
              // here you have conn.id
              conn.send("hi Players!");
            });
        });
      } else {
        liveGroup.players
          .filter((player) => player.isGM)
          .forEach((player) => {
            const conn = peer.connect(player.peerAddress);
            if (conn)
              conn.on("open", function () {
                // here you have conn.id
                conn.send("hi GM!");
              });
          });
      }
    }
  };
  const output = () => {
    console.log(peer);
  };

  return (
    <>
      {children} <Button onClick={triggerGm}>Trigger Msg</Button>
      <Button onClick={output}>Log</Button>
    </>
  );
};

export default PeerProvider;
