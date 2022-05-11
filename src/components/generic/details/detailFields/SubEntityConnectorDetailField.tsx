import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconButton, Tag, TagGroup } from "rsuite";
import styled from "styled-components";
import ConfigPart from "../../../../data/ConfigPart";
import IEntity from "../../../../data/IEntity";
import { selectDBName } from "../../../../database/SystemReducer";
import { reciveAllByAttribute } from "../../../../services/DatabaseService";
import { findIcon } from "../../../../services/IconService";

interface $SubEntityConnectorDetailFieldProps {
  entity: IEntity;
  config: ConfigPart;
  keyName: string;
  icon: string;
}

const SubEntityConnectorDetailField = ({
  entity,
  config,
  keyName,
  icon,
}: $SubEntityConnectorDetailFieldProps) => {
  let history = useNavigate();
  const systemDbName = useSelector(selectDBName);
  const [foundEntities, setFoundEntities] = useState<IEntity[]>();

  useEffect(() => {
    if (config.connector)
      reciveAllByAttribute(
        systemDbName,
        config.connector?.subEntityName,
        config.connector?.subEntityField,
        `${entity.name}|${entity.sources}`,
        (foundEntities: IEntity[]) => {
          setFoundEntities(foundEntities);
        }
      );
  }, [systemDbName, entity]);

  const newSubEntity = () => {
    history(`/${keyName}-builder`);
  };
  const viewSubEntity = (id: number | undefined) => {
    history(`/${keyName}-detail/${id}`);
  };

  return (
    <>
      {foundEntities && (
        <Prop>
          {findIcon(icon)}
          <TagGroup>
            {foundEntities?.map((subentity: IEntity) => {
              return (
                <ViewTag onClick={() => viewSubEntity(subentity.id)}>
                  {subentity.name}
                </ViewTag>
              );
            })}
            <AddIconButton
              onClick={() => newSubEntity()}
              icon={<FaPlus />}
              appearance="ghost"
              size="xs"
            />
          </TagGroup>
        </Prop>
      )}
    </>
  );
};

export default SubEntityConnectorDetailField;

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

const AddIconButton = styled(IconButton)`
  margin-left: 10px;
`;

const ViewTag = styled(Tag)`
  cursor: pointer;
`;
