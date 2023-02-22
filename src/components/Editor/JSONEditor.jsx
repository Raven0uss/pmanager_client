import React from "react";
import Editor from "@monaco-editor/react";
import { Button } from "antd";
import exportJSON from "./downloadJSON";
import beautifyJSON from "./beautifyJSON";
import withNotificationContext from "../../hoc/withNotification";
import { get } from "lodash";

const JSONEditor = (props) => {
  const { name, content, editorRef, openNotification } = props;

  return (
    <div
      style={{
        height: "80%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <div>
          <Button disabled>Import JSON</Button>
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
            style={{ marginLeft: 5 }}
          >
            Export JSON
          </Button>
        </div>

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
      </div>

      <Editor
        height="100%"
        defaultLanguage="json"
        defaultValue={content}
        onMount={props.handleEditorDidMount}
        language="json"
      />
    </div>
  );
};

export default withNotificationContext(JSONEditor);
