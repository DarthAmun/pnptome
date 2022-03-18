import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import IEntity from "../../../data/IEntity";
import { RootState } from "../../../database/Store";
import {
  findDetailField,
  findTileField,
  getDetailConfig,
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
    (keyName: string) => {
      const code = findTileField(system, entityName, keyName);
      const splitCode: string[] = code.split("|")[1]?.split(":");
      const field = entity[splitCode[0] as keyof typeof entity];
      const showFlag = (field + "").toLowerCase().includes(splitCode[1]);
      return showFlag ? (
        spliceFirstToUpper(splitCode[1])
      ) : (
        <s>{spliceFirstToUpper(splitCode[1])}</s>
      );
    },
    [entity]
  );

  return (
    <CenterWrapper>
      <View>
        {Object.getOwnPropertyNames(getDetailConfig(system, entityName)).map(
          (keyName: any, index: number) => {
            const field = currentEntity[keyName as keyof typeof entity];
            const fieldEntry = findDetailField(system, entityName, keyName);
            if (field !== undefined) {
              switch (true) {
                case fieldEntry === "CreatableSetNumber":
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
                case fieldEntry.includes("CreatableSetString"):
                  return (
                    <CreatableSetStringDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      icon={fieldEntry.split("|")[1]}
                      tableName={entityName + "s"}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );
                case fieldEntry === "SwitchBoolean":
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
                case fieldEntry === "ImageName":
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
                case fieldEntry.includes("CompletableString"):
                  return (
                    <CompletableStringDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      icon={fieldEntry.split("|")[1]}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );
                case fieldEntry.includes("SearchableString"):
                  return (
                    <SearchableStringDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      icon={fieldEntry.split("|")[1]}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );
                case fieldEntry.includes("SetEntities"):
                  return (
                    <SetEntitiesDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      icon={fieldEntry.split("|")[1]}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );
                case fieldEntry.includes("SetEntity"):
                  return (
                    <SetEntityDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      matchedEntityName={fieldEntry.split("|")[1].split(":")[0]}
                      icon={fieldEntry.split(":")[1]}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );
                case fieldEntry.includes("SearchableText"):
                  return (
                    <SearchableTextDetailField
                      key={index}
                      field={field}
                      keyName={keyName}
                      entity={currentEntity}
                      isNew={isNew}
                      icon={fieldEntry.split("|")[1]}
                      onEdit={onEdit}
                      changeEntity={changeEntity}
                    />
                  );

                default:
                  return <></>;
              }
            } else {
              switch (true) {
                case fieldEntry.includes("FoundFlag"):
                  return <Flag key={index}>{makeFoundFlag(keyName)}</Flag>;
                case fieldEntry.includes("ViewEntity"):
                  return (
                    <ViewEntityDetailField
                      key={index}
                      keyName={keyName}
                      entity={currentEntity}
                      matchedEntityName={fieldEntry.split("|")[1]}
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

const PropWrapper = styled.div`
  height: auto;
  width: calc(100% - 6px);
  float: left;
  padding: 3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Prop = styled.div<{
  isEditing?: boolean;
}>`
  flex: 1 1 auto;
  max-width: 100%;
  height: auto;
  margin: 2px;
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

const FlagContent = styled.div`
  width: fit-content;
  height: fit-content;
`;
