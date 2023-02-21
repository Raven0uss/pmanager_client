import React from "react";
import moment from "moment";
import {
  ProjectElementContainer,
  ProjectElementName,
  ProjectElementUpdateContainer,
  ProjectElementUpdateLabel,
  ProjectElementUpdateValue,
} from "./ProjectElement.styled";

const ProjectElement = (props) => {
  return (
    <ProjectElementContainer
      onClick={() => {
        props.action();
      }}
      deleteMode={props.deleteMode}
      isSelected={props.isSelectedToDelete}
    >
      <ProjectElementName>{props.name}</ProjectElementName>
      <ProjectElementUpdateContainer>
        <ProjectElementUpdateLabel>Last update : </ProjectElementUpdateLabel>
        <ProjectElementUpdateValue>
          {moment(props.updatedAt).fromNow()}
        </ProjectElementUpdateValue>
      </ProjectElementUpdateContainer>
    </ProjectElementContainer>
  );
};

ProjectElement.propTypes = {};

export default ProjectElement;
