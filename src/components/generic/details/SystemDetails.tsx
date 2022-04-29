import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  IconButton,
  Input,
  InputGroup,
  Loader,
  Modal,
  Panel,
  PanelGroup,
} from "rsuite";
import styled from "styled-components";
import { System, SystemEntity } from "../../../database/SystemReducer";
import {
  deleteSystem,
  reciveSystem,
  updateSystem,
} from "../../../services/DatabaseService";
import { generateSystem } from "../../../services/SystemService";
import SystemEntityEditor from "./systemDetails/SystemEntityEditor";

interface $EntityProps {
  match: any;
}

const SystemDetails = ({ match }: $EntityProps) => {
  let history = useHistory();
  const [entity, setEntity] = useState<System>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showOverwirteDialog, setOverwirteDialog] = useState<boolean>(false);
  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);

  const [selectedEntity, changeSelectedEntity] = useState<number>(0);

  useEffect(() => {
    if (match !== undefined && entity === undefined) {
      const id: string | undefined = match.params.id;
      if (id)
        reciveSystem("PnPTomeDB", +id, (entity: System) => {
          setEntity(entity as System);
          setLoading(false);
        });
    }
  }, [match, entity]);

  const updateTrigger = () => {
    if (entity) {
      updateSystem(entity);
      generateSystem(entity);
      localStorage.setItem("system", JSON.stringify(entity));
      setOverwirteDialog(false);
    }
  };

  const deleteTrigger = () => {
    if (entity) {
      deleteSystem(entity);
      setDeleteDialog(false);
      history.goBack();
    }
  };

  // const changeEntity = (val: any[]) => {};
  const addNewEntity = () => {};
  const changeEntity = (newEntity: System) => {
    console.log(newEntity);
    setEntity(newEntity);
  };

  return (
    <>
      <Modal
        open={showOverwirteDialog}
        onClose={() => setOverwirteDialog(false)}
      >
        <Modal.Header>
          <Modal.Title>Overwrite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          All the data saved for this system will be lost.
          <br />
          Are you sure you want to overwrite '{entity?.name} - v
          {entity?.version}'?
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => updateTrigger()} appearance="primary">
            Yes, overwirte!
          </Button>
          <Button onClick={() => setOverwirteDialog(false)} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal open={showDeleteDialog} onClose={() => setDeleteDialog(false)}>
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          All the data saved for this system will be lost.
          <br />
          Are you sure you want to delete '{entity?.name} - v{entity?.version}'?
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
              onChange={(val: any) => setEntity({ ...entity, name: val })}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Addon>Version</InputGroup.Addon>
            <Input
              value={entity.version}
              onChange={(val: any) => setEntity({ ...entity, version: val })}
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Addon>Pic</InputGroup.Addon>
            <Input
              value={entity.pic}
              onChange={(val: any) => setEntity({ ...entity, pic: val })}
            />
          </InputGroup>
          <StyledPanelGroup accordion bordered>
            <Panel header="Assisted">
              <ButtonToolbar>
                <ButtonGroup>
                  {entity.entities.map(
                    (systemEntity: SystemEntity, index: number) => {
                      return (
                        <Button
                          onClick={() => changeSelectedEntity(index)}
                          appearance={
                            index === selectedEntity ? "primary" : "default"
                          }
                        >
                          {systemEntity.entityName}
                        </Button>
                      );
                    }
                  )}
                </ButtonGroup>
                <IconButton
                  icon={<FaPlusCircle />}
                  onClick={() => addNewEntity()}
                />
              </ButtonToolbar>
              {entity.entities
                .filter(
                  (enti) => entity.entities.indexOf(enti) === selectedEntity
                )
                .map((systemEntity: SystemEntity, index: number) => {
                  return (
                    <SystemEntityEditor
                      entity={entity}
                      systemEntity={systemEntity}
                      entities={entity.entities.map((enti) => {
                        return {
                          label: enti.entityName,
                          value: enti.entityName,
                        };
                      })}
                      changeEntity={(sysEnti: SystemEntity) => {
                        let entis: SystemEntity[] = entity.entities.map(
                          (ent) => {
                            if (ent.entityName === systemEntity.entityName)
                              return sysEnti;
                            return ent;
                          }
                        );
                        changeEntity({ ...entity, entities: entis });
                      }}
                    />
                  );
                })}
            </Panel>
            <Panel header="Editor">
              <Input
                as="textarea"
                rows={30}
                placeholder="Textarea"
                value={JSON.stringify(entity.entities, null, 2)}
                onChange={(val: any) =>
                  setEntity({ ...entity, entities: JSON.parse(val) })
                }
              />
            </Panel>
          </StyledPanelGroup>

          <Button onClick={(e) => setOverwirteDialog(true)}>Overwirte</Button>
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

export default SystemDetails;

const SystenWrapper = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const StyledPanelGroup = styled(PanelGroup)`
  width: 100%;
`;
