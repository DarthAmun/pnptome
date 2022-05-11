import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Panel, Notification, toaster } from "rsuite";
import styled from "styled-components";
import { setSystem, System } from "../../database/SystemReducer";
import {
  createNewWithId,
  reciveAllFromTable,
} from "../../services/DatabaseService";
import DeafultSystem from "../../System.json";
import Logo from "../../logo512.png";
import { useDispatch } from "react-redux";
import { generateSystem } from "../../services/SystemService";

function Systems() {
  let history = useNavigate();
  const [systems, changeSystems] = useState<System[]>([]);
  const dispatch = useDispatch();

  const [newSystem, setNewSystem] = useState<string>(
    JSON.stringify(DeafultSystem, null, 2)
  );
  const [newSystemDialog, showNewSystem] = useState<boolean>(false);

  useEffect(() => {
    reciveAllFromTable("PnPTomeDB", "systems", (entries: any[]) => {
      console.log(entries);
      changeSystems(entries);
    });
  }, []);

  const create = () => {
    let newEntity = { ...JSON.parse(newSystem) };
    delete newEntity.id;
    showNewSystem(false);
    createNewWithId("PnPTomeDB", "systems", newEntity, (id: number) => {
      generateSystem(newEntity);
      toaster.push(
        <Notification header={"Success"} type="success">
          Success: Created new system named {newEntity.name}.
        </Notification>,
        { placement: "bottomStart" }
      );
    });
  };

  const loadSystem = (system: System) => {
    localStorage.setItem('system', JSON.stringify(system));
    dispatch(setSystem(system));
  };

  const editSystem = (system: System) => {
    history({
      pathname: `/system-detail/${system.id}`,
    });
  };

  return (
    <>
      {!newSystemDialog && (
        <CardGroup>
          <Panel
            shaded
            bordered
            bodyFill
            style={{ display: "inline-block", width: 240 }}
          >
            <img src={Logo} height="240" />
            <Panel header="Make a new System">
              <Button onClick={(e) => showNewSystem(true)}>New System</Button>
            </Panel>
          </Panel>
          {systems.map((system: System, index: number) => {
            return (
              <Panel
                key={index}
                shaded
                bordered
                bodyFill
                style={{ display: "inline-block", width: 240 }}
              >
                <img src={system.pic} height="240" />
                <StyledPanel header={system.name + " - v" + system.version}>
                  <Button
                    onClick={(e) => loadSystem(system)}
                    style={{ marginRight: "10px" }}
                  >
                    Load
                  </Button>
                  <Button onClick={(e) => editSystem(system)}>
                    View / Edit
                  </Button>
                </StyledPanel>
              </Panel>
            );
          })}
        </CardGroup>
      )}
      {newSystemDialog && (
        <>
          <Input
            as="textarea"
            rows={3}
            placeholder="Textarea"
            value={newSystem}
            onChange={(val: any) => setNewSystem(val)}
          />
          <Button onClick={(e) => create()} style={{ marginRight: "10px" }}>
            Save
          </Button>
          <Button onClick={(e) => showNewSystem(false)}>Back</Button>
        </>
      )}
    </>
  );
}

export default Systems;

const CardGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledPanel = styled(Panel)`
  background-color: ${({ theme }) => theme.secondColor};
  color: ${({ theme }) => theme.textColor};
`;
