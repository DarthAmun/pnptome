import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../database/Store";
import { selectDBName } from "../../database/SystemReducer";
import {
  recivePromiseByAttribute,
  recivePromiseByMultiAttribute,
} from "../../services/DatabaseService";
import { getEntityTileConfig } from "../../services/SystemService";
import EntityTile from "./EntityTile";

interface $Props {
  entityName: string;
  name: string;
  sources: string;
}

const TextEntityTile = ({ entityName, name, sources }: $Props) => {
  const [entity, setEntity] = useState<any>();
  const systemDbName = useSelector(selectDBName);
  const system = useSelector((state: RootState) => state.system);

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
    return (
      <EntityTile
        configs={Object.getOwnPropertyNames(
          getEntityTileConfig(system, entityName)
        )}
        entityName={entityName}
        entity={entity}
      />
    );
  return <></>;
};

export default TextEntityTile;
