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
  const [entity, setEntity] = useState<System>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (match !== undefined && entity === undefined) {
      const id: string | undefined = match.params.id;
      console.log(id);
      if (id)
        reciveSystem("PnPTomeDB", +id, (entity: System) => {
          setEntity(entity as System);
          setLoading(false);
        });
    }
  }, [match, entity]);

  const update = () => {
    if (entity) {
      updateSystem(entity);
      generateSystem(entity);
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
            value={JSON.stringify(entity, null, 2)}
            onChange={(val: any) => setEntity(JSON.parse(val))}
          />
          <Button onClick={(e) => update()} style={{ marginRight: "10px" }}>
            Save
          </Button>
        </>
      )}
    </>
  );
};

export default SystemDetail;
