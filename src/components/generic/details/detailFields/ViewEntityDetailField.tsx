import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tag, TagGroup } from "rsuite";
import styled from "styled-components";
import ConfigPart from "../../../../data/ConfigPart";
import IEntity from "../../../../data/IEntity";
import { selectDBName } from "../../../../database/SystemReducer";
import { reciveByAttribute } from "../../../../services/DatabaseService";

interface $ViewEntityDetailFieldProps {
  entity: IEntity;
  keyName: string;
  config: ConfigPart;
}

const ViewEntityDetailField = ({
  entity,
  keyName,
  config,
}: $ViewEntityDetailFieldProps) => {
  const systemDbName = useSelector(selectDBName);
  const [foundEntity, setFoundEntity] = useState<IEntity>();
  const [fields, setFields] = useState<string[]>([]);

  useEffect(() => {
    const field: string = entity[config.viewEntity?.linkedBy as keyof typeof entity] as string;
    reciveByAttribute(systemDbName, keyName + "s", "name", field, (foundEntity: IEntity) => {
      setFoundEntity(foundEntity);
      setFields(config.viewEntity?.fieldsDisplayed || []);
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
                  <TagTitle>{field}:</TagTitle>{" "}
                  {foundEntity[field as keyof typeof entity]}
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
