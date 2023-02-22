import { Button, Input } from "antd";
import React from "react";
import { loginAPI, registerAPI } from "../../api/auth";
import withNotificationContext from "../../hoc/withNotification";
import { get } from "lodash";

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
      <Input.Password
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
      <Input.Password
        type={"password"}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{
          width: "50%",
          marginTop: 5,
          marginBottom: 0,
        }}
        placeholder="Confirm your password"
        status={checkConfirmPasswordStatus({ password, confirmPassword })}
      />
      {checkConfirmPasswordStatus({ password, confirmPassword }) && (
        <div style={{ fontSize: 12, fontWeight: "bold", color: "#FAAD14" }}>
          Confirm password is not matching
        </div>
      )}
      <Button
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
        }
        loading={loading}
      >
        Register now 💪
      </Button>
    </div>
  );
};

export default withNotificationContext(RegisterForm);
