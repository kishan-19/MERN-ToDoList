import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/Auth";

const Navbar = () => {
  const location = useLocation();
  const { logoutUser ,user} = useAuth();
  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between my-2">
        <div>
          <h5 className="navbar_heading">TodoList</h5>
        </div>
        <div className="d-flex justify-content align-items-center">
        {location.pathname === '/' ? 
        <span><h5 className="mt-1 text-muted"><i className="fa-solid fa-user"></i> {user.username}</h5></span>
        : ""}
          <NavLink to="login">
            <button className={`btn btn-outline-info ms-2 btn_nav ${location.pathname === "/" ||location.pathname === "/admin" ? "" : "d-none"}`} onClick={logoutUser}>LOGOUT</button>
          </NavLink>

          <NavLink to="login">
            <button className={`btn btn-outline-primary btn_nav ${location.pathname === "/" ||location.pathname === "/admin" ? "d-none" : ""}`}>LOGIN</button>
          </NavLink>
          <NavLink to="singup">
            <button className={`btn btn-outline-info ms-2 btn_nav ${location.pathname === "/" ||location.pathname === "/admin" ? 'd-none' : ""}`}>SINGUP</button>
          </NavLink>

        </div>
      </div>
    </div>
  );
};

export default Navbar;
