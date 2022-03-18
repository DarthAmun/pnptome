import { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, RouteComponentProps, Switch } from "react-router";
import { RootState } from "../../database/Store";
import { SystemEntity } from "../../database/SystemReducer";

const Home = lazy(() => import("../pages/Home"));
const Group = lazy(() => import("../pages/Group"));
const Options = lazy(() => import("../pages/Options"));

const ToEntity = lazy(() => import("./details/ToEntity"));
const EntityOverview = lazy(() => import("./EntityOverview"));
const EntityBuilder = lazy(() => import("./details/EntityBuilder"));

export type TParams = { name?: string };

const EntityRoutes = () => {
  const system = useSelector((state: RootState) => state.system);

  const makeRoutes = () => {
    let routes: JSX.Element[] = [];
    if (system) {
      routes.push(<Route exact path="/" component={Home} />);
      routes.push(<Route exact path="/home" component={Home} />);
      routes.push(<Route exact path="/group" component={Group} />);
      routes.push(<Route exact path="/options" component={Options} />);
      system.entities.forEach((entity: SystemEntity) => {
        routes.push(
          <Route
            path={`/${entity.entityName}-detail/:name`}
            component={(match: RouteComponentProps<TParams>) => (
              <ToEntity entityName={entity.entityName} match={match} />
            )}
          />
        );
        routes.push(
          <Route
            path={`/${entity.entityName}-detail/:id`}
            component={(match: RouteComponentProps<TParams>) => (
              <ToEntity entityName={entity.entityName} match={match} />
            )}
          />
        );
        routes.push(
          <Route
            path={`/${entity.entityName}-builder`}
            component={() => <EntityBuilder entityName={entity.entityName} />}
          />
        );
        routes.push(
          <Route
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
