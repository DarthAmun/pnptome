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
import { findSearchField, getSearchConfig } from "../../services/SystemService";
import { useSelector } from "react-redux";
import { RootState } from "../../database/Store";
import SetEntitiesField from "./searchFields/SetEntitiesField";
import ConfigPart from "../../data/ConfigPart";

interface $SearchProps {
  entityName: string;
  entities: any[];
  filters: Filter[];
  showSearchBar: boolean;
  openSearchBar: (value: boolean) => void;
  doSearch: (filters: Filter[]) => void;
}

const EntitySearch = ({
  entityName,
  entities,
  filters: mainFilters,
  showSearchBar,
  openSearchBar,
  doSearch,
}: $SearchProps) => {
  let history = useHistory();
  let location = useLocation();
  const [oldFilters, setOldFilters] = useState<Filter[]>(mainFilters);
  const [filters, setFilters] = useState<Filter[]>([]);
  const system = useSelector((state: RootState) => state.system);

  const applyFilterChange = (filter: Filter, type: any) => {
    setFilters((newFilters: Filter[]) => {
      if (newFilters.filter((f) => f.fieldName === type).length === 1)
        newFilters = newFilters.map((f) => (f.fieldName === type ? filter : f));
      else newFilters = [...newFilters, filter];
      return newFilters;
    });
  };

  const removeFilterChange = (type: any) => {
    setFilters((newFilters: Filter[]) => {
      return newFilters.filter((f) => f.fieldName !== type);
    });
  };

  useEffect(() => {
    doSearch(oldFilters);
  }, [oldFilters]);

  useEffect(() => {
    let filters: string = getPathVariable(location, "filter");
    const oldFilterString: string = unescape(filters);
    if (oldFilterString !== "") {
      const newOldFilters: Filter[] = JSON.parse(oldFilterString);
      setOldFilters(newOldFilters);
    }
  }, []);

  const search = () => {
    let newFilters: Filter[] = [...filters];
    if (newFilters.length > 0) {
      if (location.search !== "") {
        let step: string = "";
        const locationParts: string[] = location.search.substring(1).split("&");
        locationParts.forEach((part: string) => {
          if (part.includes("step")) step = part;
        });
        history.push({
          pathname: `/${entityName}-overview`,
          search: `?filter=${JSON.stringify(newFilters)}&${
            step !== "" ? `${step}&` : ""
          }page=1`,
        });
      } else {
        history.push({
          pathname: `/${entityName}-overview`,
          search: `?filter=${JSON.stringify(newFilters)}`,
        });
      }
    } else {
      history.push({
        pathname: `/${entityName}-overview`,
      });
    }
    doSearch(newFilters);
  };

  const reset = () => {
    setFilters([]);
    setOldFilters([]);
    let step: string = "";
    const locationParts: string[] = location.search.substring(1).split("&");
    locationParts.forEach((part: string) => {
      if (part.includes("step")) step = part;
    });
    history.push({
      pathname: `/${entityName}-overview`,
      search: `?${step !== "" ? `${step}&` : ""}page=1`,
    });
  };

  return (
    <Drawer
      open={showSearchBar}
      onClose={() => openSearchBar(false)}
      placement={"top"}
    >
      <Drawer.Header>
        <Drawer.Title>Search</Drawer.Title>
        <Drawer.Actions>
          <Button
            onClick={() => {
              search();
              openSearchBar(false);
            }}
            appearance="primary"
          >
            Search
          </Button>
          <Button
            onClick={() => {
              reset();
              openSearchBar(false);
            }}
            appearance="ghost"
          >
            Reset
          </Button>
        </Drawer.Actions>
      </Drawer.Header>
      <Drawer.Body>
        <SearchWrapper>
          {Object.getOwnPropertyNames(getSearchConfig(system, entityName)).map(
            (keyName: any, index: number) => {
              const fieldEntry: ConfigPart = findSearchField(
                system,
                entityName,
                keyName
              );
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
            }
          )}
        </SearchWrapper>
      </Drawer.Body>
    </Drawer>
  );
};

export default EntitySearch;

const SearchWrapper = styled.div`
  height: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 10px;
`;
