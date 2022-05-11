import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Filter from "../../data/Filter";
import { Drawer, Button } from "rsuite";
import { getPathVariable } from "../../services/LocationPathService";
import { getEntitySearchConfig } from "../../services/SystemService";
import { useSelector } from "react-redux";
import { RootState } from "../../database/Store";
import EntitySearchModules from "./EntitySearchModules";

interface $SearchProps {
  entityName: string;
  entities: any[];
  filters: Filter[];
  showSearchBar: boolean;
  openSearchBar: (value: boolean) => void;
  doSearch: (filters: Filter[], isNewSearch: boolean) => void;
}

const EntitySearch = ({
  entityName,
  entities,
  filters: mainFilters,
  showSearchBar,
  openSearchBar,
  doSearch,
}: $SearchProps) => {
  let history = useNavigate();
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
    if (JSON.stringify(oldFilters) != JSON.stringify(mainFilters))
      doSearch(oldFilters, false);
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
        history({
          pathname: `/${entityName}-overview`,
          search: `?filter=${JSON.stringify(newFilters)}&${
            step !== "" ? `${step}&` : ""
          }page=1`,
        });
      } else {
        history({
          pathname: `/${entityName}-overview`,
          search: `?filter=${JSON.stringify(newFilters)}`,
        });
      }
    } else {
      history({
        pathname: `/${entityName}-overview`,
      });
    }
    doSearch(newFilters, true);
  };

  const reset = () => {
    setFilters([]);
    setOldFilters([]);
    let step: string = "";
    const locationParts: string[] = location.search.substring(1).split("&");
    locationParts.forEach((part: string) => {
      if (part.includes("step")) step = part;
    });
    history({
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
        <EntitySearchModules
          configs={Object.getOwnPropertyNames(
            getEntitySearchConfig(system, entityName)
          )}
          entityName={entityName}
          entities={entities}
          applyFilterChange={applyFilterChange}
          removeFilterChange={removeFilterChange}
        />
      </Drawer.Body>
    </Drawer>
  );
};

export default EntitySearch;
