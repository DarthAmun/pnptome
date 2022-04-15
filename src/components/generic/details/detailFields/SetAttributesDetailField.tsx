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

interface $SetAttributesDetailFieldProps {
  entity: IEntity;
  isNew: boolean;
  field: any;
  keyName: string;
  icon: string;
  tableName: string;
  onEdit: (value: any) => void;
  changeEntity: (entity: IEntity) => void;
}

const SetAttributesDetailField = ({
  entity,
  isNew,
  field,
  keyName,
  icon,
  tableName,
  onEdit,
  changeEntity,
}: $SetAttributesDetailFieldProps) => {
  const systemDbName = useSelector(selectDBName);
  const [isEdit, changeEdit] = useState<boolean>(isNew);
  const [entityList, setSetEntityList] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    reciveAttributeSelection(
      systemDbName,
      tableName,
      keyName,
      (entities: IndexableType[]) => {
        const newEntities: { value: string; label: string }[] = [];
        entities.forEach((array: any) => {
          array.forEach((attr: string) => {
            const at = attr.trim();
            newEntities.push({ value: at, label: at });
          });
        });
        const uniqueTags: { value: string; label: string }[] = [];
        newEntities.forEach((ent: { value: string; label: string }) => {
          let douplicate: boolean = false;
          uniqueTags.forEach((uni: { value: string; label: string }) => {
            if (ent.label === uni.label) {
              douplicate = true;
            }
          });
          if (!douplicate) uniqueTags.push(ent);
        });
        uniqueTags.sort((a, b) => a.label.localeCompare(b.label));
        setSetEntityList(uniqueTags);
      }
    );
  }, [tableName, keyName, field, entity]);

  return (
    <Prop isEditing={isEdit} onClick={() => changeEdit(true)}>
      {isEdit && (
        <>
          <TagPicker
            data={entityList}
            trigger={"Enter"}
            placeholder={keyName}
            value={field}
            creatable
            onCreate={(val: any[], item: any) => {
              setSetEntityList((e) => [...e, item]);
              changeEntity({ ...entity, [keyName]: [...val, item.value] });
            }}
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

export default SetAttributesDetailField;

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
