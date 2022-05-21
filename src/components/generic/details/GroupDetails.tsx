import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Input,
  InputGroup,
  Loader,
  Modal,
  PanelGroup,
} from "rsuite";
import styled from "styled-components";
import {
  Group,
  MePlayer,
  Player,
  setGroup,
} from "../../../database/GroupReducer";
import {
  deleteGroup,
  reciveGroup,
  updateGroup,
} from "../../../services/DatabaseService";

const GroupDetails = () => {
  const params = useParams();
  let history = useNavigate();
  const dispatch = useDispatch();
  const [entity, changeEntity] = useState<Group>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);

  useEffect(() => {
    if (params !== undefined && entity === undefined) {
      const id: string | undefined = params.id;
      if (id)
        reciveGroup("PnPTomeDB", +id, (entity: Group) => {
          changeEntity(entity as Group);
          setLoading(false);
        });
    }
  }, [params, entity]);

  const updateTrigger = () => {
    if (entity) {
      updateGroup(entity);
      dispatch(setGroup(entity));
    }
  };

  const deleteTrigger = () => {
    if (entity) {
      deleteGroup(entity);
      setDeleteDialog(false);
      history(-1);
    }
  };

  const addNewPlayer = () => {
    if (entity) {
      let players: Player[] = [...entity.players];
      players.push({
        name: "new player",
        isGM: false,
        peerAddress: "",
        pic: "",
      });
      changeEntity({ ...entity, players: players });
    }
  };

  return (
    <>
      <Modal open={showDeleteDialog} onClose={() => setDeleteDialog(false)}>
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          All the data saved for this group will be lost.
          <br />
          Are you sure you want to delete '{entity?.name}'?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => deleteTrigger()} appearance="primary">
            Yes, delete!
          </Button>
          <Button onClick={() => setDeleteDialog(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {loading && <Loader center content="Loading..." />}
      {!loading && entity !== undefined && (
        <SystenWrapper>
          <InputGroup>
            <InputGroup.Addon>Name</InputGroup.Addon>
            <Input
              value={entity.name}
              onChange={(val: any) => changeEntity({ ...entity, name: val })}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Addon>Pic</InputGroup.Addon>
            <Input
              value={entity.pic}
              onChange={(val: any) => changeEntity({ ...entity, pic: val })}
            />
          </InputGroup>

          <StyledPanelGroup accordion bordered>
            <Editor>
              <Input
                placeholder="Player Name"
                value={entity.me.name}
                style={{ width: 200 }}
                onChange={(val: any) => {
                  const newMe: MePlayer = { ...entity.me, name: val };
                  changeEntity({ ...entity, me: newMe });
                }}
              />
              <Checkbox
                checked={entity.me.isGM}
                onCheckboxClick={(e) => {
                  e.stopPropagation();
                  const newMe: MePlayer = {
                    ...entity.me,
                    isGM: !entity.me.isGM,
                  };
                  changeEntity({ ...entity, me: newMe });
                }}
              >
                {" "}
                GM?
              </Checkbox>
              <Input
                placeholder="Player Pic"
                value={entity.me.pic}
                style={{ width: 200 }}
                onChange={(val: any) => {
                  const newMe: MePlayer = { ...entity.me, pic: val };
                  changeEntity({ ...entity, me: newMe });
                }}
              />
            </Editor>
            {entity.players?.map((player: Player, index: number) => {
              return (
                <Editor key={index}>
                  <Input
                    placeholder="Player Name"
                    value={player.name}
                    style={{ width: 200 }}
                    onChange={(val: any) => {
                      const newMe: Player = { ...player, name: val };
                      let newPlayers: any = [...entity.players];
                      newPlayers[index] = newMe;
                      changeEntity({
                        ...entity,
                        players: newPlayers,
                      });
                    }}
                  />
                  <Checkbox
                    checked={player.isGM}
                    onCheckboxClick={(e) => {
                      e.stopPropagation();
                      const newMe: Player = {
                        ...player,
                        isGM: !player.isGM,
                      };
                      let newPlayers: any = [...entity.players];
                      newPlayers[index] = newMe;
                      changeEntity({
                        ...entity,
                        players: newPlayers,
                      });
                    }}
                  >
                    {" "}
                    GM?
                  </Checkbox>
                  <Input
                    placeholder="Player Peer"
                    value={player.peerAddress}
                    style={{ width: 200 }}
                    onChange={(val: any) => {
                      const newMe: Player = { ...player, peerAddress: val };
                      let newPlayers: any = [...entity.players];
                      newPlayers[index] = newMe;
                      changeEntity({
                        ...entity,
                        players: newPlayers,
                      });
                    }}
                  />
                  <Input
                    placeholder="Player Pic"
                    value={player.pic}
                    style={{ width: 200 }}
                    onChange={(val: any) => {
                      const newMe: Player = { ...player, pic: val };
                      let newPlayers: any = [...entity.players];
                      newPlayers[index] = newMe;
                      changeEntity({
                        ...entity,
                        players: newPlayers,
                      });
                    }}
                  />
                </Editor>
                // <PlayerEditor
                //   key={index}
                //   player={player}
                //   changePlayer={(pl) => {
                //     let newPlayers: any = { ...entity.players };
                //     newPlayers[index] = pl;
                //     changeEntity({
                //       ...entity,
                //       players: newPlayers,
                //     });
                //   }}
                // />
              );
            })}
            <Button onClick={(e) => addNewPlayer()}>
              <FaPlusCircle />
            </Button>
          </StyledPanelGroup>

          <Button onClick={(e) => updateTrigger()}>Save</Button>
          <Button
            color="red"
            appearance="primary"
            onClick={(e) => setDeleteDialog(true)}
          >
            Delete
          </Button>
        </SystenWrapper>
      )}
    </>
  );
};

export default GroupDetails;

const SystenWrapper = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const StyledPanelGroup = styled(PanelGroup)`
  width: 100%;
  padding: 10px;
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const Editor = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
`;
