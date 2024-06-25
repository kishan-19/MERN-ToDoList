import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Navbar = () => {
  const location = useLocation();
  const { logoutUser } = useAuth();
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between my-2">
        <div>
          <h5 className="navbar_heading">TodoList</h5>
        </div>
        <div>
          <NavLink to="login">
            <button className={`btn btn-outline-info ms-2 btn_nav ${location.pathname === "/" ? "" : "d-none"}`} onClick={logoutUser}>LOGOUT</button>
          </NavLink>

          <NavLink to="login">
            <button className={`btn btn-outline-primary btn_nav ${location.pathname === "/" ? "d-none" : ""}`}>LOGIN</button>
          </NavLink>
          <NavLink to="singup">
            <button className={`btn btn-outline-info ms-2 btn_nav ${location.pathname === "/" ? 'd-none' : ""}`}>SINGUP</button>
          </NavLink>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
