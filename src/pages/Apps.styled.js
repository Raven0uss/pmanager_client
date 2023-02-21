import styled from "styled-components";

const AppsContainer = styled.div`
  width: 100%;
`;

const AppsPageTitle = styled.h2`
  font-size: 22px;
  margin-left: 8%;
`;

const ProjectAppListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  align-items: center;
  margin-bottom: 40px;
`;

const ProjectsToolbar = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: space-between;
`;

const ProjectsActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  margin-left: 8%;
  margin-bottom: 12px;
  & > * {
    margin-left: 5px;
    margin-right: 5px;
  }
`;

export {
  ProjectAppListContainer,
  AppsPageTitle,
  AppsContainer,
  ProjectsActionsContainer,
  ProjectsToolbar,
};
