import axios from "axios";
import { SERVER_URL } from "./constants";
import { config } from "./header";

export const getProjectsAPI = async () => {
  const response = await axios.get(
    `${SERVER_URL}/api/projects/getProjects`,
    config()
  );
  return response;
};

export const getProjectAPI = async (id) => {
  const response = await axios.get(
    `${SERVER_URL}/api/projects/getProject?project_id=${id}`,
    config()
  );
  return response;
};

export const updateProjectAPI = async (id, { name, content }) => {
  const response = await axios.put(
    `${SERVER_URL}/api/projects/updateProject?project_id=${id}`,
    {
      content,
      name,
    },
    config()
  );
  return response;
};

export const deleteProjectsAPI = async (ids) => {
  const response = await axios.delete(
    `${SERVER_URL}/api/projects/deleteProjects?ids=${ids
      .toString()
      .replace(/,/g, ";")}`,
    config()
  );
  return response;
};

export const createProjectAPI = async ({ name, content }) => {
  const response = await axios.post(
    `${SERVER_URL}/api/projects/createProject`,
    {
      content,
      name,
    },
    config()
  );
  return response;
};
