import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { InputGroup, Input, InputNumber, Tag, TagGroup, Button } from "rsuite";
import IEntity from "../../../../../data/IEntity";
import styled from "styled-components";
import { findIcon } from "../../../../../services/IconService";

interface $NumberArraySubDetailFieldProps {
  index: any;
  entity: IEntity;
  isNew: boolean;
  field: number[];
  keyName: string;
  icon: string;
  onEdit: (value: any) => void;
  changeEntity: (entity: IEntity) => void;
}

const NumberArraySubDetailField = ({
  index,
  entity,
  isNew,
  field,
  keyName,
  icon,
  onEdit,
  changeEntity,
}: $NumberArraySubDetailFieldProps) => {
  const [isEdit, changeEdit] = useState<boolean>(isNew);

  console.log(field, keyName);

  return (
    <Prop key={index} isEditing={isEdit} onClick={() => changeEdit(true)}>
      {isEdit && (
        <>
          {field?.map((num: number, index: number) => (
            <InputNumber
              value={num}
              min={1}
              step={1}
              style={{ width: "60px" }}
              onChange={(val: any) => {
                let newArray = [...field];
                newArray[index] = val;
                changeEntity({ ...entity, [keyName]: newArray });
              }}
            />
          ))}
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
            {field.map((num: number) => (
              <Tag>{num}</Tag>
            ))}
          </TagGroup>
        </>
      )}
    </Prop>
  );
};

export default NumberArraySubDetailField;

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
  background-color: ${({ theme }) => theme.mainColor};
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
