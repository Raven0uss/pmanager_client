import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import appsReducer from "./apps/appSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    apps: appsReducer,
  },
});
