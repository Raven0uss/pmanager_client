import React from "react";
import withNotificationContext from "../../hoc/withNotification";
import { get } from "lodash";
import { loginAPI } from "../../api/auth";
import {
  LoginButton,
  LoginFormContainer,
  PasswordInput,
  UsernameInput,
} from "./LoginForm.styled";

const LoginForm = ({ setToken, openNotification }) => {
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  const handleConnect = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginAPI({ username, password }).catch((err) => {
        throw get(err, "response.data", err.message);
      });
      openNotification({
        type: "success",
        message: "Connected !",
        description: `Good to see you ${username}. 😀`,
      });
      setToken(response.data.token);
    } catch (err) {
      openNotification({
        type: "error",
        message: "An error occurred 🤕",
        description: err,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginFormContainer
      onKeyDown={(e) =>
        e.key === "Enter" && username && password && handleConnect(e)
      }
    >
      <label htmlFor="login-username">Username</label>
      <UsernameInput
        type={"text"}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Type your username"
        id="login-username"
      />
      <label htmlFor="login-password">Password</label>
      <PasswordInput
        type={"password"}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Type your password"
        id="login-password"
      />
      <LoginButton
        type={"primary"}
        size={"large"}
        onClick={handleConnect}
        disabled={!username || !password}
        loading={loading}
      >
        Log in !
      </LoginButton>
    </LoginFormContainer>
  );
};

export default withNotificationContext(LoginForm);
