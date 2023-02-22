import styled from "styled-components";

const EditorContainer = styled.div`
  height: 80%;
`;

const EditorToolsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const EditorToolsRightElements = styled.div`
  & > button {
    margin-left: 3px;
    margin-right: 3px;
  }
`;

export { EditorContainer, EditorToolsContainer, EditorToolsRightElements };
