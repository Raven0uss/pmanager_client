import React from "react";
import withAuth from "../hoc/withAuth";
import { deleteProjectsAPI, getProjectsAPI } from "../api/projects";
import { get } from "lodash";
import { Button, Input } from "antd";
import ProjectElement from "../components/ProjectElement";
import {
  AppsContainer,
  AppsPageTitle,
  ProjectsActionsContainer,
  ProjectAppListContainer,
  ProjectsToolbar,
} from "./Apps.styled";
import moment from "moment";
import Editor from "../components/Editor";

const Apps = ({ isAuth }) => {
  const [isLoading, setLoading] = React.useState(true);
  const [apps, setApps] = React.useState([]);
  const [deleteMode, setModeDelete] = React.useState(false);
  const [deleteList, setDeleteList] = React.useState([]);

  const [filterName, setFilterName] = React.useState("");
  const [openEditor, setEditorOpen] = React.useState({
    isOpen: false,
    isNew: false,
    projectId: null,
    name: "",
  });

  React.useEffect(() => {
    (async () => {
      if (isAuth)
        try {
          const response = await getProjectsAPI();
          console.log(response);
          const projects = get(response, "data", []);
          setApps(() =>
            projects.sort((a, b) => moment(a.updatedAt).isBefore(b.updatedAt))
          );
        } catch (err) {
          console.log("Error");
        }
      setLoading(false);
    })();
  }, [isAuth]);

  const openNewApp = () => {
    setEditorOpen({
      isOpen: true,
      isNew: true,
      projectId: null,
      name: "",
    });
  };

  const selectElementToDelete = (projectId) => {
    if (deleteList.includes(projectId)) {
      setDeleteList((list) => list.filter((id) => id !== projectId));
    } else {
      setDeleteList((list) => [...list, projectId]);
    }
  };

  const deleteSelected = async () => {
    if (
      window.confirm(
        `Are you sure to delete ${deleteList.length} app${
          deleteList.length > 1 ? "s" : ""
        } ?`
      )
    ) {
      setLoading(true);
      const response = await deleteProjectsAPI(deleteList);
      console.log(response);
      setDeleteList([]);
      setModeDelete(false);
      setLoading(false);
    }
  };

  return (
    <AppsContainer>
      <AppsPageTitle>Your Apps</AppsPageTitle>

      {isLoading ? (
        <div>Is loading...</div>
      ) : (
        <>
          <ProjectsToolbar>
            <Input
              value={filterName}
              allowClear
              style={{
                width: 250,
                marginLeft: "8%",
              }}
              placeholder="Search app name..."
              onChange={(e) => setFilterName(e.target.value)}
            />
            <ProjectsActionsContainer>
              <Button
                type={"primary"}
                onClick={openNewApp}
                disabled={deleteMode}
              >
                New App
              </Button>
              <Button
                type={"primary"}
                danger
                disabled={deleteMode && deleteList.length === 0}
                onClick={() => {
                  if (deleteMode) {
                    deleteSelected(deleteList);
                  } else {
                    setModeDelete(true);
                  }
                }}
              >
                Delete Apps
              </Button>
              {deleteMode && (
                <Button
                  danger
                  onClick={() => {
                    setModeDelete(false);
                    setDeleteList([]);
                  }}
                >
                  Cancel
                </Button>
              )}
            </ProjectsActionsContainer>
          </ProjectsToolbar>

          {/* <div
            style={{
              display: deleteList.length > 0 ? "block" : "none",
            }}
          >
            {deleteList.length} element
            {deleteList.length > 1 ? "s" : ""} selected.
          </div> */}
          <ProjectAppListContainer>
            {apps
              .filter((app) =>
                app.name.toLowerCase().includes(filterName.toLowerCase())
              )
              .map((app) => (
                <ProjectElement
                  action={() => {
                    if (deleteMode) {
                      selectElementToDelete(app.id);
                    } else {
                      setEditorOpen({
                        isOpen: true,
                        isNew: false,
                        projectId: app.id,
                        name: app.name,
                      });
                    }
                  }}
                  key={app.id}
                  name={app.name}
                  updatedAt={app.updatedAt}
                  deleteMode={deleteMode}
                  isSelectedToDelete={deleteMode && deleteList.includes(app.id)}
                />
              ))}
          </ProjectAppListContainer>
          <Editor openEditor={openEditor} setEditorOpen={setEditorOpen} />
        </>
      )}
    </AppsContainer>
  );
};

export default withAuth({ redirect: true, to: "/" })(Apps);
