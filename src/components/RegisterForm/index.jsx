import { Button, Input } from "antd";
import React from "react";
import axios from "axios";
import { login } from "../LoginForm";

const register = async ({ username, password }) => {
  const response = await axios.post("http://localhost:8080/api/auth/register", {
    username,
    password,
  });
  return response;
};

const checkConfirmPasswordStatus = ({ password, confirmPassword }) =>
  password !== confirmPassword ? "warning" : "";

const RegisterForm = ({ setToken }) => {
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();

  const handle = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ username, password });
      if (response.status === 201) {
        const loginResponse = await login({ username, password });
        setToken(loginResponse.data.token);
      }
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
        placeholder="Choose a username"
      />
      <div>Password</div>
      <Input
        type={"password"}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "50%",
          marginTop: 5,
          marginBottom: 10,
        }}
        placeholder="Choose a password"
      />
      <div>Confirm Password</div>
      <Input
        type={"password"}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{
          width: "50%",
          marginTop: 5,
          marginBottom: 5,
        }}
        placeholder="Confirm your password"
        status={checkConfirmPasswordStatus({ password, confirmPassword })}
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
        disabled={!username || !password || !confirmPassword}
      >
        Register now :)
      </Button>
    </div>
  );
};

export default RegisterForm;
