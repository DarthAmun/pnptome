import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { TagPicker } from "rsuite";
import Filter from "../../../data/Filter";
import { getPathVariable } from "../../../services/LocationPathService";

interface $CreatableSetNumberFieldProps {
  entities: any[];
  type: string;
  applyFilter: (filters: Filter, type: any) => void;
  removeFilterChange: (type: any) => void;
}

const CreatableSetNumberField = ({
  entities,
  type,
  applyFilter,
  removeFilterChange,
}: $CreatableSetNumberFieldProps) => {
  let location = useLocation();
  const [val, setVal] = useState<number[]>([]);
  const [valList, setValList] = useState<{ value: number; label: string }[]>(
    []
  );

  useEffect(() => {
    let filters: string = getPathVariable(location, "filter");
    const oldFilterString: string = unescape(filters);
    if (oldFilterString !== "") {
      const oldFilters: Filter[] = JSON.parse(oldFilterString);
      oldFilters.forEach((filter: Filter) => {
        if (filter.fieldName === type) {
          setVal(filter.value as number[]);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (val.length > 0) {
      applyFilter({ fieldName: type, value: val, sort: 0 }, type);
    } else {
      removeFilterChange(type);
    }
  }, [val]);

  useEffect(() => {
    const newValList: number[] = [
      ...Array.from(
        new Set(entities.map((entity: any) => +entity[type]))
      ),
    ].sort((l1, l2) => l1 - l2);
    setValList(
      newValList.map((text: number) => {
        return { value: text, label: String(text) };
      })
    );
  }, [entities, type]);

  const changeVal = (vals: string[]) => {
    if (vals) {
      setVal(vals.map((val: string) => +val));
    } else {
      setVal([]);
    }
  };

  return (
    <TagPicker
      placeholder={`Select ${type}`}
      data={valList}
      trigger={"Enter"}
      value={val}
      onClean={() => setVal([])}
      onChange={(vals: string[]) => changeVal(vals)}
      style={{ width: "300px" }}
    />
  );
};

export default CreatableSetNumberField;
