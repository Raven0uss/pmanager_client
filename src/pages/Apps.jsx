import React from "react";
import withAuth from "../hoc/withAuth";
import { deleteProjectsAPI, getProjectsAPI } from "../api/projects";
import { get } from "lodash";
import { Button } from "antd";
import ProjectElement from "../components/ProjectElement";
import {
  AppsContainer,
  AppsPageTitle,
  ProjectsActionsContainer,
  ProjectAppListContainer,
  ProjectsToolbar,
  NoProjectsFounds,
  NoProjectsExists,
  FilterSearchInput,
} from "./Apps.styled";
import Editor from "../components/Editor";
import { useDispatch, useSelector } from "react-redux";
import { deleteApps, setApps } from "../redux/apps/appSlice";
import Loading from "../navigation/Loading";
import withNotificationContext from "../hoc/withNotification";

export const editorInitialState = {
  isOpen: false,
  isNew: false,
  projectId: null,
  name: "",
};

const Apps = ({ isAuth, openNotification }) => {
  const [isLoading, setLoading] = React.useState(true);

  const apps = useSelector((state) => state.apps.projects);
  const dispatch = useDispatch();

  const [deleteMode, setModeDelete] = React.useState(false);
  const [deleteList, setDeleteList] = React.useState([]);

  const [filterName, setFilterName] = React.useState("");
  const [openEditor, setEditorOpen] = React.useState(editorInitialState);

  React.useEffect(() => {
    (async () => {
      if (isAuth)
        try {
          const response = await getProjectsAPI();
          console.log(response);
          const projects = get(response, "data", []);

          dispatch(setApps(projects));
        } catch (err) {
          console.log("Error");
        }
      setLoading(false);
    })();
  }, [isAuth, dispatch]);

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
      try {
        deleteProjectsAPI(deleteList)
          .then(() => {
            openNotification({
              type: "success",
              message: "Deleted ! 🗑️",
              description: `${deleteList.length} app${
                deleteList.length > 1 ? "s" : ""
              } has been removed.`,
            });
            dispatch(deleteApps(deleteList));
          })
          .catch((err) => {
            throw get(err, "response.data", err.message);
          });
      } catch (err) {
        openNotification({
          type: "error",
          message: "An error occurred 🤕",
          description: err,
        });
      } finally {
        setDeleteList([]);
        setModeDelete(false);
        setLoading(false);
      }
    }
  };

  const appList = apps.filter((app) =>
    app.name.toLowerCase().includes(filterName.toLowerCase())
  );
  return (
    <AppsContainer>
      <AppsPageTitle>Your Apps</AppsPageTitle>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ProjectsToolbar>
            <FilterSearchInput
              value={filterName}
              allowClear
              placeholder="Search app name..."
              onChange={(e) => setFilterName(e.target.value)}
              disabled={apps.length === 0}
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
                disabled={
                  (deleteMode && deleteList.length === 0) ||
                  appList.length === 0
                }
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

          <ProjectAppListContainer>
            {apps.length === 0 ? (
              <NoProjectsExists>
                Ow, There is no project here.
                <br />
                Select <b>New App</b> to create your first project ! 🚀
              </NoProjectsExists>
            ) : appList.length === 0 ? (
              <NoProjectsFounds>Oops, no results 😞</NoProjectsFounds>
            ) : (
              appList.map((app) => (
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
              ))
            )}
          </ProjectAppListContainer>
          {openEditor.isOpen && (
            <Editor openEditor={openEditor} setEditorOpen={setEditorOpen} />
          )}
        </>
      )}
    </AppsContainer>
  );
};

export default withAuth(withNotificationContext(Apps), {
  redirect: true,
  to: "/",
});
