import { useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { Button, ButtonGroup, Notification, toaster } from "rsuite";
import { createNewWithId } from "../../../services/DatabaseService";
import { TopBar } from "./EntityDetailWrapper";
import BreadCrumbIcon from "../../general/BreadCrumbIcon";
import EntityDetails from "./EntityDetails";
import IEntity from "../../../data/IEntity";
import { useSelector } from "react-redux";
import { selectDBName } from "../../../database/SystemReducer";

interface $BuilderProps {
  entityName: string;
}

const EntityBuilder = ({ entityName }: $BuilderProps) => {
  let history = useHistory();
  const systemDbName = useSelector(selectDBName);
  const [entityObj, onEdit] = useState<IEntity>(new IEntity());

  const create = () => {
    let newEntity = { ...entityObj };
    delete newEntity.id;
    createNewWithId(systemDbName, entityName + "s", newEntity, (id: number) => {
      history.push(`/${entityName}-detail/${id}`);

      toaster.push(
        <Notification header={"Success"} type="success">
          Success: Created new {entityName} named {newEntity.name}.
        </Notification>,
        { placement: "bottomStart" }
      );
    });
  };

  return (
    <>
      <TopBar>
        <BreadCrumbIcon />
        <ButtonGroup>
          <Button onClick={() => history.goBack()} size="lg">
            <FaArrowLeft />
          </Button>
          <Button onClick={() => create()} size="lg">
            <FaSave />
          </Button>
        </ButtonGroup>
      </TopBar>
      <EntityDetails
        entity={entityObj}
        entityName={entityName}
        onEdit={onEdit}
        isNew={true}
      />
    </>
  );
};

export default EntityBuilder;
