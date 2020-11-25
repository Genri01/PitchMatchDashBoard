import React from "react";
import { InMemoryCache } from "@apollo/client/cache/inmemory/inMemoryCache";
import { ApolloClient } from "@apollo/client/core/ApolloClient";
import { createUploadLink } from "apollo-upload-client";

import { ApolloProvider } from "@apollo/client/react/context/ApolloProvider";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";

import { AppRoutes } from "./routes";
import { UserContextProvider } from "./contexts";

import "leaflet/dist/leaflet.css";

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
  return (
    <div className="App">
      <ApolloProvider client={client as any}>
        <ApolloHooksProvider client={client}>
          <UserContextProvider>
            <AppRoutes />
          </UserContextProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
