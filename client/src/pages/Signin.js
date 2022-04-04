import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import { useNavigate } from "react-router";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  Axios.defaults.withCredentials = true;
  let history = useNavigate();

  const login = () => {
    Axios.post(`/signin`, {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        console.log(response.data.message);
      } else {
        history.push(`/Homepage`);
      }
    });
    // history(`/Homepage`);

  };
  return (
    <div className="App">
      <div className="login">
        <h1>Login </h1>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div>
          <button onClick={login}> Login </button>
          <button
            onClick={() => {
              history("/Signup");
            }}
          >
            {" "}
            Signup{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
