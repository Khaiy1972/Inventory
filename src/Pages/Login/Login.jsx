import React, { useState, useEffect } from "react";
import { login } from "../../service/auth";
import { useNavigate } from "react-router-dom";

import phone from "../../assets/Images/phone.png";

import style from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ username, password });
      console.log("Login Success", response);
      alert("Login successful", response);
      navigate("/dashboard");
    } catch (error) {
      setError("Login failed");
      console.log("Login Failed", error);
    }
  };

  return (
    <div className={style.container}>
      <form className={style.form} onSubmit={handleLogin}>
        <h1>Log In</h1>
        {error && <h2>{error}</h2>}
        <label className={style.label}>Email</label>
        <input
          className={style.input}
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className={style.label}>Password</label>
        <input
          className={style.input}
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={style.button} type="submit">
          Log In
        </button>
      </form>

      <img className={style.img} src={phone} alt="" />
    </div>
  );
}

export default Login;
