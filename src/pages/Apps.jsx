import React from "react";
import withAuth from "../hoc/withAuth";
import { getProjectsAPI } from "../api/projects";
import { get } from "lodash";
import { Button } from "antd";
import ProjectElement from "../components/ProjectElement";
import {
    AppsContainer,
    AppsPageTitle,
    ProjectsActionsContainer,
    ProjectAppListContainer,
    ProjectsToolbar,
} from "./Apps.styled";
import SearchElement from "../components/SearchElement";
import moment from "moment";
import Editor from "../components/Editor";

const Apps = ({ isAuth }) => {
    const [isLoading, setLoading] = React.useState(true);
    const [apps, setApps] = React.useState([]);
    const [filterName, setFilterName] = React.useState('')
    const [openEditor, setEditorOpen] = React.useState({
        isOpen: false,
        isNew: false,
        projectId: null
    });

    React.useEffect(() => {
        (async () => {
            if (isAuth)
                try {
                    const response = await getProjectsAPI();
                    console.log(response);
                    const projects = get(response, "data", []);
                    setApps(() => projects.sort((a, b) => moment(a.updatedAt).isBefore(b.updatedAt)));
                } catch (err) {
                    console.log("Error");
                }
            setLoading(false);
        })();
    }, [isAuth]);

    return (
        <AppsContainer>
            <AppsPageTitle>Your Apps</AppsPageTitle>

            {isLoading ? (
                <div>Is loading...</div>
            ) : (
                <>
                    <ProjectsToolbar>
                        <SearchElement filterName={filterName} setFilterName={setFilterName} />
                        <ProjectsActionsContainer>
                            <Button type={'primary'}>New App</Button>
                            <Button type={'primary'} danger>Delete Apps</Button>
                        </ProjectsActionsContainer>
                    </ProjectsToolbar>
                    <ProjectAppListContainer>
                        {apps.filter((app) => app.name.toLowerCase().includes(filterName.toLowerCase())).map((app) => (
                            <ProjectElement
                                action={() => setEditorOpen({
                                    isOpen: true,
                                    isNew: false,
                                    projectId: app.id
                                })}
                                key={app.id}
                                name={app.name}
                                updatedAt={app.updatedAt}
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
