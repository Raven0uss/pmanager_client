import React from "react";
import { useNavigate, useLocation } from "react-router";
import { clearToken } from "../../hooks/useToken";
import { Nav, NavLeft, NavLink, NavRight } from "./Navbar.styled";
import { useDispatch, useSelector } from "react-redux";
import { changeAuthValue } from "../../redux/auth/authSlice";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd";
import withNotificationContext from "../../hoc/withNotification";

const Navbar = ({ openNotification }) => {
  const isAuth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Nav>
      <NavLeft>
        <NavLink to="/" iscurrentloc={`${location.pathname === "/"}`}>
          Home
        </NavLink>
        {isAuth && (
          <NavLink to="/apps" iscurrentloc={`${location.pathname === "/apps"}`}>
            Apps
          </NavLink>
        )}
      </NavLeft>
      <NavRight>
        {isAuth ? (
          <Button
            icon={<PoweroffOutlined />}
            danger
            onClick={() => {
              clearToken();
              openNotification({
                type: "info",
                message: "Disconnected",
                description: "See you soon !",
              });
              dispatch(changeAuthValue(false));
              navigate("/login");
            }}
          >
            Log out
          </Button>
        ) : (
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        )}
      </NavRight>
    </Nav>
  );
};

export default withNotificationContext(Navbar);
