import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { InputGroup, Input } from "rsuite";
import IEntity from "../../../../data/IEntity";
import styled from "styled-components";
import { findIcon } from "../../../../services/IconService";

interface $SearchableStringDetailFieldProps {
  entity: IEntity;
  isNew: boolean;
  field: any;
  keyName: string;
  icon: string;
  onEdit: (value: any) => void;
  changeEntity: (entity: IEntity) => void;
}

const SearchableStringDetailField = ({
  entity,
  isNew,
  field,
  keyName,
  icon,
  onEdit,
  changeEntity,
}: $SearchableStringDetailFieldProps) => {
  const [isEdit, changeEdit] = useState<boolean>(isNew);

  return (
    <Prop isEditing={isEdit} onClick={() => changeEdit(true)}>
      {isEdit && (
        <InputGroup style={{ width: "max-content" }}>
          <InputGroup.Addon>{findIcon(icon)}</InputGroup.Addon>
          <Input
            placeholder={keyName}
            value={field}
            onChange={(val: any) => changeEntity({ ...entity, [keyName]: val })}
            onKeyPress={(e: any) => {
              if (e.key === "Enter") {
                changeEdit(false);
                onEdit(entity);
              }
            }}
          />
          <InputGroup.Button
            onClick={(e) => {
              e.stopPropagation();
              changeEdit(false);
              onEdit(entity);
            }}
          >
            <FaCheck />
          </InputGroup.Button>
        </InputGroup>
      )}
      {!isEdit && (
        <>
          {findIcon(icon)} {field}
        </>
      )}
    </Prop>
  );
};

export default SearchableStringDetailField;

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
