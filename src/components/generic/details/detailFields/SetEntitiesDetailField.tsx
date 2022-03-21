import { IndexableType } from "dexie";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Tag, TagGroup, TagPicker } from "rsuite";
import styled from "styled-components";
import IEntity from "../../../../data/IEntity";
import { selectDBName } from "../../../../database/SystemReducer";
import { reciveAttributeSelection } from "../../../../services/DatabaseService";
import { findIcon } from "../../../../services/IconService";

interface $SetEntitiesDetailFieldProps {
  entity: IEntity;
  isNew: boolean;
  field: any;
  keyName: string;
  icon: string;
  onEdit: (value: any) => void;
  changeEntity: (entity: IEntity) => void;
}

const SetEntitiesDetailField = ({
  entity,
  isNew,
  field,
  keyName,
  icon,
  onEdit,
  changeEntity,
}: $SetEntitiesDetailFieldProps) => {

  const systemDbName = useSelector(selectDBName);
  const [isEdit, changeEdit] = useState<boolean>(isNew);
  const [setEntityList, setSetEntityList] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    reciveAttributeSelection(systemDbName, keyName, "name", (entities: IndexableType[]) => {
      setSetEntityList(
        entities.map((text: IndexableType) => {
          const newText: string = text as string;
          return { value: newText, label: newText };
        })
      );
    });
  }, [entity]);

  return (
    <Prop isEditing={isEdit} onClick={() => changeEdit(true)}>
      {isEdit && (
        <>
          <TagPicker
            data={setEntityList}
            trigger={"Enter"}
            placeholder={keyName}
            value={field}
            onChange={(val: any[]) =>
              changeEntity({ ...entity, [keyName]: val })
            }
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
            {field?.map((classe: string, index: number) => (
              <Tag key={index}>{classe}</Tag>
            ))}
          </TagGroup>
        </>
      )}
    </Prop>
  );
};

export default SetEntitiesDetailField;

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
