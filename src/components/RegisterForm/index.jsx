import React from "react";
import { loginAPI, registerAPI } from "../../api/auth";
import withNotificationContext from "../../hoc/withNotification";
import { get } from "lodash";
import {
  ConfirmPasswordInput,
  PasswordInput,
  RegisterButton,
  RegisterFormContainer,
  UsernameInput,
  WarnBoxPasswordNotMatching,
} from "./RegisterForm.styled";

// Can be send to Input for the style
// But with empty and plain string can be interpreted as boolean by js
// (Not usable in TypeScript or strict compare type)
const checkConfirmPasswordStatus = ({ password, confirmPassword }) =>
  password !== confirmPassword ? "warning" : "";

const RegisterForm = ({ setToken, openNotification }) => {
  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();

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
      <label htmlFor="register-confirmpass">Confirm Password</label>
      <ConfirmPasswordInput
        type={"password"}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm your password"
        status={checkConfirmPasswordStatus({ password, confirmPassword })}
        id="register-confirmpass"
      />
      {checkConfirmPasswordStatus({ password, confirmPassword }) && (
        <WarnBoxPasswordNotMatching>
          Confirm password is not matching
        </WarnBoxPasswordNotMatching>
      )}
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
          !password ||
          !confirmPassword ||
          checkConfirmPasswordStatus({ password, confirmPassword })
          // Confirm password is useless in server side, so we block only on client
        }
        loading={loading}
      >
        Register now 💪
      </RegisterButton>
    </RegisterFormContainer>
  );
};

export default withNotificationContext(RegisterForm);
