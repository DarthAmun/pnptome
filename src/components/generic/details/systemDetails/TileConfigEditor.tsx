import _ from "lodash";
import { useEffect, useState } from "react";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
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
import { findIcon } from "../../../../services/IconService";

interface $TileConfigEditorProps {
  systemEntity: SystemEntity;
  entities: { label: string; value: string }[];
  icons: { label: string; value: string }[];
  changeEntity: (entity: SystemEntity) => void;
}

const TileConfigEditor = ({
  systemEntity,
  entities,
  icons,
  changeEntity,
}: $TileConfigEditorProps) => {
  const [selectedPart, changeSelectedPart] = useState<string>(
    Object.keys(systemEntity.tileConfig)[0]
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

  const addNewPart = () => {
    let newTileConfig: any = { ...systemEntity.tileConfig };
    newTileConfig["new"] = { type: TileConfigTypes[0].value };
    changeEntity({
      ...systemEntity,
      tileConfig: newTileConfig,
    });
    changeSelectedPart("new");
  };

  const deleteConfig = () => {
    let newTileConfig: any = { ...systemEntity.tileConfig };
    delete newTileConfig[selectedPart];
    changeEntity({
      ...systemEntity,
      tileConfig: newTileConfig,
    });
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

  const tileOptions = (val: ConfigPart) => {
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
                  let newTileConfig: any = { ...systemEntity.tileConfig };
                  if (newTileConfig[selectedPart].found)
                    newTileConfig[selectedPart].found.field = val;
                  else
                    newTileConfig[selectedPart].found = {
                      field: val,
                      searchTerm: "",
                    };
                  changeEntity({
                    ...systemEntity,
                    tileConfig: newTileConfig,
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
                  let newTileConfig: any = { ...systemEntity.tileConfig };
                  if (newTileConfig[selectedPart].found)
                    newTileConfig[selectedPart].found.searchTerm = val;
                  else
                    newTileConfig[selectedPart].found = {
                      field: "",
                      searchTerm: val,
                    };
                  changeEntity({
                    ...systemEntity,
                    tileConfig: newTileConfig,
                  });
                }}
                placeholder={"Key"}
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
          {Object.getOwnPropertyNames(systemEntity.tileConfig).map(
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
        {selectedPart && systemEntity.tileConfig[selectedPart] && (
          <>
            <Input
              style={{ width: 200 }}
              value={selectedPart}
              onChange={(val: any) => {
                const tileConfig: any = { ...systemEntity.tileConfig };
                const renamed = _.mapKeys(tileConfig, function (value, key) {
                  if (key === selectedPart) {
                    return val;
                  }
                  return key;
                });
                changeSelectedPart(val);
                changeEntity({
                  ...systemEntity,
                  tileConfig: renamed,
                });
              }}
            />
            <SelectPicker
              data={TileConfigTypes}
              value={systemEntity.tileConfig[selectedPart]?.type}
              onChange={(val: any) => {
                let newTileConfig: any = { ...systemEntity.tileConfig };
                newTileConfig[selectedPart].type = val;
                changeEntity({
                  ...systemEntity,
                  tileConfig: newTileConfig,
                });
              }}
              placeholder={"Detail Representation"}
              cleanable={false}
            />
          </>
        )}
        {selectedPart && systemEntity.tileConfig[selectedPart] && (
          <SelectPicker
            value={systemEntity.tileConfig[selectedPart]?.icon}
            data={icons}
            onChange={(val: any) => {
              let newTileConfig: any = { ...systemEntity.tileConfig };
              newTileConfig[selectedPart].icon = val;
              changeEntity({
                ...systemEntity,
                tileConfig: newTileConfig,
              });
            }}
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
        )}

        {selectedPart &&
          systemEntity.tileConfig[selectedPart] &&
          tileOptions(systemEntity.tileConfig[selectedPart])}

        {selectedPart && systemEntity.tileConfig[selectedPart] && (
          <Button onClick={() => deleteConfig()}>
            <FaTrash />
          </Button>
        )}
      </ConfigOptions>
    </>
  );
};

export default TileConfigEditor;

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
