import React, { useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const { tokenStoreInLs ,setProgress } = useAuth();
  const navigate = useNavigate();

  const handelrInput = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    })
  };

  const handelrSubmit = async (e) => {
    e.preventDefault();
    try {
      setProgress(10);
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      setProgress(60);
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        tokenStoreInLs(responseData.token);
        setProgress(100);
        navigate('/');
      }else{
        const responseData = await response.json();
        setProgress(100);
        toast.warn(responseData.message || responseData.extraDetails);
      }
    } catch (e) {
      console.error("Error", e);
    }
  };
  return (
    <>
      <div className="main_div">
        <h2 className="mb-4">Login Form</h2>
        <form className="singup_form" onSubmit={handelrSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handelrInput}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your Email Address"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handelrInput}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  )
};

export default Login;