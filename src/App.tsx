import React from "react";
import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache";
import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { createUploadLink } from "apollo-upload-client";

import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";

import { AppRoutes } from "./routes";
import { GamesContextProvider, UserContextProvider } from "./contexts";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { ruRU, enUS } from "@material-ui/core/locale";
import { useTranslation } from "react-i18next";
import { FieldsContextProvider } from "./contexts/FieldsContext";

const link = createUploadLink({
  uri: process.env.REACT_APP_ENDPOINT,
  credentials: "include",
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
  credentials: "include",
});

function App() {
  const { i18n } = useTranslation();
  const theme = createMuiTheme(
    {
      palette: {
        primary: { main: "#1976d2" },
      },
    },
    i18n.language == "ru" ? ruRU : enUS
  );

  return (
    <div className="App">
      <ApolloProvider client={client as any}>
        <ApolloHooksProvider client={client}>
          <UserContextProvider>
            <GamesContextProvider>
              <FieldsContextProvider>
                <ThemeProvider theme={theme}>
                  <AppRoutes />
                </ThemeProvider>
              </FieldsContextProvider>
            </GamesContextProvider>
          </UserContextProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
