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
  TagPicker,
} from "rsuite";
import styled from "styled-components";
import ConfigPart from "../../../../data/ConfigPart";
import { System, SystemEntity } from "../../../../database/SystemReducer";
import { findIcon } from "../../../../services/IconService";

interface $DetailConfigEditorProps {
  entity: System;
  systemEntity: SystemEntity;
  entities: { label: string; value: string }[];
  icons: { label: string; value: string }[];
  changeEntity: (entity: SystemEntity) => void;
}

const DetailConfigEditor = ({
  entity,
  systemEntity,
  entities,
  icons,
  changeEntity,
}: $DetailConfigEditorProps) => {
  const [selectedPart, changeSelectedPart] = useState<string>(
    Object.keys(systemEntity.detailConfig)[0]
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

  const [baseAttrs, changeBaseAttrs] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  useEffect(() => {
    if (
      selectedPart &&
      systemEntity.detailConfig[selectedPart] &&
      systemEntity.detailConfig[selectedPart].viewEntity
    ) {
      const { linkedBy, fieldsDisplayed } =
        systemEntity.detailConfig[selectedPart].viewEntity;
      const name = systemEntity.detailConfig[linkedBy].linkToAttribute;
      entity.entities
        .filter((ent) => ent.entityName === name)
        .map((ent) => {
          const newAttributes: {
            label: string;
            value: string;
          }[] = [];
          ent.attributes.forEach((attr) => {
            newAttributes.push({
              label: attr,
              value: attr,
            });
          });
          changeBaseAttrs(newAttributes);
        });
    }
  }, [selectedPart, systemEntity, entity]);

  const addNewPart = () => {
    let newDetailConfig: any = { ...systemEntity.detailConfig };
    newDetailConfig["new"] = { type: DetailConfigTypes[0].value };
    changeEntity({
      ...systemEntity,
      detailConfig: newDetailConfig,
    });
    changeSelectedPart("new");
  };

  const deleteConfig = () => {
    let newDetailConfig: any = { ...systemEntity.detailConfig };
    delete newDetailConfig[selectedPart];
    changeEntity({
      ...systemEntity,
      detailConfig: newDetailConfig,
    });
  };

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
    {
      label: "SubEntityConnector",
      value: "SubEntityConnector",
    },
    {
      label: "EditableSubEntities",
      value: "EditableSubEntities",
    },
  ];

  const tileOptions = (val: ConfigPart) => {
    console.log(val.type);
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
                  let newDetailConfig: any = { ...systemEntity.detailConfig };
                  if (newDetailConfig[selectedPart].found)
                    newDetailConfig[selectedPart].found.field = val;
                  else
                    newDetailConfig[selectedPart].found = {
                      field: val,
                      searchTerm: "",
                    };
                  changeEntity({
                    ...systemEntity,
                    detailConfig: newDetailConfig,
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
                  let newDetailConfig: any = { ...systemEntity.detailConfig };
                  if (newDetailConfig[selectedPart].found)
                    newDetailConfig[selectedPart].found.searchTerm = val;
                  else
                    newDetailConfig[selectedPart].found = {
                      field: "",
                      searchTerm: val,
                    };
                  changeEntity({
                    ...systemEntity,
                    detailConfig: newDetailConfig,
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
                  let newDetailConfig: any = { ...systemEntity.detailConfig };
                  newDetailConfig[selectedPart].linkToAttribute = val;
                  changeEntity({
                    ...systemEntity,
                    detailConfig: newDetailConfig,
                  });
                }}
                placeholder={"Detail Representation"}
              />
            </SpecialConfig>
          </SpecialConfigs>
        );
      case val.type === "ViewEntity":
        return (
          <SpecialConfigs>
            <SpecialConfig>
              <label>Base Attribute: </label>
              <SelectPicker
                data={attrs}
                value={val.viewEntity?.linkedBy}
                onChange={(val: any) => {
                  let newDetailConfig: any = { ...systemEntity.detailConfig };
                  if (newDetailConfig[selectedPart].viewEntity)
                    newDetailConfig[selectedPart].viewEntity.linkedBy = val;
                  else
                    newDetailConfig[selectedPart].viewEntity = {
                      linkedBy: val,
                      fieldsDisplayed: "",
                    };
                  changeEntity({
                    ...systemEntity,
                    detailConfig: newDetailConfig,
                  });
                }}
                cleanable={false}
                placeholder={"Attribute"}
              />
            </SpecialConfig>
            <SpecialConfig>
              <label>Attributes to display: </label>
              <TagPicker
                creatable
                data={baseAttrs}
                value={val.viewEntity?.fieldsDisplayed}
                onCreate={(value, item) => {
                  console.log(value, item);
                }}
                onChange={(val: any) => {
                  console.log(val);
                  let newDetailConfig: any = { ...systemEntity.detailConfig };
                  if (newDetailConfig[selectedPart].viewEntity)
                    newDetailConfig[selectedPart].viewEntity.fieldsDisplayed =
                      val;
                  else
                    newDetailConfig[selectedPart].viewEntity = {
                      linkedBy: "",
                      fieldsDisplayed: val,
                    };
                  changeEntity({
                    ...systemEntity,
                    detailConfig: newDetailConfig,
                  });
                }}
                trigger={"Enter"}
              />
            </SpecialConfig>
          </SpecialConfigs>
        );
      case val.type === "SubEntityConnector":
        return <>SubEntityConnector</>;
      case val.type === "EditableSubEntities":
        return <>SubEntityConnector</>;
    }
  };

  return (
    <>
      <ButtonToolbar>
        <ButtonGroup>
          {Object.getOwnPropertyNames(systemEntity.detailConfig).map(
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
        {selectedPart && systemEntity.detailConfig[selectedPart] && (
          <>
            <Input
              style={{ width: 200 }}
              value={selectedPart}
              onChange={(val: any) => {
                const detailConfig: any = { ...systemEntity.detailConfig };
                const renamed = _.mapKeys(detailConfig, function (value, key) {
                  if (key === selectedPart) {
                    return val;
                  }
                  return key;
                });
                changeSelectedPart(val);
                changeEntity({
                  ...systemEntity,
                  detailConfig: renamed,
                });
              }}
            />
            <SelectPicker
              data={DetailConfigTypes}
              value={systemEntity.detailConfig[selectedPart]?.type}
              onChange={(val: any) => {
                let newDetailConfig: any = { ...systemEntity.detailConfig };
                newDetailConfig[selectedPart].type = val;
                changeEntity({
                  ...systemEntity,
                  detailConfig: newDetailConfig,
                });
              }}
              placeholder={"Detail Representation"}
              cleanable={false}
            />
          </>
        )}
        {selectedPart && systemEntity.detailConfig[selectedPart] && (
          <SelectPicker
            value={systemEntity.detailConfig[selectedPart]?.icon}
            data={icons}
            onChange={(val: any) => {
              let newDetailConfig: any = { ...systemEntity.detailConfig };
              newDetailConfig[selectedPart].icon = val;
              changeEntity({
                ...systemEntity,
                detailConfig: newDetailConfig,
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
          systemEntity.detailConfig[selectedPart] &&
          tileOptions(systemEntity.detailConfig[selectedPart])}

        {selectedPart && systemEntity.detailConfig[selectedPart] && (
          <Button onClick={() => deleteConfig()}>
            <FaTrash />
          </Button>
        )}
      </ConfigOptions>
    </>
  );
};

export default DetailConfigEditor;

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
