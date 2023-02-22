import { get } from "lodash";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { clearToken, getToken } from "../hooks/useToken";
import { useSelector, useDispatch } from "react-redux";
import { changeAuthValue } from "../redux/auth/authSlice";
import Loading from "../navigation/Loading";
import { validityTokenAPI } from "../api/auth";

const withAuth =
  (Component, { redirect, to = "/login", enableLoading = true }) =>
  ({ ...props }) => {
    const [loading, setLoading] = React.useState(true);
    const isAuth = useSelector((state) => state.auth.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      (async () => {
        try {
          // Get Token from localStorage
          const token = getToken();
          // Token doesn't exist or unparsable
          if (!token) {
            // Remove if dummy data is there
            clearToken();
            setLoading(false);
            // if isAuth was true in the persistant data
            dispatch(changeAuthValue(false));
            return redirect && navigate(to);
          }

          // Ask server for validity of token
          const response = await validityTokenAPI({ token });

          // Token is valid
          if (get(response, "data.userId")) {
            setLoading(false);
            return isAuth === false && dispatch(changeAuthValue(true));
          }

          // Token is not valid
          clearToken();
          dispatch(changeAuthValue(false));
          return redirect && navigate(to);
        } catch (err) {
          // In case of error, remove all and go home
          clearToken();
          dispatch(changeAuthValue(false));
          return redirect && navigate("/");
        }
      })();
    }, [navigate, dispatch, isAuth]);

    if (loading && enableLoading) {
      return <Loading />;
    }
    return <Component {...props} isAuth={isAuth} />;
  };

export default withAuth;
