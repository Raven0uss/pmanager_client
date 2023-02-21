import React from "react";
import { AppStyled } from "./App.styled";
import Router from "./navigation/Router";
import { notification } from "antd";
import NotificationContext from "./contexts/NotificationContext";

const App = () => {
  const [notificationApi, contextHolder] = notification.useNotification();

  return (
    <>
      <AppStyled />
      {contextHolder}
      <NotificationContext.Provider value={{ notificationApi }}>
        <Router />
      </NotificationContext.Provider>
    </>
  );
};

export default App;
