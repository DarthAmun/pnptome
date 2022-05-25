import { useState } from "react";
import { FaArrowLeft, FaClone, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Notification, Modal, toaster } from "rsuite";
import styled from "styled-components";
import BreadCrumbIcon from "../../general/BreadCrumbIcon";

import IEntity from "../../../data/IEntity";
import {
  remove,
  updateWithCallback,
  createNewWithId,
} from "../../../services/DatabaseService";
import EntityDetails from "./EntityDetails";
import { useDispatch, useSelector } from "react-redux";
import { selectDBName } from "../../../database/SystemReducer";
import { getEntityDetailConfig } from "../../../services/SystemService";
import { RootState } from "../../../database/Store";
import { MdScreenShare } from "react-icons/md";
import Peer, { DataConnection } from "peerjs";
import { postEvent } from "../../../services/ChatService";
import { Group } from "../../../database/GroupReducer";
import {
  addEvent,
  EventDto,
  EventType,
} from "../../../database/chatLogReducer";

interface $Props {
  entity: IEntity;
  entityName: string;
}

const EntityDetailWrapper = ({ entity, entityName }: $Props) => {
  let history = useNavigate();
  const dispatch = useDispatch();
  const systemDbName = useSelector(selectDBName);
  const liveGroup: Group = useSelector((state: RootState) => state.group);
  const peer: Peer | undefined = useSelector(
    (state: RootState) => state.peerContext.peer
  );
  const conns: DataConnection[] = useSelector(
    (state: RootState) => state.peerContext.connections
  );
  const system = useSelector((state: RootState) => state.system);
  const [entityObj, editEntity] = useState<IEntity>(entity);

  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);
  const tableName = entityName;

  const deleteEntity = () => {
    remove(systemDbName, tableName, entityObj.id);
    history(-1);
    toaster.push(
      <Notification closable header={"Success"} type="success">
        Success: Deleted {entityObj.name}.
      </Notification>,
      { placement: "bottomStart" }
    );
  };

  const updateEntity = (entityObj: IEntity, msg: string) => {
    updateWithCallback(systemDbName, tableName, entityObj, (result) => {
      if (result > 0) {
        toaster.push(
          <Notification closable header={"Success"} type="success">
            Success: {msg}.
          </Notification>,
          { placement: "bottomStart" }
        );
      } else {
        toaster.push(
          <Notification closable header={"Error"} type="error">
            Error: Something went wrong!.
          </Notification>,
          { placement: "bottomStart" }
        );
      }
    });
  };

  const duplicateEntity = (obj: IEntity) => {
    let newObj = { ...obj };
    delete newObj.id;
    createNewWithId(systemDbName, tableName, newObj, (id) => {
      editAndSaveEntity(
        { ...entity, name: entity.name + " [Clone]" },
        "Cloning successful!"
      );
    });
  };

  const editAndSaveEntity = (entity: IEntity, msg: string) => {
    editEntity(entity);
    updateEntity(entity, msg);
  };

  const shareEntity = () => {
    const uuid: string | null = localStorage.getItem("playerID");
    const ruuid: string = uuid !== null ? uuid : "";
    console.log(ruuid, entityObj);
    const newEvent: EventDto = {
      uuid: ruuid,
      payload: {
        entityName: entityName,
        entity: entityObj,
      },
      type: EventType.Entity,
    };
    dispatch(addEvent(newEvent));
    postEvent(newEvent, peer, conns);
  };

  return (
    <>
      <Modal open={showDeleteDialog} onClose={() => setDeleteDialog(false)}>
        <Modal.Header>
          <Modal.Title>Attention</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete '{entity.name}'?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => deleteEntity()} appearance="primary">
            Yes, delete!
          </Button>
          <Button onClick={() => setDeleteDialog(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <TopBar>
        <BreadCrumbIcon />
        <ButtonGroup>
          <Button onClick={() => history(-1)} size="lg">
            <FaArrowLeft />
          </Button>
          <Button onClick={() => duplicateEntity(entityObj)} size="lg">
            <FaClone />
          </Button>
          <Button onClick={() => setDeleteDialog(true)} size="lg">
            <FaTrash />
          </Button>
        </ButtonGroup>
        {liveGroup && liveGroup.id !== -1 && (
          <Button onClick={() => shareEntity()} size="lg">
            <MdScreenShare />
          </Button>
        )}
      </TopBar>
      <EntityDetails
        configs={Object.getOwnPropertyNames(
          getEntityDetailConfig(system, entityName)
        )}
        entity={entityObj}
        entityName={entityName}
        isNew={false}
        onEdit={(value: any) => editAndSaveEntity(value, "Saved!")}
      />
    </>
  );
};

export default EntityDetailWrapper;

export const TopBar = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  flex: 1 1;
  width: 100%;
  max-width: calc(100% - 20px);
  height: 55px;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  gap: 5px;

  @media (max-width: 576px) {
    max-width: calc(100% - 20px);
  }
`;
