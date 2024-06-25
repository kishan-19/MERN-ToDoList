import React, { useState } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Singup = () => {
  const [user, setuser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  })
  const [passwordIcone, setPasswordIcone] = useState({
    icone: true,
    value: false,
  });
  const { tokenStoreInLs, setProgress } = useAuth();
  const navigate = useNavigate();

  const handlerInput = (e) => {
    const { name, value } = e.target;

    setuser({
      ...user,
      [name]: value,
    });
    setPasswordIcone({
      icone: true,
      value: true
    })
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.cpassword) {
      toast.error("password does not match");
    } else {
      try {
        setProgress(15);
        const response = await fetch("http://localhost:4000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        setProgress(75);
        if (response.ok) {
          const responseData = await response.json();
          toast.success(responseData.msg);
          setuser({
            username: "",
            phone: "",
            email: "",
            password: "",
          })
          setProgress(100);
          tokenStoreInLs(responseData.token)
          navigate('/');
        } else {
          const responseData = await response.json();
          setProgress(100);
          toast.error(responseData.msg || responseData.extraDetails);
        }
      } catch (e) {
        console.error("Error", e);
      }
    }
  }

  const showPassword = () => {
    var password = document.getElementById("exampleInputcPassword1");
    if (password.type === "password") {
      password.type = "text";
      setPasswordIcone({
        icone: false,
        value: true
      });
    } else {
      password.type = "password";
      setPasswordIcone({
        icone: true,
        value: true
      });
    }
  }
  return (
    <div className="main_div">
      <h2 className="mb-4">Signup Form</h2>
      <form className="singup_form" onSubmit={handlerSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputUsername" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            name="username"
            aria-describedby="usrnameHelp"
            value={user.username}
            required
            onChange={handlerInput}
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            value={user.email}
            required
            onChange={handlerInput}
            placeholder="EX:abc@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPhone" className="form-label">
            Phone Number
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPhone"
            name="phone"
            aria-describedby="emailHelp"
            value={user.phone}
            required
            onChange={handlerInput}
            minLength="10"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-3 password_input">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            id="exampleInputPassword1"
            value={user.password}
            required
            onChange={handlerInput}
            placeholder="Enter your password"
          />

        </div>
        <div className="mb-3 password_input">
          <label htmlFor="exampleInputcPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="cpassword"
            id="exampleInputcPassword1"
            value={user.cpassword}
            required
            onChange={handlerInput}
            placeholder="ReEnter your Password"
          />
          {passwordIcone.icone ?
            <i className={`fa-regular fa-eye password_show ${passwordIcone.value ? "" : 'd-none'}`} onClick={showPassword}></i>
            :
            <i className={`fa-regular fa-eye-slash password_show ${passwordIcone.value ? "" : 'd-none'}`} onClick={showPassword}></i>
          }
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
          Singup me
        </button>
      </form>
    </div>
  );
};

export default Singup;
