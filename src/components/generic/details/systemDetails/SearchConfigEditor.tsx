import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  IconButton,
  SelectPicker,
  Input,
} from "rsuite";
import styled from "styled-components";
import ConfigPart from "../../../../data/ConfigPart";
import { SystemEntity } from "../../../../database/SystemReducer";

interface $SearchConfigEditorProps {
  systemEntity: SystemEntity;
  entities: { label: string; value: string }[];
  changeEntity: (entity: SystemEntity) => void;
}

const SearchConfigEditor = ({
  systemEntity,
  entities,
  changeEntity,
}: $SearchConfigEditorProps) => {
  const [selectedPart, changeSelectedPart] = useState<string>(
    Object.keys(systemEntity.searchConfig)[0]
  );
  const [attrs, changeAttrs] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  useEffect(() => {
    const newAttributes: {
      label: string;
      value: string;
    }[] = [];
    systemEntity.attributes.forEach((attr) => {
      newAttributes.push({
        label: attr,
        value: attr,
      });
    });
    changeAttrs(newAttributes);
  }, [systemEntity]);

  const addNewPart = () => {};

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
          <SpecialConfigs>
            <SpecialConfig>
              <label>Searched Attribute: </label>
              <SelectPicker
                data={attrs}
                value={val.found?.field}
                onChange={(val: any) => {
                  let newSearchConfig: any = { ...systemEntity.searchConfig };
                  if (newSearchConfig[selectedPart].found)
                    newSearchConfig[selectedPart].found.field = val;
                  else
                    newSearchConfig[selectedPart].found = {
                      field: val,
                      searchTerm: "",
                    };
                  changeEntity({
                    ...systemEntity,
                    searchConfig: newSearchConfig,
                  });
                }}
                cleanable={false}
                placeholder={"Attribute"}
              />
            </SpecialConfig>
            <SpecialConfig>
              <label>Keyword: </label>
              <Input
                value={val.found?.searchTerm}
                onChange={(val: any) => {
                  let newSearchConfig: any = { ...systemEntity.searchConfig };
                  if (newSearchConfig[selectedPart].found)
                    newSearchConfig[selectedPart].found.searchTerm = val;
                  else
                    newSearchConfig[selectedPart].found = {
                      field: "",
                      searchTerm: val,
                    };
                  changeEntity({
                    ...systemEntity,
                    searchConfig: newSearchConfig,
                  });
                }}
                placeholder={"Key"}
              />
            </SpecialConfig>
          </SpecialConfigs>
        );
      case val.type === "SetEntity":
        return (
          <SpecialConfigs>
            <SpecialConfig>
              <SelectPicker
                data={entities}
                value={val.linkToAttribute}
                onChange={(val: any) => {
                  let newSearchConfig: any = { ...systemEntity.searchConfig };
                  newSearchConfig[selectedPart].linkToAttribute = val;
                  changeEntity({
                    ...systemEntity,
                    searchConfig: newSearchConfig,
                  });
                }}
                placeholder={"Detail Representation"}
              />
            </SpecialConfig>
          </SpecialConfigs>
        );
    }
  };

  return (
    <>
      <ButtonToolbar>
        <ButtonGroup>
          {Object.getOwnPropertyNames(systemEntity.searchConfig).map(
            (keyName: any, index: number) => {
              return (
                <Button
                  onClick={() => changeSelectedPart(keyName)}
                  appearance={keyName === selectedPart ? "primary" : "default"}
                >
                  {keyName}
                </Button>
              );
            }
          )}
        </ButtonGroup>
        <IconButton icon={<FaPlusCircle />} onClick={() => addNewPart()} />
      </ButtonToolbar>
      <ConfigOptions>
        {selectedPart && systemEntity.searchConfig[selectedPart] && (
          <SelectPicker
            data={SearchConfigTypes}
            value={systemEntity.searchConfig[selectedPart]?.type}
            onChange={(val: any) => {
              let newSearchConfig: any = { ...systemEntity.searchConfig };
              newSearchConfig[selectedPart].type = val;
              changeEntity({
                ...systemEntity,
                searchConfig: newSearchConfig,
              });
            }}
            placeholder={"Detail Representation"}
            cleanable={false}
          />
        )}
        {selectedPart &&
          systemEntity.searchConfig[selectedPart] &&
          searchOptions(systemEntity.searchConfig[selectedPart])}
      </ConfigOptions>
    </>
  );
};

export default SearchConfigEditor;

const ConfigOptions = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SpecialConfigs = styled(ConfigOptions)`
  margin-top: 0px;
`;
const SpecialConfig = styled(ConfigOptions)`
  margin-top: 0px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  align-items: center;
`;
