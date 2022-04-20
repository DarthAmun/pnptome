import { Suspense, useEffect } from "react";
import { MyThemeProvider as ThemeProvider } from "./components/theme/MyThemeProvider";
import { HashRouter } from "react-router-dom";
import { CustomProvider, Loader } from "rsuite";
import AppWrapper from "./components/general/AppWrapper";
import EntityRoutes from "./components/generic/EntityRoutes";

import { Provider } from "react-redux";
import Store from "./database/Store";
import { PnPTomeDB } from "./database/PnPTomeDB";

const App = () => {
  const db = new PnPTomeDB();
  db.open().catch(function (e) {
    console.error("Open failed: " + e);
  });
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