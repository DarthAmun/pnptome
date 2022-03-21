import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDBName } from "../../database/SystemReducer";
import {
  recivePromiseByAttribute,
  recivePromiseByMultiAttribute,
} from "../../services/DatabaseService";

interface $Props {
  entityName: string;
  name: string;
  sources: string;
}

const EntityTile = ({ entityName, name, sources }: $Props) => {
  const [entity, setEntity] = useState<any>();
  const systemDbName = useSelector(selectDBName);

  const findEntity = async () => {
    let newEntity: any = undefined;
    if (sources !== undefined) {
      newEntity = await recivePromiseByMultiAttribute(
        systemDbName,
        entityName + "s",
        {
          name: name,
          sources: sources,
        }
      );
    } else {
      newEntity = await recivePromiseByAttribute(
        systemDbName,
        entityName + "s",
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
    switch (entityName) {
      //   case "spell":
      //     return <SpellTile entity={entity} />;
      //   case "item":
      //     return <GiCrystalWand />;
      // case "gear":
      //   return <GearTile entity={entity} />;
      //   case "race":
      //   case "subrace":
      //     return <GiWomanElfFace />;
      //   case "class":
      //   case "subclass":
      //   case "classe":
      //   case "subclasse":
      //     return <GiPlagueDoctorProfile />;
      //   case "selection":
      //     return <BiSelectMultiple />;
      //   case "char":
      //     return <FaIdCard />;
      //   case "monster":
      //     return <FaDragon />;
      //   case "encounter":
      //     return <GiSwordClash />;
      //   case "campaign":
      //     return <GiBookmarklet />;
      //   case "quest":
      //     return <GiStabbedNote />;
      //   case "note":
      //     return <GiScrollUnfurled />;
      //   case "event":
      //     return <MdEvent />;
      //   case "world":
      //     return <GiSolarSystem />;
      //   case "location":
      //     return <FaMapMarkedAlt />;
      //   case "npc":
      //     return <GiDjinn />;
      //   case "randomTable":
      //     return <FaTable />;
      //   case "book":
      //     return <GiBookshelf />;
      //   case "group":
      //     return <HiUserGroup />;
      //   case "feat":
      //     return <GiBindle />;
      //   case "background":
      //     return <GiSherlockHolmes />;
      default:
        return <></>;
    }
  return <></>;
};

export default EntityTile;
