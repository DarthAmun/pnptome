import { PropsWithChildren, Suspense } from "react";
import { HashRouter } from "react-router-dom";
import { CustomProvider, Loader } from "rsuite";
import AppWrapper from "./components/general/AppWrapper";
import EntityRoutes from "./components/generic/EntityRoutes";

import { Provider, useSelector } from "react-redux";
import Store, { RootState } from "./database/Store";
import { PnPTomeDB } from "./database/PnPTomeDB";
import { ThemeProvider } from "styled-components";
import Theme, { darkTheme } from "./components/theme/Theme";

const Content = () => {
  const theme = useSelector((state: RootState) => state.theme);
  const ThemeProviderFixed = ThemeProvider as unknown as React.FC<
    PropsWithChildren<{ theme: Theme }>
  >;

  const isDarkTheme: boolean =
    JSON.stringify(theme) === JSON.stringify(darkTheme);

  return (
    <CustomProvider theme={isDarkTheme ? "dark" : "light"}>
      <ThemeProviderFixed theme={theme}>
        <HashRouter>
          <AppWrapper>
            <Suspense fallback={<Loader center content="Loading..." />}>
              <EntityRoutes />
            </Suspense>
          </AppWrapper>
        </HashRouter>
      </ThemeProviderFixed>
    </CustomProvider>
  );
};

const App = () => {
  const db = new PnPTomeDB();
  db.open().catch(function (e) {
    console.error("Open failed: " + e);
  });

  return (
    <Provider store={Store}>
      <Content></Content>
    </Provider>
  );
};

export default App;
