import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Input, Loader } from "rsuite";
import { selectDBName, System } from "../../database/SystemReducer";
import { reciveSystem, updateSystem } from "../../services/DatabaseService";
import { generateSystem } from "../../services/SystemService";

interface $EntityProps {
  match: any;
}

const SystemDetail = ({ match }: $EntityProps) => {
  const [entity, setEntity] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (match !== undefined && entity === undefined) {
      const id: string | undefined = match.params.id;
      console.log(id);
      if (id)
        reciveSystem("PnPTomeDB", +id, (entity: System) => {
          setEntity(JSON.stringify(entity as System, null, 2));
          setLoading(false);
        });
    }
  }, [match, entity]);

  const update = () => {
    if (entity) {
      const parsedEntity: System = JSON.parse(entity) as System;
      updateSystem(parsedEntity);
      generateSystem(parsedEntity);
    }
  };

  return (
    <>
      {loading && <Loader center content="Loading..." />}
      {!loading && entity !== undefined && (
        <>
          <Input
            as="textarea"
            rows={3}
            placeholder="Textarea"
            value={entity}
            onChange={(val: any) => setEntity(val)}
          />
          <Button onClick={(e) => update()} style={{ marginRight: "10px" }}>
            Overwirte
          </Button>
        </>
      )}
    </>
  );
};

export default SystemDetail;
