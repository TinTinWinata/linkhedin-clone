import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Loading } from "./component/Loading/loading";
import { useLoading } from "./hooks/loadingContext";
import UserAuthProvider from "./hooks/userContext";
import MiddlewareRoutes from "./middleware/middlewareRoutes";
import Home from "./page/home/home";
import "react-toastify/dist/ReactToastify.css";
import Login from "./page/login/login";
import Register from "./page/register/register";

function App() {
  const { loading } = useLoading();

  return (
    <BrowserRouter>
      <ToastContainer></ToastContainer>
      <UserAuthProvider>
        {loading ? <Loading></Loading> : ""}
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/*" element={<MiddlewareRoutes />}></Route>
        </Routes>
      </UserAuthProvider>
    </BrowserRouter>
  );
}

export default App;
