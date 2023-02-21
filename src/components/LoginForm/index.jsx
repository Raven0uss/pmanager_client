import { Button, Input } from "antd";
import React from "react";
import axios from "axios";

export const login = async ({ username, password }) => {
  const response = await axios.post("http://localhost:8080/api/auth/login", {
    username,
    password,
  });
  return response;
};

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      setToken(response.data.token);
    } catch (err) {
      // Here manage the login error
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 30,
      }}
    >
      <div>Username</div>
      <Input
        type={"text"}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "50%",
          marginTop: 5,
          marginBottom: 10,
        }}
        placeholder="Type your username"
      />
      <div>Password</div>
      <Input.Password
        type={"password"}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "50%",
          marginTop: 5,
          marginBottom: 5,
        }}
        placeholder="Type your password"
      />
      <Button
        type={"primary"}
        size={"large"}
        onClick={handle}
        style={{
          width: "33%",
          marginTop: 30,
          marginBottom: 5,
        }}
        disabled={!username || !password}
      >
        Log in !
      </Button>
    </div>
  );
};

export default LoginForm;
