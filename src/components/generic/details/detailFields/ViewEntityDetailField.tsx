import { IndexableType } from "dexie";
import { useEffect, useState } from "react";
import { FaCheck, FaUser } from "react-icons/fa";
import { Button, InputPicker, Tag, TagGroup } from "rsuite";
import styled from "styled-components";
import IEntity from "../../../../data/IEntity";
import {
  reciveAttributeSelection,
  reciveByAttribute,
} from "../../../../services/DatabaseService";
import { findIcon } from "../../../../services/IconService";

interface $ViewEntityDetailFieldProps {
  entity: IEntity;
  keyName: string;
  matchedEntityName: string;
}

const ViewEntityDetailField = ({
  entity,
  keyName,
  matchedEntityName,
}: $ViewEntityDetailFieldProps) => {
  const [foundEntity, setFoundEntity] = useState<IEntity>();
  const [fields, setFields] = useState<string[]>([]);

  useEffect(() => {
    const split: string[] = matchedEntityName.split(":");
    const field: string = entity[split[0] as keyof typeof entity] as string;
    reciveByAttribute(keyName + "s", "name", field, (foundEntity: IEntity) => {
      setFoundEntity(foundEntity);
      setFields(split[1].split(";"));
    });
  }, [entity]);

  return (
    <>
      {foundEntity && (
        <Prop>
          <TagGroup>
            {fields?.map((field: string) => {
              return (
                <Tag>
                  <TagTitle>{field}:</TagTitle> {foundEntity[field as keyof typeof entity]}
                </Tag>
              );
            })}
          </TagGroup>
        </Prop>
      )}
    </>
  );
};

export default ViewEntityDetailField;

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

  & > svg {
    margin-right: 5px;
    width: 15px;
    height: auto;
    border-radius: 150px;
    color: ${({ theme }) => theme.highlight};
  }
`;

const TagTitle = styled.span`
  color: ${({ theme }) => theme.highlight};
`;
