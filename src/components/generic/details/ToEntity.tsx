import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Details from "./EntityDetailWrapper";
import {
  recivePromise,
  recivePromiseByAttribute,
  recivePromiseByMultiAttribute,
} from "../../../services/DatabaseService";
import { Loader } from "rsuite";
import IEntity from "../../../data/IEntity";
import { useSelector } from "react-redux";
import { selectDBName } from "../../../database/SystemReducer";

interface $EntityProps {
  entityName: string;
}

const ToEntity = ({ entityName }: $EntityProps) => {
  const params = useParams();
  const systemDbName = useSelector(selectDBName);
  const [entity, setEntity] = useState<IEntity>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (entity !== undefined || error) {
      setLoading(true);
      setError(false);
      setEntity(undefined);
    }
    // eslint-disable-next-line
  }, [params]);

  const makeEntity = useCallback(async () => {
    let nameId: string | undefined = params.name;
    let newEntity: IEntity | undefined = undefined;
    var reg = /^\d+$/;
    if (nameId !== undefined) {
      if (!reg.test(nameId)) {
        let [name, sources] = nameId.split("|");
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
      } else {
        newEntity = await recivePromise(systemDbName, entityName, +nameId);
      }
    }
    setLoading(false);
    if (newEntity === undefined) {
      setError(true);
    } else {
      setEntity(newEntity);
    }
  }, [params, entityName]);

  useEffect(() => {
    if (params !== undefined && entity === undefined) {
      makeEntity();
    }
  }, [params, makeEntity, entity]);

  return (
    <>
      {loading && <Loader center content="Loading..." />}
      {!loading && error && <>Error</>}
      {!error && !loading && entity !== undefined && (
        <Details entity={entity} entityName={entityName} />
      )}
    </>
  );
};

export default ToEntity;
