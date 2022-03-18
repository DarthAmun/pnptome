import { useCallback, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";

import Details from "./EntityDetailWrapper";
import {
  recivePromise,
  recivePromiseByAttribute,
  recivePromiseByMultiAttribute,
} from "../../../services/DatabaseService";
import { Loader } from "rsuite";
import { TParams } from "../EntityRoutes";
import IEntity from "../../../data/IEntity";

interface $EntityProps {
  entityName: string;
  match: RouteComponentProps<TParams>;
}

const ToEntity = ({ match, entityName }: $EntityProps) => {
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
  }, [match]);

  const makeEntity = useCallback(async () => {
    let nameId: string | undefined = match.match.params.name;
    let newEntity: IEntity | undefined = undefined;
    var reg = /^\d+$/;
    if (nameId !== undefined) {
      if (!reg.test(nameId)) {
        let [name, sources] = nameId.split("|");
        if (sources !== undefined) {
          newEntity = await recivePromiseByMultiAttribute(entityName + "s", {
            name: name,
            sources: sources,
          });
        } else {
          newEntity = await recivePromiseByAttribute(entityName + "s", "name", name);
        }
      } else {
        newEntity = await recivePromise(entityName + "s", +nameId);
      }
    }
    setLoading(false);
    if (newEntity === undefined) {
      setError(true);
    } else {
      setEntity(newEntity);
    }
  }, [match, entityName]);

  useEffect(() => {
    if (match.match !== undefined && entity === undefined) {
      makeEntity();
    }
  }, [match, makeEntity, entity]);

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
