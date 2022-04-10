import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Checkbox } from "rsuite";
import styled from "styled-components";
import ConfigPart from "../../../data/ConfigPart";
import Filter from "../../../data/Filter";
import { getPathVariable } from "../../../services/LocationPathService";

interface $FoundSwitchBooleanFieldProps {
  config: ConfigPart;
  applyFilter: (filters: Filter, type: any) => void;
  removeFilterChange: (type: any) => void;
}

const FoundSwitchBooleanField = ({
  config,
  applyFilter,
  removeFilterChange,
}: $FoundSwitchBooleanFieldProps) => {
  let location = useLocation();
  const [val, setVal] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [found, setFound] = useState<string>("");

  useEffect(() => {
    setType(config.found?.field || "");
    setFound(config.found?.searchTerm || "");

    let filters: string = getPathVariable(location, "filter");
    const oldFilterString: string = unescape(filters);
    if (oldFilterString !== "") {
      const oldFilters: Filter[] = JSON.parse(oldFilterString);
      oldFilters.forEach((filter: Filter) => {
        if (filter.fieldName === config.found?.field) {
          setVal(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (val) {
      applyFilter({ fieldName: type, value: found, sort: 0 }, type);
    } else {
      removeFilterChange(type);
    }
  }, [val]);

  return (
    <Wrapper>
      <Checkbox checked={val} onCheckboxClick={() => setVal((r) => !r)}>
        {found}
      </Checkbox>
    </Wrapper>
  );
};

export default FoundSwitchBooleanField;

const Wrapper = styled.div`
  width: min-content;
`;
