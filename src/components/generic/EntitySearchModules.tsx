import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Filter from "../../data/Filter";
import styled from "styled-components";
import { Drawer, Button } from "rsuite";
import { getPathVariable } from "../../services/LocationPathService";
import SearchableStringField from "./searchFields/SearchableStringField";
import SetStringField from "./searchFields/SetStringField";
import CreatableSetStringField from "./searchFields/CreatableSetStringField";
import CompletableStringField from "./searchFields/CompletableStringField";
import SwitchBooleanField from "./searchFields/SwitchBooleanField";
import CreatableSetNumberField from "./searchFields/CreatableSetNumberField";
import SetEntityField from "./searchFields/SetEntityField";
import FoundSwitchBooleanField from "./searchFields/FoundSwitchBooleanField";
import {
  findEntitySearchField,
  getEntitySearchConfig,
} from "../../services/SystemService";
import { useSelector } from "react-redux";
import { RootState } from "../../database/Store";
import SetEntitiesField from "./searchFields/SetEntitiesField";
import ConfigPart from "../../data/ConfigPart";
import SetAttributesField from "./searchFields/SetAttributes";

interface $SearchProps {
  configs: string[];
  entityName: string;
  entities: any[];
  applyFilterChange: (filter: Filter, type: any) => void;
  removeFilterChange: (type: any) => void;
  dummyFieldEntry?: ConfigPart;
}

const EntitySearchModules = ({
  configs,
  entityName,
  entities,
  applyFilterChange,
  removeFilterChange,
  dummyFieldEntry,
}: $SearchProps) => {
  const system = useSelector((state: RootState) => state.system);

  return (
    <SearchWrapper>
      {configs.map((keyName: any, index: number) => {
        const fieldEntry: ConfigPart = dummyFieldEntry
          ? dummyFieldEntry
          : findEntitySearchField(system, entityName, keyName);

        switch (true) {
          case fieldEntry.type === "SearchableText":
          case fieldEntry.type === "SearchableString":
            return (
              <SearchableStringField
                key={index}
                entityName={entityName}
                type={keyName}
                applyFilter={applyFilterChange}
                removeFilterChange={removeFilterChange}
              />
            );
          case fieldEntry.type === "SetString":
            return (
              <SetStringField
                key={index}
                entityName={entityName}
                type={keyName}
                applyFilter={applyFilterChange}
                removeFilterChange={removeFilterChange}
              />
            );
          case fieldEntry.type === "SetAttributes":
            return (
              <SetAttributesField
                key={index}
                entityName={entityName}
                type={keyName}
                applyFilter={applyFilterChange}
                removeFilterChange={removeFilterChange}
              />
            );
          case fieldEntry.type === "SetEntities":
            return (
              <SetEntitiesField
                key={index}
                entityName={entityName}
                type={keyName}
                applyFilter={applyFilterChange}
                removeFilterChange={removeFilterChange}
              />
            );
          case fieldEntry.type === "SetEntity":
            return (
              <SetEntityField
                key={index}
                entityName={entityName}
                type={keyName}
                entityTableName={fieldEntry.linkToAttribute || ""}
                applyFilter={applyFilterChange}
                removeFilterChange={removeFilterChange}
              />
            );
          case fieldEntry.type === "CreatableSetString":
            return (
              <CreatableSetStringField
                key={index}
                entities={entities}
                type={keyName}
                applyFilter={applyFilterChange}
                removeFilterChange={removeFilterChange}
              />
            );
          case fieldEntry.type === "CompletableString":
            return (
              <CompletableStringField
                key={index}
                entities={entities}
                entityName={entityName}
                type={keyName}
                applyFilter={applyFilterChange}
                removeFilterChange={removeFilterChange}
              />
            );
          case fieldEntry.type === "SwitchBoolean":
            return (
              <SwitchBooleanField
                key={index}
                type={keyName}
                applyFilter={applyFilterChange}
                removeFilterChange={removeFilterChange}
              />
            );
          case fieldEntry.type === "CreatableSetNumber":
            return (
              <CreatableSetNumberField
                key={index}
                entities={entities}
                type={keyName}
                applyFilter={applyFilterChange}
                removeFilterChange={removeFilterChange}
              />
            );
          case fieldEntry.type === "FoundString":
            return (
              <FoundSwitchBooleanField
                config={fieldEntry}
                key={index}
                applyFilter={applyFilterChange}
                removeFilterChange={removeFilterChange}
              />
            );
          default:
            return <></>;
        }
      })}
    </SearchWrapper>
  );
};

export default EntitySearchModules;

const SearchWrapper = styled.div`
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px;
`;
