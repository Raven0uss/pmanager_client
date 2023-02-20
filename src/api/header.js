import { getToken } from "../hooks/useToken";

export const config = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});
