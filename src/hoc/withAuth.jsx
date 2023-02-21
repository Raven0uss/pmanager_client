import axios from "axios";
import { get } from "lodash";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { clearToken, getToken } from "../hooks/useToken";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { changeAuthValue } from "../redux/auth/authSlice";
import Loading from "../navigation/Loading";

const withAuth =
  ({ redirect, to = "/login", enableLoading = true }) =>
  (Component) =>
  ({ ...props }) => {
    const [loading, setLoading] = React.useState(true);
    const isAuth = useSelector((state) => state.auth.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      (async () => {
        const token = getToken();
        if (!token) {
          clearToken();
          setLoading(false);
          if (isAuth === true) dispatch(changeAuthValue(false));
          if (redirect) {
            navigate(to);
            return;
          }
          return;
        }

        const response = await axios
          .post("http://localhost:8080/api/auth/verify-token", {
            token,
          })
          .catch(() => console.log("hey"));

        if (get(response, "data.userId")) {
          setLoading(false);
          if (isAuth === false) dispatch(changeAuthValue(true));
          return;
        }

        clearToken();
        if (isAuth === true) dispatch(changeAuthValue(false));
        if (redirect) {
          navigate(to);
          return;
        }
      })();
    }, [navigate, dispatch, isAuth]);

    if (loading && enableLoading) {
      return <Loading />;
    }
    return <Component {...props} isAuth={isAuth} />;
  };

withAuth.propTypes = {
  redirect: PropTypes.bool.isRequired,
  to: PropTypes.string,
  enableLoading: PropTypes.bool,
};

export default withAuth;
