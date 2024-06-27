import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./componets/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import Admin from "./pages/Admin.js";
import { useAuth } from "./context/Auth.js";
import Error from "./pages/Error.js";
import TopLoadingBar from "./componets/TopLoadingBar.js";

function App() {
  const {user} = useAuth();
  return (
    <>
      {/* <Auth> */}
        <BrowserRouter>
          <Navbar/>
          <TopLoadingBar/>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/singup" element={<Singup />} />

             <Route path="/admin" element={user.isAdmin ? <Admin /> : <Home/>} />
            {/* <Route path="/admin" element={<Admin />} /> */}
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      {/* </Auth> */}
    </>
  );
}

export default App;
