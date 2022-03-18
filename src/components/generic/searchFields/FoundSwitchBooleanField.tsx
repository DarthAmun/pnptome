import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Checkbox } from "rsuite";
import styled from "styled-components";
import Filter from "../../../data/Filter";
import { getPathVariable } from "../../../services/LocationPathService";

interface $FoundSwitchBooleanFieldProps {
  code: string;
  applyFilter: (filters: Filter, type: any) => void;
  removeFilterChange: (type: any) => void;
}

const FoundSwitchBooleanField = ({
  code,
  applyFilter,
  removeFilterChange,
}: $FoundSwitchBooleanFieldProps) => {
  let location = useLocation();
  const [val, setVal] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
  const [found, setFound] = useState<string>("");

  useEffect(() => {
    const splitCode: string[] = code.split("|")[1]?.split(":");
    setType(splitCode[0]);
    setFound(splitCode[1]);

    let filters: string = getPathVariable(location, "filter");
    const oldFilterString: string = unescape(filters);
    if (oldFilterString !== "") {
      const oldFilters: Filter[] = JSON.parse(oldFilterString);
      oldFilters.forEach((filter: Filter) => {
        if (filter.fieldName === splitCode[0]) {
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
