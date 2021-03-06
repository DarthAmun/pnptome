import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  InputGroup,
  Input,
  Checkbox,
  SelectPicker,
  Panel,
  TagGroup,
  Tag,
  PanelGroup,
  IconButton,
  Button,
  Modal,
} from "rsuite";
import styled from "styled-components";
import { System, SystemEntity } from "../../../../database/SystemReducer";
import { findIcon, IconSet } from "../../../../services/IconService";
import DetailConfigEditor from "./DetailConfigEditor";
import SearchConfigEditor from "./SearchConfigEditor";
import TileConfigEditor from "./TileConfigEditor";

interface $SystemEntityProps {
  entity: System;
  systemEntity: SystemEntity;
  entities: { label: string; value: string }[];
  changeEntity: (entity: SystemEntity) => void;
  deleteSystemEntity: (entity: SystemEntity) => void;
}

const SystemEntityEditor = ({
  entity,
  systemEntity,
  entities,
  changeEntity,
  deleteSystemEntity,
}: $SystemEntityProps) => {
  const [tags, setTags] = useState<string[] | undefined>(undefined);
  const [typing, setTyping] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [showDeleteSystemEntityDialog, changeDeleteSystemEntityDialog] =
    useState<boolean>(false);

  const [icons, setIcons] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    if (
      tags &&
      JSON.stringify(systemEntity.attributes) !== JSON.stringify(tags)
    )
      changeEntity({ ...systemEntity, attributes: tags });
  }, [tags]);

  useEffect(() => {
    let newIcons: {
      label: string;
      value: string;
    }[] = [];
    IconSet.forEach((iconSet, key) => {
      newIcons.push({
        label: key,
        value: key,
      });
    });
    setIcons(newIcons);
  }, []);

  const removeAttr = (tag: string) => {
    const nextTags = systemEntity.attributes.filter((item) => item !== tag);
    setTags(nextTags);
  };
  const addNewTag = () => {
    const nextTags = inputValue
      ? [...systemEntity.attributes, inputValue]
      : tags;
    setTags(nextTags);
    setTyping(false);
    setInputValue("");
  };
  const startAddNewTag = () => {
    setTyping(true);
  };
  const renderAttrInput = () => {
    if (typing) {
      return (
        <Input
          className="tag-input"
          size="xs"
          style={{ width: 100 }}
          value={inputValue}
          onChange={(val: any) => setInputValue(val)}
          onBlur={addNewTag}
          onPressEnter={addNewTag}
        />
      );
    }
    return (
      <IconButton
        className="tag-add-btn"
        onClick={startAddNewTag}
        icon={<FaPlus />}
        appearance="ghost"
        size="xs"
      />
    );
  };

  return (
    <>
      <Modal
        open={showDeleteSystemEntityDialog}
        onClose={() => changeDeleteSystemEntityDialog(false)}
      >
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete '{systemEntity?.entityName}'?
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => deleteSystemEntity(systemEntity)}
            appearance="primary"
          >
            Yes, delete!
          </Button>
          <Button
            onClick={() => changeDeleteSystemEntityDialog(false)}
            appearance="subtle"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Entity>
        <InputGroup>
          <InputGroup.Addon>Entity Name</InputGroup.Addon>
          <Input
            value={systemEntity.entityName}
            onChange={(val: any) =>
              changeEntity({ ...systemEntity, entityName: val })
            }
          />
        </InputGroup>
        <Checkbox
          defaultChecked
          checked={systemEntity.isMainEntity}
          onChange={(val: any, checked: boolean) =>
            changeEntity({ ...systemEntity, isMainEntity: checked })
          }
        >
          {" "}
          is a main entity?
        </Checkbox>
        <SelectPicker
          value={systemEntity.icon}
          data={icons}
          onChange={(val: any) => changeEntity({ ...systemEntity, icon: val })}
          renderMenuItem={(label, item) => {
            return (
              <div>
                {findIcon(item.value + "")} {label}
              </div>
            );
          }}
          renderValue={(value) => {
            return (
              <div>
                {findIcon(value.toString())} {value}
              </div>
            );
          }}
        />
        <StyledPanelGroup accordion bordered>
          <Panel header={`${systemEntity.entityName} attributes`}>
            <StyledTagGroup>
              {systemEntity &&
                systemEntity.attributes?.map((attr, index) => (
                  <Tag key={index} closable onClose={() => removeAttr(attr)}>
                    {attr}
                  </Tag>
                ))}
              {renderAttrInput()}
            </StyledTagGroup>
          </Panel>
          <Panel header={`${systemEntity.entityName} search config`}>
            <SearchConfigEditor
              systemEntity={systemEntity}
              entities={entities}
              changeEntity={changeEntity}
            />
          </Panel>
          <Panel header={`${systemEntity.entityName} tile config`}>
            <TileConfigEditor
              systemEntity={systemEntity}
              entities={entities}
              icons={icons}
              changeEntity={changeEntity}
            />
          </Panel>
          <Panel header={`${systemEntity.entityName} detail config`}>
            <DetailConfigEditor
              entity={entity}
              systemEntity={systemEntity}
              entities={entities}
              icons={icons}
              changeEntity={changeEntity}
            />
          </Panel>
        </StyledPanelGroup>
        <Button onClick={() => changeDeleteSystemEntityDialog(true)} size="lg">
          <FaTrash />
        </Button>
      </Entity>
    </>
  );
};

export default SystemEntityEditor;

const Entity = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 5px;
  flex-wrap: nowrap;
  flex-direction: column;

  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
  padding: 10px;
`;

const Attr = styled.div`
  display: flex;
  gap: 5px;
`;

const StyledPanelGroup = styled(PanelGroup)`
  width: 100%;
`;

const StyledTagGroup = styled(TagGroup)`
  .rs-btn {
    margin-left: 10px;
  }
`;
