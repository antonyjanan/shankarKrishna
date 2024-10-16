import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/LoginPage.css";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  // useEffect(() => {
  //   // localStorage.removeItem("authenticated");
  //   setAuthenticated(false);
  // }, [setAuthenticated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let requestBody = {
      email: username,
      password: password,
    };
    axios({
      url: "https://lunarsenterprises.com:6011/builderss/admin/login",
      method: "post",
      data: requestBody,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((data) => {
      if (data.data.result === true) {
        setAuthenticated(true);
        localStorage.setItem("AUTH_TOKEN", data.data.user_token);
        localStorage.setItem("authenticated", "true");
        navigate("/dashboard");
        console.log("worked");
      } else {
        console.log("not working");
      }
    });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>
        <div className="input-field">
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            className="input"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Login
        </button>
        <p
          className="forgot-password"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
