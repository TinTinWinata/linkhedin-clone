import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import LoadingContextProvider from "./hooks/loadingContext";

const url = process.env.REACT_APP_MAIN_API + "/query";

const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <LoadingContextProvider>
      <App />
    </LoadingContextProvider>
  </ApolloProvider>
);
