import { useEffect, useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Notification, toaster } from "rsuite";
import { createNewWithId } from "../../../services/DatabaseService";
import { TopBar } from "./EntityDetailWrapper";
import BreadCrumbIcon from "../../general/BreadCrumbIcon";
import EntityDetails from "./EntityDetails";
import IEntity from "../../../data/IEntity";
import { useSelector } from "react-redux";
import { selectDBName } from "../../../database/SystemReducer";
import { RootState } from "../../../database/Store";
import {
  getEntityAttributes,
  getEntityDetailConfig,
} from "../../../services/SystemService";

interface $BuilderProps {
  entityName: string;
}

const EntityBuilder = ({ entityName }: $BuilderProps) => {
  let history = useNavigate();
  const systemDbName = useSelector(selectDBName);
  const system = useSelector((state: RootState) => state.system);
  const [entityObj, onEdit] = useState<IEntity>();

  useEffect(() => {
    let newObj: string = "{";
    getEntityAttributes(system, entityName).forEach((attr: string) => {
      newObj += `"${attr}": "",`;
    });
    newObj = newObj.slice(0, -1) + "}";
    console.log(newObj);
    onEdit(JSON.parse(newObj));
  }, [entityName, system]);

  const create = () => {
    if (entityObj) {
      let newEntity = { ...entityObj };
      delete newEntity.id;
      createNewWithId(systemDbName, entityName, newEntity, (id: number) => {
        history(`/${entityName}-detail/${id}`);

        toaster.push(
          <Notification header={"Success"} type="success">
            Success: Created new {entityName} named {newEntity.name}.
          </Notification>,
          { placement: "bottomStart" }
        );
      });
    }
  };

  return (
    <>
      <TopBar>
        <BreadCrumbIcon />
        <ButtonGroup>
          <Button onClick={() => history(-1)} size="lg">
            <FaArrowLeft />
          </Button>
          <Button onClick={() => create()} size="lg">
            <FaSave />
          </Button>
        </ButtonGroup>
      </TopBar>
      {entityObj && (
        <EntityDetails
          configs={Object.getOwnPropertyNames(
            getEntityDetailConfig(system, entityName)
          )}
          entity={entityObj}
          entityName={entityName}
          onEdit={onEdit}
          isNew={true}
        />
      )}
    </>
  );
};

export default EntityBuilder;
