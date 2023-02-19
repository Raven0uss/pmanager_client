import React from "react";

export const getToken = () => {
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
};

export const clearToken = () => {
  localStorage.removeItem("token");
};

const useToken = () => {
  const [token, setToken] = React.useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
