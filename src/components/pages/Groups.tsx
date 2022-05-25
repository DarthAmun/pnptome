import { DataConnection } from "peerjs";
import { useState, useEffect } from "react";
import { IoPulse } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Panel,
  Notification,
  toaster,
  InputGroup,
  Badge,
} from "rsuite";
import styled from "styled-components";
import {
  Group,
  initialGroupState,
  setGroup,
} from "../../database/GroupReducer";
import { RootState } from "../../database/Store";
import {
  createNewWithId,
  reciveAllFromTable,
} from "../../services/DatabaseService";

const Groups = () => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const liveGroup = useSelector((state: RootState) => state.group);
  const conns: DataConnection[] = useSelector(
    (state: RootState) => state.peerContext.connections
  );
  const [groups, changeGroups] = useState<Group[]>([]);
  const [newGroupDialog, showNewGroup] = useState<boolean>(false);
  const [newGroup, setNewGroup] = useState<Group>(initialGroupState);

  useEffect(() => {
    reciveAllFromTable("PnPTomeDB", "groups", (entries: any[]) => {
      changeGroups(entries);
    });
  }, [newGroupDialog]);

  const startSession = (group: Group) => {
    dispatch(setGroup(group));
  };
  const stopSession = () => {
    dispatch(setGroup(initialGroupState));
  };
  const editGroup = (group: Group) => {
    history({
      pathname: `/group-detail/${group.id}`,
    });
  };

  const create = () => {
    let newEntity: any = { ...newGroup };
    delete newEntity.id;
    showNewGroup(false);
    createNewWithId("PnPTomeDB", "groups", newEntity, (id: number) => {
      toaster.push(
        <Notification header={"Success"} type="success">
          Success: Created new group named {newEntity.name}.
        </Notification>,
        { placement: "bottomStart" }
      );
    });
  };

  const copy = () => {
    const uuid = localStorage.getItem("playerID");
    if (uuid !== null) navigator.clipboard.writeText(uuid);
  };

  return (
    <>
      <UserInfo>
        <InputGroup>
          <InputGroup.Addon>UserID:</InputGroup.Addon>
          <Input value={localStorage.getItem("playerID") || ""} />
          <InputGroup.Button onClick={copy}>Copy</InputGroup.Button>
        </InputGroup>
      </UserInfo>
      {!newGroupDialog && (
        <GroupsContainer>
          <Panel
            shaded
            bordered
            bodyFill
            style={{ display: "inline-block", width: 240 }}
          >
            <Panel header="Make a new Group">
              <Button onClick={(e) => showNewGroup(true)}>New Group</Button>
            </Panel>
          </Panel>
          {groups.map((group: Group, index: number) => {
            return (
              <Panel
                key={index}
                shaded
                bordered
                bodyFill
                style={{ display: "inline-block", width: 240 }}
              >
                <img src={group.pic} height="160" />
                <StyledPanelBody header={group.name}>
                  {group.id === liveGroup.id ? (
                    <>
                      <Badge content={conns.length}>
                        <IconWrapper title="Currently used">
                          <IoPulse />
                        </IconWrapper>
                      </Badge>
                      <Button
                        onClick={(e) => stopSession()}
                        style={{ marginRight: "10px" }}
                      >
                        Stop
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={(e) => startSession(group)}
                      style={{ marginRight: "10px" }}
                    >
                      Start
                    </Button>
                  )}
                  <Button onClick={(e) => editGroup(group)}>Edit</Button>
                </StyledPanelBody>
              </Panel>
            );
          })}
        </GroupsContainer>
      )}
      {newGroupDialog && (
        <StyledPanel shaded bordered bodyFill>
          <Input
            placeholder="Group Name"
            value={newGroup.name}
            onChange={(val: any) =>
              setNewGroup((g) => {
                return { ...g, name: val };
              })
            }
          />
          <Button onClick={(e) => create()} style={{ marginRight: "10px" }}>
            Save
          </Button>
          <Button onClick={(e) => showNewGroup(false)}>Back</Button>
        </StyledPanel>
      )}
    </>
  );
};

export default Groups;

const GroupsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const StyledPanel = styled(Panel)`
  padding: 10px;
  width: 240px;
  background-color: ${({ theme }) => theme.secondColor};
  & .rs-panel-body {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const StyledPanelBody = styled(Panel)`
  background-color: ${({ theme }) => theme.secondColor};
  color: ${({ theme }) => theme.textColor};
  & .rs-panel-body {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
  }
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.highlight};
  background-color: ${({ theme }) => theme.mainColor};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 30px;
`;

const UserInfo = styled.div`
  margin: 10px;
`;
