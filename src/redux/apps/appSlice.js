import { createSlice } from "@reduxjs/toolkit";
import { differenceWith } from "lodash";
import moment from "moment";

const initialState = {
  projects: [],
};

export const appSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    setApps: (state, action) => {
      state.projects = action.payload.sort((a, b) =>
        moment(a.updatedAt).isBefore(b.updatedAt, "second")
      );
    },
    addApp: (state, action) => {
      state.projects = [...state.projects, action.payload].sort((a, b) =>
        moment(a.updatedAt).isBefore(b.updatedAt, "second")
      );
    },
    deleteApps: (state, action) => {
      const ids = action.payload;
      state.projects = differenceWith(
        state.projects,
        ids,
        (project, id) => project.id === id
      ).sort((a, b) => moment(a.updatedAt).isBefore(b.updatedAt, "second"));
    },
    updateApp: (state, action) => {
      const { id, name, updatedAt } = action.payload;
      let projectIndex = -1;
      const projects = state.projects.map((project, index) => {
        if (project.id === id) {
          projectIndex = index;
          return { ...project, name, updatedAt };
        }
        return project;
      });
      if (projectIndex !== -1)
        projects.unshift(projects.splice(projectIndex, 1)[0]);
      state.projects = projects;
    },
  },
});

export const { addApp, deleteApps, setApps, updateApp } = appSlice.actions;

export default appSlice.reducer;
