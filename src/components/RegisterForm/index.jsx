import React from "react";
import { loginAPI, registerAPI } from "../../api/auth";
import withNotificationContext from "../../hoc/withNotification";
import { get } from "lodash";
import {
  PasswordInput,
  RegisterButton,
  RegisterFormContainer,
  UsernameInput,
} from "./RegisterForm.styled";

const RegisterForm = ({ setToken, openNotification }) => {
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await registerAPI({ username, password })
        .then((response) => response)
        .catch((err) => {
          throw get(err, "response.data", err.message);
        });
      if (response.status === 201) {
        loginAPI({ username, password })
          .then((loginResponse) => {
            setToken(loginResponse.data.token);
            openNotification({
              type: "success",
              message: `Welcome ${username} ! 😃`,
              description: "",
            });
          })
          .catch((err) => {
            throw get(err, "response.data", err.message);
          });
      }
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
    <RegisterFormContainer>
      <label htmlFor="register-username">Username</label>
      <UsernameInput
        type={"text"}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Choose a username"
        id="register-username"
      />
      <label htmlFor="register-password">Password</label>
      <PasswordInput
        type={"password"}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Choose a password"
        id="register-password"
      />
      <RegisterButton
        type={"primary"}
        size={"large"}
        onClick={handleRegister}
        style={{
          width: "33%",
          marginTop: 30,
          marginBottom: 5,
        }}
        disabled={
          !username ||
          !password
        }
        loading={loading}
      >
        Register now 💪
      </RegisterButton>
    </RegisterFormContainer>
  );
};

export default withNotificationContext(RegisterForm);
