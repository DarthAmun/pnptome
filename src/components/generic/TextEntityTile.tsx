import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDBName } from "../../database/SystemReducer";
import {
  recivePromiseByAttribute,
  recivePromiseByMultiAttribute,
} from "../../services/DatabaseService";
import { findIcon } from "../../services/IconService";
import EntityTile from "./EntityTile";

interface $Props {
  entityName: string;
  name: string;
  sources: string;
}

const TextEntityTile = ({ entityName, name, sources }: $Props) => {
  const [entity, setEntity] = useState<any>();
  const systemDbName = useSelector(selectDBName);

  const findEntity = async () => {
    let newEntity: any = undefined;
    if (sources !== undefined) {
      newEntity = await recivePromiseByMultiAttribute(
        systemDbName,
        entityName,
        {
          name: name,
          sources: sources,
        }
      );
    } else {
      newEntity = await recivePromiseByAttribute(
        systemDbName,
        entityName,
        "name",
        name
      );
    }
    setEntity(newEntity);
  };

  useEffect(() => {
    findEntity();
  }, []);

  if (entity !== undefined)
    return <EntityTile entityName={entityName} entity={entity} />;
  return <></>;
};

export default TextEntityTile;
