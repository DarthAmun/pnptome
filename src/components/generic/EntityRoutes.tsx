import { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, Switch } from "react-router";
import { RootState } from "../../database/Store";
import { SystemEntity } from "../../database/SystemReducer";

const Group = lazy(() => import("../pages/Group"));
const Options = lazy(() => import("../pages/Options"));
const Systems = lazy(() => import("../pages/Systems"));
const SystemDetail = lazy(() => import("../pages/SystemDetail"));

const ToEntity = lazy(() => import("./details/ToEntity"));
const EntityOverview = lazy(() => import("./EntityOverview"));
const EntityBuilder = lazy(() => import("./details/EntityBuilder"));

export type TParams = { name?: string };

const EntityRoutes = () => {
  const system = useSelector((state: RootState) => state.system);

  const makeRoutes = () => {
    let routes: JSX.Element[] = [];
    if (system) {
      routes.push(<Route key={"empty"} exact path="/" component={Systems} />);
      routes.push(
        <Route key={"group"} exact path="/group" component={Group} />
      );
      routes.push(
        <Route key={"options"} exact path="/options" component={Options} />
      );
      routes.push(
        <Route key={"systems"} exact path="/systems" component={Systems} />
      );
      routes.push(
        <Route
          key={"systemsdetail"}
          exact
          path="/system-detail/:id"
          component={SystemDetail}
        />
      );
      system.entities.forEach((entity: SystemEntity, index: number) => {
        routes.push(
          <Route
            key={index + "detailname"}
            path={`/${entity.entityName}-detail/:name`}
            component={(match: RouteComponentProps<TParams>) => (
              <ToEntity entityName={entity.entityName} match={match} />
            )}
          />
        );
        routes.push(
          <Route
            key={index + "detailid"}
            path={`/${entity.entityName}-detail/:id`}
            component={(match: RouteComponentProps<TParams>) => (
              <ToEntity entityName={entity.entityName} match={match} />
            )}
          />
        );
        routes.push(
          <Route
            key={index + "detailbuilder"}
            path={`/${entity.entityName}-builder`}
            component={() => <EntityBuilder entityName={entity.entityName} />}
          />
        );
        routes.push(
          <Route
            key={index + "detailoverview"}
            path={`/${entity.entityName}-overview`}
            component={() => <EntityOverview entityName={entity.entityName} />}
          />
        );
      });
    }
    return routes;
  };

  return <Switch>{makeRoutes()}</Switch>;
};

export default EntityRoutes;
