import { IndexableType } from "dexie";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { InputGroup, InputPicker } from "rsuite";
import styled from "styled-components";
import IEntity from "../../../../data/IEntity";
import { RootState } from "../../../../database/Store";
import { selectDBName } from "../../../../database/SystemReducer";
import { stringToColour } from "../../../../services/ColorService";
import { reciveAttributeSelection } from "../../../../services/DatabaseService";
import { findIcon } from "../../../../services/IconService";

interface $CreatableSetStringDetailFieldProps {
  entity: IEntity;
  isNew: boolean;
  field: any;
  keyName: string;
  icon: string;
  tableName: string;
  onEdit: (value: any) => void;
  changeEntity: (entity: IEntity) => void;
}

const CreatableSetStringDetailField = ({
  entity,
  isNew,
  field,
  keyName,
  icon,
  tableName,
  onEdit,
  changeEntity,
}: $CreatableSetStringDetailFieldProps) => {
  const systemDbName = useSelector(selectDBName);
  const [setStringEdit, editSetString] = useState<boolean>(isNew);
  const [setStringList, setSetStringList] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    reciveAttributeSelection(
      systemDbName,
      tableName,
      keyName,
      (entities: IndexableType[]) => {
        setSetStringList(
          entities.map((text: IndexableType) => {
            const newText: string = text as string;
            return { value: newText, label: newText };
          })
        );
      }
    );
  }, [entity, tableName, keyName]);

  return (
    <SetString
      colorValue={field}
      isEditing={setStringEdit}
      onClick={() => editSetString(true)}
    >
      {setStringEdit && (
        <InputGroup>
          <InputGroup.Addon>{findIcon(icon)}</InputGroup.Addon>
          <InputPicker
            creatable
            value={field}
            data={setStringList}
            onChange={(val: any) => changeEntity({ ...entity, [keyName]: val })}
          />
          <InputGroup.Button
            onClick={(e) => {
              e.stopPropagation();
              editSetString(false);
              onEdit(entity);
            }}
          >
            <FaCheck />
          </InputGroup.Button>
        </InputGroup>
      )}
      {!setStringEdit && (
        <>
          {findIcon(icon)}
          {field}
        </>
      )}
    </SetString>
  );
};

export default CreatableSetStringDetailField;

const SetString = styled.div<{
  colorValue?: string;
  isEditing?: boolean;
}>`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  line-height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
  color: ${(props) => {
    return stringToColour(props.colorValue);
  }};
  cursor: pointer;

  svg {
    margin-right: 5px;
    width: 15px;
    height: auto;
    border-radius: 150px;
    color: ${({ theme }) => theme.highlight};
  }
`;
