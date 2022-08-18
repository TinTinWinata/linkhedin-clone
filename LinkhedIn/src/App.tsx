import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UserAuthProvider, { useUserAuth } from "./hooks/userContext";
import { Loading } from "./component/Loading/loading";
import Login from "./page/login/login";
import Register from "./page/register/register";
import MiddlewareRoutes from "./middleware/middlewareRoute";
import { useLoading } from "./hooks/loadingContext";
import "react-toastify/dist/ReactToastify.css";
import { Shortcut } from "./script/shortcut";
import ThemeProvider, { useTheme } from "./hooks/themeContext";
import Verification from "./page/verification/verification";
import Profile from "./page/profile/profile";

import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import Network from "./page/network/network";
import RefetchProvider from "./hooks/refetchContext";
import Forgetpassword from "./page/forget-password/forgetpassword";

function App() {
  const { loading } = useLoading();
  const { currTheme } = useTheme();
  const { user } = useUserAuth();

  const main_url = "http://localhost:8080";
  const url = main_url + "/query";

  const authLink = new ApolloLink((operation: any, forward: any) => {
    if (user && user.token !== undefined) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
    }
    return forward(operation);
  });

  const httpLink = createHttpLink({
    uri: url,
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({}),
  });

  return (
    <div className={currTheme}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ToastContainer></ToastContainer>
          <RefetchProvider>
            <Shortcut>
              {loading ? <Loading></Loading> : ""}
              <Routes>
                <Route
                  path="/verification/:id"
                  element={<Verification />}
                ></Route>

                <Route
                  path="/forget-password"
                  element={<Forgetpassword />}
                ></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/*" element={<MiddlewareRoutes />}></Route>
              </Routes>
            </Shortcut>
          </RefetchProvider>
        </ApolloProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;