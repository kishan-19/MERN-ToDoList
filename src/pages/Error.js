import React from "react";
import ErrorPage from "../image/errorPage.jpg";
import { NavLink } from "react-router-dom";
const Error = ()=>{
    return(
        <div className="container ">
            <div class="d-flex justify-content-center align-items-center Error">
               <NavLink to="/"><img src={ErrorPage} alt="not Found"/></NavLink>
            </div>
        </div>
    )
}

export default Error;