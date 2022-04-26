import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Input,
  InputGroup,
  Loader,
  Modal,
  Panel,
  PanelGroup,
  SelectPicker,
  TagPicker,
} from "rsuite";
import styled from "styled-components";
import ConfigPart from "../../../data/ConfigPart";
import { selectDBName, System } from "../../../database/SystemReducer";
import {
  deleteSystem,
  reciveSystem,
  updateSystem,
} from "../../../services/DatabaseService";
import { IconSet } from "../../../services/IconService";
import { generateSystem } from "../../../services/SystemService";

interface $EntityProps {
  match: any;
}

const SystemDetails = ({ match }: $EntityProps) => {
  let history = useHistory();
  const [entity, setEntity] = useState<System>();
  const [loading, setLoading] = useState<boolean>(true);
  const [showOverwirteDialog, setOverwirteDialog] = useState<boolean>(false);
  const [showDeleteDialog, setDeleteDialog] = useState<boolean>(false);

  const [icons, setIcons] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [entities, setEntites] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    let newIcons: {
      label: string;
      value: string;
    }[] = [];
    let newEntites: {
      label: string;
      value: string;
    }[] = [];
    entity?.entities.forEach((val) => {
      newIcons.push({
        label: val.entityName,
        value: val.entityName,
      });
    });
    setIcons(newIcons);
    setEntites(newEntites);
  }, []);

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
      localStorage.setItem('system', JSON.stringify(entity));
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

  const SearchConfigTypes = [
    {
      label: "SearchableString",
      value: "SearchableString",
    },
    {
      label: "CreatableSetString",
      value: "CreatableSetString",
    },
    {
      label: "CompletableString",
      value: "CompletableString",
    },
    {
      label: "FoundString",
      value: "FoundString",
    },
    {
      label: "CreatableSetString",
      value: "CreatableSetString",
    },
    {
      label: "CreatableSetNumber",
      value: "CreatableSetNumber",
    },
    {
      label: "SearchableText",
      value: "SearchableText",
    },
    {
      label: "SetEntities",
      value: "SetEntities",
    },
    {
      label: "SetEntity",
      value: "SetEntity",
    },
    {
      label: "SwitchBoolean",
      value: "SwitchBoolean",
    },
  ];
  const searchOptions = (val: ConfigPart) => {
    switch (true) {
      case val.type === "FoundString":
        return (
          <>
            <SelectPicker
              data={entities}
              value={val.found?.field}
              onChange={(val: any) => changeEntity(val)}
              placeholder={"Detail Representation"}
            />
          </>
        );
      case val.type === "SetEntity":
        return (
          <>
            <SelectPicker
              data={entities}
              value={val.linkToAttribute}
              onChange={(val: any) => changeEntity(val)}
              placeholder={"Detail Representation"}
            />
          </>
        );
    }
  };

  const TileConfigTypes = [
    {
      label: "ColoredFlag",
      value: "ColoredFlag",
    },
    {
      label: "FoundFlag",
      value: "FoundFlag",
    },
    {
      label: "BooleanFlag",
      value: "BooleanFlag",
    },
    {
      label: "RoundNumberFlag",
      value: "RoundNumberFlag",
    },
    {
      label: "ImageName",
      value: "ImageName",
    },
    {
      label: "SmallProp",
      value: "SmallProp",
    },
    {
      label: "SmallSetProp",
      value: "SmallSetProp",
    },
    {
      label: "WideProp",
      value: "WideProp",
    },
    {
      label: "WideSetProp",
      value: "WideSetProp",
    },
    {
      label: "SetEntity",
      value: "SetEntity",
    },
  ];

  const DetailConfigTypes = [
    {
      label: "CreatableSetString",
      value: "CreatableSetString",
    },
    {
      label: "CreatableSetNumber",
      value: "CreatableSetNumber",
    },
    {
      label: "FoundFlag",
      value: "FoundFlag",
    },
    {
      label: "SwitchBoolean",
      value: "SwitchBoolean",
    },
    {
      label: "ImageName",
      value: "ImageName",
    },
    {
      label: "CompletableString",
      value: "CompletableString",
    },
    {
      label: "CreatableSetString",
      value: "CreatableSetString",
    },
    {
      label: "SearchableString",
      value: "SearchableString",
    },
    {
      label: "SearchableText",
      value: "SearchableText",
    },
    {
      label: "SetEntities",
      value: "SetEntities",
    },
    {
      label: "SetEntity",
      value: "SetEntity",
    },
    {
      label: "ViewEntity",
      value: "ViewEntity",
    },
  ];

  const changeEntity = (val: any[]) => {};

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
          {/* <PanelGroup
            accordion
            defaultActiveKey={0}
            bordered
            style={{ width: "100%" }}
          >
            {entity.entities.map((systemEntity, index) => {
              return (
                <Panel
                  key={index}
                  eventKey={index}
                  id={`panel${index}`}
                  header={systemEntity.entityName}
                  defaultExpanded={index === 0}
                >
                  <Entity>
                    <InputGroup>
                      <InputGroup.Addon>Name</InputGroup.Addon>
                      <Input
                        value={systemEntity.entityName}
                        onChange={(val: any) => changeEntity(val)}
                      />
                    </InputGroup>
                    <SelectPicker
                      data={icons}
                      value={systemEntity.icon}
                      onChange={(val: any) => changeEntity(val)}
                    />
                    <PanelGroup accordion defaultActiveKey={0} bordered>
                      {systemEntity.attributes.map((attr, attrIndex) => {
                        return (
                          <Panel
                            key={index + "" + attrIndex}
                            eventKey={attrIndex}
                            id={`panel${index + "" + attrIndex}`}
                            header={attr}
                            defaultExpanded={attrIndex === 0}
                          >
                            <PanelGroup accordion defaultActiveKey={0} bordered>
                              <Panel
                                eventKey={0}
                                id={`searchpanel${index + "" + attrIndex}`}
                                header={"Searcbar Representation"}
                                defaultExpanded
                              >
                                <SelectPicker
                                  data={SearchConfigTypes}
                                  value={
                                    systemEntity.searchConfig[attr]?.type ||
                                    undefined
                                  }
                                  onChange={(val: any) => changeEntity(val)}
                                  placeholder={"Search Representation"}
                                />
                                {systemEntity.searchConfig[attr]?.type && (
                                  <>
                                    {searchOptions(
                                      systemEntity.searchConfig[attr]
                                    )}
                                  </>
                                )}
                              </Panel>
                              <Panel
                                eventKey={1}
                                id={`searchpanel${index + "" + attrIndex}`}
                                header={"Overview Tile Representation"}
                              >
                                <SelectPicker
                                  data={TileConfigTypes}
                                  value={
                                    systemEntity.tileConfig[attr]?.type ||
                                    undefined
                                  }
                                  onChange={(val: any) => changeEntity(val)}
                                  placeholder={"Overview Representation"}
                                />
                              </Panel>
                              <Panel
                                eventKey={2}
                                id={`searchpanel${index + "" + attrIndex}`}
                                header={"Detailsview Representation"}
                              >
                                <SelectPicker
                                  data={DetailConfigTypes}
                                  value={
                                    systemEntity.detailConfig[attr]?.type ||
                                    undefined
                                  }
                                  onChange={(val: any) => changeEntity(val)}
                                  placeholder={"Detail Representation"}
                                />
                              </Panel>
                            </PanelGroup>
                          </Panel>
                        );
                      })}
                    </PanelGroup>
                  </Entity>
                </Panel>
              );
            })}
          </PanelGroup> */}
          <Input
            as="textarea"
            rows={30}
            placeholder="Textarea"
            value={JSON.stringify(entity.entities, null, 2)}
            onChange={(val: any) =>
              setEntity({ ...entity, entities: JSON.parse(val) })
            }
          />
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

const Entity = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: nowrap;
  flex-direction: column;
`;

const Attr = styled.div`
  display: flex;
  gap: 5px;
`;
