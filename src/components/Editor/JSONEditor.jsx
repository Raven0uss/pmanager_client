import React from "react";
import Editor from "@monaco-editor/react";
import { Button } from "antd";
import exportJSON from "./downloadJSON";

const JSONEditor = (props) => {
  const { name, content, editorRef } = props;

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
          <Button>Import JSON</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              exportJSON({
                name,
                json: editorRef.current.getValue(),
              });
            }}
          >
            Export JSON
          </Button>
        </div>

        <Button type={"primary"}>Beautify JSON</Button>
      </div>

      <Editor
        height="100%"
        defaultLanguage="JSON"
        defaultValue={content}
        onMount={props.handleEditorDidMount}
      />
    </div>
  );
};

export default JSONEditor;
