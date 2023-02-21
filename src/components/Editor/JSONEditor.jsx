import React from "react";
import Editor from "@monaco-editor/react";
import { Button } from "antd";
import exportJSON from "./downloadJSON";
import beautifyJSON from "./beautifyJSON";

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
          <Button disabled>Import JSON</Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              exportJSON({
                name,
                json: editorRef.current.getValue(),
              });
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
              console.log(err);
              alert(err);
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

export default JSONEditor;
