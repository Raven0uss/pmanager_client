import styled from "styled-components";

const ProjectElementContainer = styled.div`
  width: 80%;
  padding: 10px;
  background-color: #f6f6f6;
  margin-bottom: 4px;
  margin-top: 4px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0.7;
  &:hover {
    transition: 0.6s;
    opacity: 1;
    cursor: pointer;
    border-radius: 0px;
  }
`;

const ProjectElementName = styled.h4`
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 3px;
`;

const ProjectElementUpdateContainer = styled.div`
  display: inline;
`;
const ProjectElementUpdateLabel = styled.span`
  font-size: 14px;
  font-style: italic;
`;
const ProjectElementUpdateValue = styled.span`
  font-size: 16px;
`;

export {
  ProjectElementContainer,
  ProjectElementName,
  ProjectElementUpdateLabel,
  ProjectElementUpdateValue,
  ProjectElementUpdateContainer,
};
