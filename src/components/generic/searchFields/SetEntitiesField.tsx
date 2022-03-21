import { IndexableType } from "dexie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { TagPicker } from "rsuite";
import Filter from "../../../data/Filter";
import { selectDBName } from "../../../database/SystemReducer";
import { reciveAttributeSelection } from "../../../services/DatabaseService";
import { getPathVariable } from "../../../services/LocationPathService";

interface $SetEntitiesFieldProps {
  type: string;
  entityName: string;
  applyFilter: (filters: Filter, type: any) => void;
  removeFilterChange: (type: any) => void;
}

const SetEntitiesField = ({
  type,
  entityName,
  applyFilter,
  removeFilterChange,
}: $SetEntitiesFieldProps) => {
  let location = useLocation();
  const systemDbName = useSelector(selectDBName);
  const [val, setVal] = useState<string[]>([]);
  const [valList, setValList] = useState<{ value: string; label: string }[]>(
    []
  );

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
    } else {
      removeFilterChange(type);
    }
  }, [val]);

  useEffect(() => {
    reciveAttributeSelection(
      systemDbName,
      type,
      "name",
      (vals: IndexableType[]) => {
        setValList(
          vals.map((text: IndexableType) => {
            const newText: string = text as string;
            return { value: newText, label: newText };
          })
        );
      }
    );
  }, [type, entityName]);

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

export default SetEntitiesField;
