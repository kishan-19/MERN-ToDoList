import React, { useEffect } from "react";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import TodoList from "../componets/TodoList";

function Home() {
  const { getTokenInLS,getUserData } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!getTokenInLS()) {
      return navigate("/login");
    }else(
      getUserData()
    )
  },[]);
  return (
    <TodoList />
  );
}

export default Home;