import React from "react";
import Editor from "@monaco-editor/react";
import { Button } from "antd";

const JSONEditor = (props) => {
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
          <Button>Export JSON</Button>
        </div>

        <Button type={"primary"}>Beautify JSON</Button>
      </div>

      <Editor height="100%" defaultLanguage="JSON" defaultValue={props.content} />
    </div>
  );
};

export default JSONEditor;
