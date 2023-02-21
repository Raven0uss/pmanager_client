import styled from "styled-components";

const ProjectElementContainer = styled.div`
  width: 80%;
  padding: 10px;
  background-color: ${(props) =>
    props.deleteMode ? (props.isSelected ? "#fca6a6" : "#feded7") : "#f6f6f6"};
  border: ${(props) => (props.isSelected ? "solid 1px #fa5757" : "none")};
  border-radius: ${(props) => (props.isSelected ? "3px" : "10px")};
  margin-bottom: 4px;
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity:  ${(props) => (props.isSelected ? "1" : "0.7")};
  &:hover {
    transition: ${(props) => (props.isSelected ? "0s" : "0.3s")};
    opacity: 1;
    cursor: pointer;
    border-radius: 3px;
  }
`;

const ProjectElementName = styled.h4`
  margin-top: 5px;
  margin-bottom: 5px;
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
