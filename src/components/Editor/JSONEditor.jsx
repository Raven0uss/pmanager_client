import React from "react";
import Editor from "@monaco-editor/react";
import { Button } from "antd";
import exportJSON from "./exportJSON";
import beautifyJSON from "./beautifyJSON";
import withNotificationContext from "../../hoc/withNotification";
import { get } from "lodash";
import {
  EditorContainer,
  EditorToolsContainer,
  EditorToolsRightElements,
} from "./JSONEditor.styled";
import importJSON from "./importJSON";

const JSONEditor = (props) => {
  const { name, content, editorRef, openNotification } = props;

  return (
    <EditorContainer>
      <EditorToolsContainer>
        <EditorToolsRightElements>
          <Button
            onClick={(e) => {
              e.preventDefault()
              importJSON(editorRef);
            }}
          >
            Import JSON
          </Button>
          <input
            type="file"
            hidden
            id="json-input-upload"
            accept="application/JSON"
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              try {
                exportJSON({
                  name,
                  json: editorRef.current.getValue(),
                });
              } catch (err) {
                openNotification({
                  type: "error",
                  message: "JSON Syntax Error",
                  description: get(err, "response.data", err.message),
                });
              }
            }}
          >
            Export JSON
          </Button>
        </EditorToolsRightElements>

        <Button
          type={"primary"}
          onClick={() => {
            try {
              const beautifuljson = beautifyJSON(editorRef.current.getValue());
              editorRef.current.setValue(beautifuljson);
            } catch (err) {
              openNotification({
                type: "error",
                message: "JSON Syntax Error",
                description: get(err, "response.data", err.message),
              });
            }
          }}
        >
          Beautify JSON
        </Button>
      </EditorToolsContainer>

      <Editor
        height="100%"
        defaultLanguage="json"
        defaultValue={content}
        onMount={props.handleEditorDidMount}
        language="json"
      />
    </EditorContainer>
  );
};

export default withNotificationContext(JSONEditor);
