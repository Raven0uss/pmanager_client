import axios from "axios";
import { SERVER_URL } from "./constants";
import { config } from "./header";

export const getProjectsAPI = async () => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/projects/getProjects`,
      config()
    );
    return response;
  } catch (err) {
    throw Error;
  }
};
