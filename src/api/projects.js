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

export const getProjectAPI = async (id) => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/projects/getProject?project_id=${id}`,
      config()
    );
    return response;
  } catch (err) {
    throw Error;
  }
};

export const updateProjectAPI = async (id, { name, content }) => {
  try {
    const response = await axios.put(
      `${SERVER_URL}/api/projects/updateProject?project_id=${id}`,
      {
        content,
        name,
      },
      config()
    );
    return response;
  } catch (err) {
    throw Error;
  }
};

export const deleteProjectsAPI = async (ids) => {
  try {
    const response = await axios.delete(
      `${SERVER_URL}/api/projects/deleteProjects?project_id=${ids
        .toString()
        .replace(",", ";")}`,
      config()
    );
    return response;
  } catch (err) {
    throw Error;
  }
};

export const createProjectAPI = async ({ name, content }) => {
  try {
    const response = await axios.post(
      `${SERVER_URL}/api/projects/createProject`,
      {
        content,
        name,
      },
      config()
    );
    return response;
  } catch (err) {
    throw Error;
  }
};
