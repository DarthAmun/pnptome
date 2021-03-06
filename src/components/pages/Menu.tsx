import { useNavigate } from "react-router";
import Card, { Cards } from "../general/Card";
import { useSelector } from "react-redux";
import { RootState } from "../../database/Store";
import { SystemEntity } from "../../database/SystemReducer";
import { findIcon } from "../../services/IconService";
import { firstToUpper } from "../../services/TextService";

interface $MenuProps {
  show: (val: boolean) => void;
}

const Menu = ({ show }: $MenuProps) => {
  let history = useNavigate();
  const system = useSelector((state: RootState) => state.system);

  const move = (destination: string) => {
    history(destination);
    show(false);
  };

  return (
    <Cards>
      {system.entities
        .filter((entity: SystemEntity) => entity.isMainEntity)
        .map((entity: SystemEntity, index: number) => {
          return (
            <Card
              key={index}
              onClick={() => move(`/${entity.entityName}-overview`)}
            >
              {findIcon(entity.icon)} {firstToUpper(entity.entityName)}
            </Card>
          );
        })}
    </Cards>
  );
};

export default Menu;
