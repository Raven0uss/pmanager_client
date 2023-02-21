import React, { useEffect } from "react";
import axios from "axios";
import useToken, { clearToken } from "../hooks/useToken";
import { get } from "lodash";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Loading from "../navigation/Loading";

const Login = () => {
  const location = useLocation();
  const [loading, setLoading] = React.useState(true);
  const [tabIndex, setTabIndex] = React.useState(
    get(location, "state.tabIndex", 0)
  );

  const { token, setToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios
          .post("http://localhost:8080/api/auth/verify-token", {
            token,
          })
          .catch(() => {
            clearToken();
          });
        if (get(response, "data.userId")) {
          navigate("/apps");
        }
        setLoading(false);
      } catch (err) {}
    })();
  }, [navigate, token]);

  if (loading) {
    return <Loading />;
  }
  if (!token)
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            maxWidth: 620,
            minWidth: 320,
            marginTop: 40,
            border: "solid 2px #F3F3F3",
            borderRadius: 10,
            boxShadow: "3px 3px 5px 1px #F3F3F3",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                flex: "40%",
                textAlign: "center",
                padding: 8,
                cursor: "pointer",
                backgroundColor: tabIndex === 0 ? "#FFF" : "#F3F3F3",
                borderBottom: tabIndex !== 0 ? "solid 1px #f0f0f0" : "",
                color: tabIndex !== 0 ? "#b9b9b9" : "",
                borderTopLeftRadius: 10,
                fontWeight: tabIndex === 0 ? "bold" : "normal",
              }}
              onClick={() => setTabIndex(0)}
            >
              Login
            </div>
            <div
              style={{
                flex: "40%",
                textAlign: "center",
                padding: 8,
                cursor: "pointer",
                backgroundColor: tabIndex === 1 ? "#FFF" : "#F3F3F3",
                borderBottom: tabIndex !== 1 ? "solid 1px #f0f0f0" : "",
                color: tabIndex !== 1 ? "#b9b9b9" : "",
                borderTopRightRadius: 10,
                fontWeight: tabIndex === 1 ? "bold" : "normal",
              }}
              onClick={() => setTabIndex(1)}
            >
              Sign Up
            </div>
          </div>
          {tabIndex === 0 && <LoginForm setToken={setToken} />}
          {tabIndex === 1 && <RegisterForm setToken={setToken} />}
        </div>
      </div>
    );
};

export default Login;
