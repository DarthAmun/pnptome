import { useEffect, useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import { Button } from "rsuite";
import IEntity from "../../../../../data/IEntity";
import styled from "styled-components";
import FormattedText from "../../../../general/FormattedText";
import QuillEditor from "../../../../general/QuillEditor";
import { findIcon } from "../../../../../services/IconService";

interface $TextSubDetailFieldProps {
  index: any;
  entity: IEntity;
  isNew: boolean;
  field: any;
  keyName: string;
  icon: string;
  onEdit: (value: any) => void;
  changeEntity: (entity: IEntity) => void;
}

const TextSubDetailField = ({
  index,
  entity,
  isNew,
  field,
  keyName,
  icon,
  onEdit,
  changeEntity,
}: $TextSubDetailFieldProps) => {
  const [isEdit, changeEdit] = useState<boolean>(isNew);

  useEffect(() => {
    if (!field.includes("<p>")) {
      changeEntity({ ...entity, [keyName]: "<p>" + field + "</p>" });
    }
  }, [entity, keyName, field, changeEntity]);

  return (
    <Text key={index} isEditing={isEdit}>
      {isEdit && (
        <>
          <QuillEditor
            value={field}
            placeholder={keyName}
            onChange={(val: any) => {
              changeEntity({ ...entity, [keyName]: val });
            }}
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
          <PropTitle>{findIcon(icon)}</PropTitle>
          <Button onClick={() => changeEdit(true)} style={{ float: "right" }}>
            <FaEdit />
          </Button>
          <FormattedText text={field} />
        </>
      )}
    </Text>
  );
};

export default TextSubDetailField;

const PropTitle = styled.span`
  display: inline-block;
  color: ${({ theme }) => theme.highlight};
  text-decoration: none;
  margin: 0px 5px 0px 5px;
`;

const Text = styled.div<{
  isEditing?: boolean;
}>`
  height: auto;
  width: calc(100% - 15px);
  margin: 10px 0px 5px 0px;
  padding: 10px;
  float: left;
  line-height: 18px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.mainColor};
`;
