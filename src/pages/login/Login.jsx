import React, { useState, useContext } from "react";
import { login } from "../../context/authContext/apiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./login.css";
// import { useHistory } from "react-router-dom";

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const { isFetching, dispatch, error } = useContext(AuthContext);
  // const history = useHistory();

  function handleChange(e) {
    setInputData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleLogin(e) {
    e.preventDefault();
    login(inputData, dispatch);
  }

  return (
    <div className="login">
      <form className="loginForm">
        <input
          type="email"
          placeholder="Email"
          className="loginInput"
          name="email"
          value={inputData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="loginInput"
          name="password"
          value={inputData.password}
          onChange={handleChange}
        />
        <button
          className="loginButton"
          onClick={handleLogin}
          disabled={isFetching}
        >
          Login
        </button>
        {error && (
          <span
            style={{ color: "red", fontWeight: "bold", paddingTop: "10px" }}
          >
            Something went wrong
          </span>
        )}
      </form>
    </div>
  );
};

export default Login;
