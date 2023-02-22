import axios from "axios";
import { SERVER_URL } from "./constants";

export const registerAPI = async ({ username, password }) => {
  const response = await axios.post(`${SERVER_URL}/api/auth/register`, {
    username,
    password,
  });
  return response;
};

export const loginAPI = async ({ username, password }) => {
  const response = await axios.post(`${SERVER_URL}/api/auth/login`, {
    username,
    password,
  });
  return response;
};
