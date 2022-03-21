import { IndexableType } from "dexie";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, InputPicker, Tag, TagGroup } from "rsuite";
import styled from "styled-components";
import IEntity from "../../../../data/IEntity";
import { selectDBName } from "../../../../database/SystemReducer";
import { reciveAttributeSelection } from "../../../../services/DatabaseService";
import { findIcon } from "../../../../services/IconService";

interface $SetEntityDetailFieldProps {
  entity: IEntity;
  isNew: boolean;
  field: any;
  keyName: string;
  matchedEntityName: string;
  icon: string;
  onEdit: (value: any) => void;
  changeEntity: (entity: IEntity) => void;
}

const SetEntityDetailField = ({
  entity,
  isNew,
  field,
  keyName,
  matchedEntityName,
  icon,
  onEdit,
  changeEntity,
}: $SetEntityDetailFieldProps) => {
  const systemDbName = useSelector(selectDBName);
  const [isEdit, changeEdit] = useState<boolean>(isNew);
  const [setEntityList, setSetEntityList] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    console.log(matchedEntityName);
    reciveAttributeSelection(
      systemDbName,
      matchedEntityName + "s",
      "name",
      (entities: IndexableType[]) => {
        setSetEntityList(
          entities.map((text: IndexableType) => {
            const newText: string = (text as string).toLowerCase();
            return { value: newText, label: newText };
          })
        );
      }
    );
  }, [entity]);

  return (
    <Prop isEditing={isEdit} onClick={() => changeEdit(true)}>
      {isEdit && (
        <>
          <InputPicker
            data={setEntityList}
            placeholder={keyName}
            value={field}
            onChange={(val: any) => changeEntity({ ...entity, [keyName]: val })}
            onKeyPress={(e: any) => {
              if (e.key === "Enter") {
                changeEdit(false);
                onEdit(entity);
              }
            }}
            style={{ minWidth: "300px" }}
          />
          <Button
            onClick={(e) => {
              e.stopPropagation();
              changeEdit(false);
              onEdit(entity);
            }}
          >
            <FaCheck />
          </Button>
        </>
      )}
      {!isEdit && (
        <>
          {findIcon(icon)}
          <TagGroup>
            <Tag>{field}</Tag>
          </TagGroup>
        </>
      )}
    </Prop>
  );
};

export default SetEntityDetailField;

const Prop = styled.div<{
  isEditing?: boolean;
}>`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px 5px 2px 0px;
  float: left;
  padding: ${(props) => (props.isEditing ? "3px" : "10px")};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
  display: flex;
  gap: 5px;
  cursor: pointer;

  & > svg {
    margin-right: 5px;
    width: 15px;
    height: auto;
    border-radius: 150px;
    color: ${({ theme }) => theme.highlight};
  }
`;
