import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TagPicker } from "rsuite";
import Filter from "../../../data/Filter";
import { getPathVariable } from "../../../services/LocationPathService";

interface $CreatableSetStringFieldProps {
  entities: any[];
  type: string;
  applyFilter: (filters: Filter, type: any) => void;
  removeFilterChange: (type: any) => void;
}

const CreatableSetStringField = ({
  entities,
  type,
  applyFilter,
  removeFilterChange,
}: $CreatableSetStringFieldProps) => {
  let location = useLocation();
  const [val, setVal] = useState<string[]>([]);
  const [valList, setValList] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    let filters: string = getPathVariable(location, "filter");
    const oldFilterString: string = unescape(filters);
    if (oldFilterString !== "") {
      const oldFilters: Filter[] = JSON.parse(oldFilterString);
      oldFilters.forEach((filter: Filter) => {
        if (filter.fieldName === type) {
          setVal(filter.value as string[]);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (val.length > 0) {
      applyFilter({ fieldName: type, value: val, sort: 0 }, type);
    }else {
      removeFilterChange(type);
    }
  }, [val]);

  useEffect(() => {
    const newValList: string[] = [
      ...Array.from(new Set(entities.map((entity: any) => entity[type]))),
    ].sort();
    setValList(
      newValList.map((text: string) => {
        return { value: text, label: text };
      })
    );
  }, [entities, type]);

  return (
    <TagPicker
      placeholder={`Select ${type}`}
      data={valList}
      trigger={"Enter"}
      value={val}
      onChange={setVal}
      onClean={() => setVal([])}
      style={{ width: "300px" }}
    />
  );
};

export default CreatableSetStringField;
