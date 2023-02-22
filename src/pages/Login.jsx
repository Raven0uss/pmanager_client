import React, { useEffect } from "react";
import useToken, { clearToken } from "../hooks/useToken";
import { get } from "lodash";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import Loading from "../navigation/Loading";
import { validityTokenAPI } from "../api/auth";
import {
  AuthenticationBox,
  AuthenticationTabLogin,
  AuthenticationTabRegister,
  AuthenticationTabs,
  LoginContainer,
} from "./Login.styled";

const Login = () => {
  const location = useLocation();
  const [loading, setLoading] = React.useState(true);
  // Get location param to check if the user clicked on Sign Up insteat of Login
  const [tabIndex, setTabIndex] = React.useState(
    get(location, "state.tabIndex", 0)
  );

  const { token, setToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await validityTokenAPI({ token });
        // If user is valid, redirect to the apps page instantly
        if (get(response, "data.userId")) navigate("/apps");
      } catch (err) {
        // Invalid token is destroy
        clearToken();
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate, token]);

  if (loading) {
    return <Loading />;
  }
  // If there is a token (valid) user can't see the block
  if (!token)
    return (
      <LoginContainer>
        <AuthenticationBox>
          <AuthenticationTabs>
            <AuthenticationTabLogin
              onClick={() => setTabIndex(0)}
              tabIndex={tabIndex}
            >
              Login
            </AuthenticationTabLogin>
            <AuthenticationTabRegister
              onClick={() => setTabIndex(1)}
              tabIndex={tabIndex}
            >
              Sign Up
            </AuthenticationTabRegister>
          </AuthenticationTabs>
          {tabIndex === 0 && <LoginForm setToken={setToken} />}
          {tabIndex === 1 && <RegisterForm setToken={setToken} />}
        </AuthenticationBox>
      </LoginContainer>
    );
  // To generate a render by functional component just in case
  // but seems unreachable
  return null;
};

export default Login;
