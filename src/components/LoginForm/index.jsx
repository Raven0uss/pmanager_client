import { Button, Input } from "antd";
import React from "react";
import withNotificationContext from "../../hoc/withNotification";
import { get } from "lodash";
import { loginAPI } from "../../api/auth";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 30,
      }}
      onKeyDown={(e) =>
        e.key === "Enter" && username && password && handleConnect(e)
      }
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
        onClick={handleConnect}
        style={{
          width: "33%",
          marginTop: 30,
          marginBottom: 5,
        }}
        disabled={!username || !password}
        loading={loading}
      >
        Log in !
      </Button>
    </div>
  );
};

export default withNotificationContext(LoginForm);
