import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/login/login";
import Register from "./page/register/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
