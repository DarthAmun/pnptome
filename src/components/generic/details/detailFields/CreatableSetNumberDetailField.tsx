import { useCallback, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { InputGroup, InputNumber } from "rsuite";
import styled from "styled-components";
import ConfigPart from "../../../../data/ConfigPart";
import IEntity from "../../../../data/IEntity";

interface $CreatableSetNumberDetailFieldProps {
  entity: IEntity;
  isNew: boolean;
  field: any;
  keyName: string;
  config: ConfigPart;
  onEdit: (value: any) => void;
  changeEntity: (entity: IEntity) => void;
}

const CreatableSetNumberDetailField = ({
  entity,
  isNew,
  field,
  keyName,
  config,
  onEdit,
  changeEntity,
}: $CreatableSetNumberDetailFieldProps) => {
  const [setNumberEdit, editSetNumber] = useState<boolean>(isNew);

  const makeReplace = useCallback(
    (config: ConfigPart, field: string | number) => {
      let val = field;
      config.replaces?.forEach((replace) => {
        if (replace.replace === val) val = replace.with;
      });
      return <>{val}</>;
    },
    []
  );

  return (
    <SetNumber isEditing={setNumberEdit} onClick={() => editSetNumber(true)}>
      {setNumberEdit && (
        <InputGroup>
          <InputNumber
            value={field}
            onChange={(val: any) => changeEntity({ ...entity, [keyName]: val })}
            min={1}
            step={1}
            style={{ width: "60px" }}
          />
          <InputGroup.Button
            onClick={(e) => {
              e.stopPropagation();
              editSetNumber(false);
              onEdit(entity);
            }}
          >
            <FaCheck />
          </InputGroup.Button>
        </InputGroup>
      )}
      {!setNumberEdit && <b>{makeReplace(config, field)}</b>}
    </SetNumber>
  );
};

export default CreatableSetNumberDetailField;

const SetNumber = styled.div<{
  isEditing?: boolean;
}>`
  height: auto;
  padding: ${(props) => (props.isEditing ? "3px" : "10px")};
  min-width: 40px;
  width: ${(props) => (props.isEditing ? "fit-content" : "40px")};
  height: ${(props) => (props.isEditing ? "fit-content" : "40px")};
  line-height: 20px;
  float: left;
  text-align: center;
  border-radius: ${(props) => (props.isEditing ? "5px" : "30px")};
  margin: 0px 0px 5px 5px;
  background-color: ${({ theme }) => theme.secondColor};
  cursor: pointer;
`;
