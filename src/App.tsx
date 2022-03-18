import { lazy, Suspense, useEffect } from "react";
import { MyThemeProvider as ThemeProvider } from "./components/theme/MyThemeProvider";
import { HashRouter } from "react-router-dom";
import { CustomProvider, Loader } from "rsuite";
import AppWrapper from "./components/general/AppWrapper";
import Spell from "./data/Spell";
import Gear from "./data/Gear";
import EntityRoutes from "./components/generic/EntityRoutes";

import { Provider } from "react-redux";
import Store from "./database/Store";

const Home = lazy(() => import("./components/pages/Home"));
const Group = lazy(() => import("./components/pages/Group"));
const Options = lazy(() => import("./components/pages/Options"));

const App = () => {
  return (
    <Provider store={Store}>
      <CustomProvider theme="dark">
        <ThemeProvider>
          <HashRouter>
            <AppWrapper>
              <Suspense fallback={<Loader center content="Loading..." />}>
                <EntityRoutes />
              </Suspense>
            </AppWrapper>
          </HashRouter>
        </ThemeProvider>
      </CustomProvider>
    </Provider>
  );
};

export default App;
