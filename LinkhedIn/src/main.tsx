import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import LoadingContextProvider from "./hooks/loadingContext";
import ThemeProvider from "./hooks/themeContext";
import UserAuthProvider from "./hooks/userContext";
import "./style.scss";



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

    <LoadingContextProvider>
      <UserAuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </UserAuthProvider>
    </LoadingContextProvider>

);
