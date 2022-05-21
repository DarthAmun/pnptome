import { useState } from "react";
import IEntity from "../../../../../data/IEntity";
import styled from "styled-components";
import { findIcon } from "../../../../../services/IconService";
import { Checkbox } from "rsuite";

interface $BooleanSubDetailFieldProps {
  index: any;
  entity: IEntity;
  isNew: boolean;
  field: any;
  keyName: string;
  icon: string;
  onEdit: (value: any) => void;
  changeEntity: (entity: IEntity) => void;
}

const BooleanSubDetailField = ({
  index,
  entity,
  isNew,
  field,
  keyName,
  icon,
  onEdit,
  changeEntity,
}: $BooleanSubDetailFieldProps) => {
  const [isEdit, changeEdit] = useState<boolean>(isNew);

  return (
    <Prop key={index} isEditing={isEdit} onClick={() => changeEdit(true)}>
      {isEdit && (
        <Checkbox
          checked={field}
          onCheckboxClick={(e) => {
            e.stopPropagation();
            changeEdit(false);
            changeEntity({ ...entity, [keyName]: !field });
            onEdit({ ...entity, [keyName]: !field });
          }}
        >
          Ritual
        </Checkbox>
      )}
      {!isEdit && <>{!!field ? findIcon(icon) : <s>{findIcon(icon)}</s>}</>}
    </Prop>
  );
};

export default BooleanSubDetailField;

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
