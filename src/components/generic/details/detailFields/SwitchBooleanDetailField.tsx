import { useState } from "react";
import { Checkbox } from "rsuite";
import styled from "styled-components";
import IEntity from "../../../../data/IEntity";
import { spliceFirstToUpper } from "../../../../services/TextService";

interface $SwitchBooleanDetailFieldProps {
  entity: IEntity;
  isNew: boolean;
  field: any;
  keyName: string;
  onEdit: (value: any) => void;
  changeEntity: (entity: IEntity) => void;
}

const SwitchBooleanDetailField = ({
  entity,
  isNew,
  field,
  keyName,
  onEdit,
  changeEntity,
}: $SwitchBooleanDetailFieldProps) => {
  const [switchBooleanEdit, editSwitchBoolean] = useState<boolean>(isNew);

  return (
    <SwitchBoolean
      isEditing={switchBooleanEdit}
      onClick={() => editSwitchBoolean(true)}
    >
      {switchBooleanEdit && (
        <Checkbox
          checked={field}
          onCheckboxClick={(e) => {
            e.stopPropagation();
            editSwitchBoolean(false);
            changeEntity({ ...entity, [keyName]: !field });
            onEdit({ ...entity, [keyName]: !field });
          }}
        >
          Ritual
        </Checkbox>
      )}
      {!switchBooleanEdit && (
        <>
          {!!field ? (
            spliceFirstToUpper(keyName)
          ) : (
            <s>{spliceFirstToUpper(keyName)}</s>
          )}
        </>
      )}
    </SwitchBoolean>
  );
};

export default SwitchBooleanDetailField;

const SwitchBoolean = styled.div<{
  isEditing?: boolean;
}>`
  height: auto;
  float: left;
  padding: 5px 10px 7px 10px;
  margin-left: 5px;
  font-size: 12px;
  line-height: 30px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.secondColor};
  cursor: pointer;
`;
