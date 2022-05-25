import IEntity from "../../../../data/IEntity";
import styled from "styled-components";
import { findIcon } from "../../../../services/IconService";
import ConfigPart from "../../../../data/ConfigPart";
import StringSubDetailField from "./subDetailFields/StringSubDetailField";
import TextSubDetailField from "./subDetailFields/TextSubDetailField";
import NumberSubDetailField from "./subDetailFields/NumberSubDetailField";
import { Button } from "rsuite";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import BooleanSubDetailField from "./subDetailFields/BooleanSubDetailField";
import NumberArraySubDetailField from "./subDetailFields/NumberArraySubDetailField";

interface $EditableSubEntitiesDetailFieldProps {
  entity: IEntity;
  isNew: boolean;
  field: any;
  keyName: string;
  config: ConfigPart;
  icon: string;
  onEdit: (value: any) => void;
  changeEntity: (entity: IEntity) => void;
}

const EditableSubEntitiesDetailField = ({
  entity,
  isNew,
  field,
  keyName,
  config,
  icon,
  onEdit,
  changeEntity,
}: $EditableSubEntitiesDetailFieldProps) => {
  const changeSubEntity = (newPart: any, partIndex: number) => {
    console.log(newPart);
    const newTraits: any = entity[keyName as keyof typeof entity];
    newTraits[partIndex] = newPart;
    changeEntity({ ...entity, [keyName]: newTraits });
  };
  const onSubEdit = (value: any, partIndex: number) => {
    const newTraits: any = entity[keyName as keyof typeof entity];
    newTraits[partIndex] = value;
    onEdit({ ...entity, [keyName]: newTraits });
  };

  const deleteSubEntity = (partIndex: number) => {
    const newTraits: any = entity[keyName as keyof typeof entity];
    delete newTraits[partIndex];
    onEdit({ ...entity, [keyName]: newTraits });
  };

  const createSubEntity = () => {
    let newObjString: string = "{";
    Object.getOwnPropertyNames(config.config).forEach((attr: string) => {
      const fieldEntry = Object(config.config)[attr];
      switch (true) {
        case fieldEntry.type === "number":
          newObjString += `"${attr}": 0,`;
          break;
        case fieldEntry.type === "boolean":
          newObjString += `"${attr}": false,`;
          break;
        case fieldEntry.type === "string":
        case fieldEntry.type === "text":
          newObjString += `"${attr}": "",`;
          break;
        default:
          newObjString += `"${attr}": "",`;
          break;
      }
    });
    newObjString = newObjString.slice(0, -1) + "}";
    const newObj = JSON.parse(newObjString);
    const newTraits: any = entity[keyName as keyof typeof entity];
    newTraits.push(newObj);
    onEdit({ ...entity, [keyName]: newTraits });
  };

  return (
    <SubProps>
      {field.map((part: any, partindex: number) => {
        return (
          <Sub key={partindex}>
            {icon && <Flag>{findIcon(icon)}</Flag>}
            <Button
              onClick={() => deleteSubEntity(partindex)}
              style={{ float: "right" }}
            >
              <FaTrash />
            </Button>
            {Object.getOwnPropertyNames(config.config).map(
              (subKeyName: any, i: number) => {
                const index = i + "" + partindex;
                const subfield = part[subKeyName as keyof typeof entity];
                const fieldEntry = Object(config.config)[subKeyName];
                if (field !== undefined) {
                  switch (true) {
                    case fieldEntry.type === "number":
                      return (
                        <NumberSubDetailField
                          index={index}
                          entity={part}
                          isNew={isNew}
                          field={subfield}
                          keyName={subKeyName}
                          icon={fieldEntry.icon || ""}
                          onEdit={(value: any) => onSubEdit(value, partindex)}
                          changeEntity={(part: any) =>
                            changeSubEntity(part, partindex)
                          }
                        />
                      );
                    case fieldEntry.type === "string":
                      return (
                        <StringSubDetailField
                          index={index}
                          entity={part}
                          isNew={isNew}
                          field={subfield}
                          keyName={subKeyName}
                          icon={fieldEntry.icon || ""}
                          onEdit={(value: any) => onSubEdit(value, partindex)}
                          changeEntity={(part: any) =>
                            changeSubEntity(part, partindex)
                          }
                        />
                      );
                    case fieldEntry.type === "text":
                      return (
                        <TextSubDetailField
                          index={index}
                          entity={part}
                          isNew={isNew}
                          field={subfield}
                          keyName={subKeyName}
                          icon={fieldEntry.icon || ""}
                          onEdit={(value: any) => onSubEdit(value, partindex)}
                          changeEntity={(part: any) =>
                            changeSubEntity(part, partindex)
                          }
                        />
                      );
                    case fieldEntry.type === "boolean":
                      return (
                        <BooleanSubDetailField
                          index={index}
                          entity={part}
                          isNew={isNew}
                          field={subfield}
                          keyName={subKeyName}
                          icon={fieldEntry.icon || ""}
                          onEdit={(value: any) => onSubEdit(value, partindex)}
                          changeEntity={(part: any) =>
                            changeSubEntity(part, partindex)
                          }
                        />
                      );
                    case fieldEntry.type === "NumberArray":
                      return (
                        <NumberArraySubDetailField
                          index={index}
                          entity={part}
                          isNew={isNew}
                          field={subfield}
                          keyName={subKeyName}
                          icon={fieldEntry.icon || ""}
                          onEdit={(value: any) => onSubEdit(value, partindex)}
                          changeEntity={(part: any) =>
                            changeSubEntity(part, partindex)
                          }
                        />
                      );
                    case fieldEntry.type === "EditableSubEntities":
                      return (
                        <>
                          <EditableSubEntitiesHeader>
                            {subKeyName}
                          </EditableSubEntitiesHeader>
                          <EditableSubEntitiesDetailField
                            key={index}
                            config={fieldEntry}
                            entity={part}
                            isNew={isNew}
                            field={subfield}
                            keyName={subKeyName}
                            icon={fieldEntry.icon || ""}
                            onEdit={(value: any) => onSubEdit(value, partindex)}
                            changeEntity={(part: any) =>
                              changeSubEntity(part, partindex)
                            }
                          />
                        </>
                      );
                    default:
                      return <></>;
                  }
                }
                return <></>;
              }
            )}
          </Sub>
        );
      })}
      <Button onClick={() => createSubEntity()}>
        <FaPlusCircle />
      </Button>
    </SubProps>
  );
};

export default EditableSubEntitiesDetailField;

const SubProps = styled.div`
  max-width: calc(100% - 15px);
  margin: 2px 5px 2px 0px;
  float: left;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Sub = styled.div`
  flex: 1 1;
  padding: 10px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
  border: 1px solid ${({ theme }) => theme.mainColor};

  & > svg {
    margin-right: 5px;
    width: 15px;
    height: auto;
    border-radius: 150px;
    color: ${({ theme }) => theme.highlight};
  }
`;

const Flag = styled.div`
  float: left;
  padding: 10px;
  margin: 5px;
  width: 40px;
  height: 40px;

  line-height: 20px;
  text-align: center;

  border-radius: 30px;
  border-bottom: solid 1px ${({ theme }) => theme.highlight};
  color: ${({ theme }) => theme.highlight};
  background-color: ${({ theme }) => theme.mainColor};
`;

const EditableSubEntitiesHeader = styled.div`
  float: left;
  min-width: calc(100% - 15px);
  padding: 10px;
  border-radius: 5px;
  color: ${({ theme }) => theme.highlight};
  background-color: ${({ theme }) => theme.secondColor};
  background-color: ${({ theme }) => theme.mainColor};
`;
