import { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { RootState } from "../../database/Store";
import { SystemEntity } from "../../database/SystemReducer";

const Groups = lazy(() => import("../pages/Groups"));
const GroupDetails = lazy(() => import("./details/GroupDetails"));
const Options = lazy(() => import("../pages/Options"));
const Systems = lazy(() => import("../pages/Systems"));
const SystemDetails = lazy(() => import("./details/SystemDetails"));

const ToEntity = lazy(() => import("./details/ToEntity"));
const EntityOverview = lazy(() => import("./EntityOverview"));
const EntityBuilder = lazy(() => import("./details/EntityBuilder"));

export type TParams = { name?: string };

const EntityRoutes = () => {
  const system = useSelector((state: RootState) => state.system);

  const makeRoutes = () => {
    let routes: JSX.Element[] = [];
    if (system) {
      routes.push(<Route key={"empty"} path="/" element={<Systems />} />);
      routes.push(<Route key={"group"} path="/group" element={<Groups />} />);
      routes.push(
        <Route key={"options"} path="/options" element={<Options />} />
      );
      routes.push(
        <Route key={"systems"} path="/systems" element={<Systems />} />
      );
      routes.push(
        <Route
          key={"systemsdetail"}
          path="/system-detail/:id"
          element={<SystemDetails />}
        />
      );
      routes.push(
        <Route
          key={"groupsdetail"}
          path="/group-detail/:id"
          element={<GroupDetails />}
        />
      );
      system.entities.forEach((entity: SystemEntity, index: number) => {
        routes.push(
          <Route
            key={index + "detailname"}
            path={`/${entity.entityName}-detail/:name`}
            element={<ToEntity entityName={entity.entityName} />}
          />
        );
        routes.push(
          <Route
            key={index + "detailid"}
            path={`/${entity.entityName}-detail/:id`}
            element={<ToEntity entityName={entity.entityName} />}
          />
        );
        routes.push(
          <Route
            key={index + "detailbuilder"}
            path={`/${entity.entityName}-builder`}
            element={<EntityBuilder entityName={entity.entityName} />}
          />
        );
        routes.push(
          <Route
            key={index + "detailoverview"}
            path={`/${entity.entityName}-overview`}
            element={<EntityOverview entityName={entity.entityName} />}
          />
        );
      });
    }
    return routes;
  };

  return <Routes>{makeRoutes()}</Routes>;
};

export default EntityRoutes;
