import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ConfigPart from "../../../data/ConfigPart";
import IEntity from "../../../data/IEntity";
import { RootState } from "../../../database/Store";
import {
  findEntityDetailField,
  findEntityTileField,
  getEntityDetailConfig,
} from "../../../services/SystemService";
import { spliceFirstToUpper } from "../../../services/TextService";

import CompletableStringDetailField from "./detailFields/CompletableStringDetailField";
import CreatableSetNumberDetailField from "./detailFields/CreatableSetNumberDetailField";
import CreatableSetStringDetailField from "./detailFields/CreatableSetStringDetailField";
import ImageNameDetailField from "./detailFields/ImageNameDetailField";
import SearchableStringDetailField from "./detailFields/SearchableStringDetailField";
import SearchableTextDetailField from "./detailFields/SearchableTextDetailField";
import SetEntitiesDetailField from "./detailFields/SetEntitiesDetailField";
import SetEntityDetailField from "./detailFields/SetEntityDetailField";
import SwitchBooleanDetailField from "./detailFields/SwitchBooleanDetailField";
import ViewEntityDetailField from "./detailFields/ViewEntityDetailField";

interface $Props {
  entity: IEntity;
  entityName: string;
  isNew: boolean;
  onEdit: (value: any) => void;
}

const EntityDetails = ({ entity, entityName, isNew, onEdit }: $Props) => {
  const [currentEntity, changeEntity] = useState<IEntity>({ ...entity });
  const system = useSelector((state: RootState) => state.system);

  const makeFoundFlag = useCallback(
    (config: ConfigPart) => {
      if (config.found) {
        const field = entity[config.found?.field as keyof typeof entity];
        const showFlag = (field + "")
          .toLowerCase()
          .includes(config.found?.searchTerm);
        return showFlag ? (
          spliceFirstToUpper(config.found?.searchTerm)
        ) : (
          <s>{spliceFirstToUpper(config.found?.searchTerm)}</s>
        );
      }
      return <></>;
    },
    [entity]
  );

  return (
    <CenterWrapper>
      <View>
        {Object.getOwnPropertyNames(getEntityDetailConfig(system, entityName)).map(
          (keyName: any, index: number) => {
            const field = currentEntity[keyName as keyof typeof entity];
            const fieldEntry = findEntityDetailField(system, entityName, keyName);
            if (field !== undefined) {
              switch (true) {
                case fieldEntry.type === "CreatableSetNumber":
                  return (
                    <CreatableSetNumberDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );
                case fieldEntry.type === "CreatableSetString":
                  return (
                    <CreatableSetStringDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      icon={fieldEntry.icon || ""}
                      tableName={entityName}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );
                case fieldEntry.type === "SwitchBoolean":
                  return (
                    <SwitchBooleanDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );
                case fieldEntry.type === "ImageName":
                  return (
                    <ImageNameDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );
                case fieldEntry.type === "CompletableString":
                  return (
                    <CompletableStringDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      icon={fieldEntry.icon || ""}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );
                case fieldEntry.type === "SearchableString":
                  return (
                    <SearchableStringDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      icon={fieldEntry.icon || ""}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );
                case fieldEntry.type === "SetEntities":
                  return (
                    <SetEntitiesDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      icon={fieldEntry.icon || ""}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );
                case fieldEntry.type === "SetEntity":
                  return (
                    <SetEntityDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      matchedEntityName={fieldEntry.linkToAttribute || ""}
                      icon={fieldEntry.icon || ""}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );
                case fieldEntry.type === "SearchableText":
                  return (
                    <SearchableTextDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      icon={fieldEntry.icon || ""}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );

                default:
                  return <></>;
              }
            } else {
              switch (true) {
                case fieldEntry.type === "FoundFlag":
                  return <Flag key={index}>{makeFoundFlag(fieldEntry)}</Flag>;
                case fieldEntry.type === "ViewEntity":
                  return (
                    <ViewEntityDetailField
                      key={index}
                      keyName={keyName}
                      entity={currentEntity}
                      config={fieldEntry}
                    />
                  );
                default:
                  return <></>;
              }
            }
          }
        )}
      </View>
    </CenterWrapper>
  );
};

export default EntityDetails;

const CenterWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const View = styled.div`
  color: ${({ theme }) => theme.textColor};
  font-size: 16px;
  max-width: 800px;
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
`;

const Flag = styled.div<{
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
`;
