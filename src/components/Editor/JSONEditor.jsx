import React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-clike";
import "prismjs/themes/prism.css";
import "./style.css";
import { Button } from "antd";

// I add to put a limit because I don't have the time to optimize
// or create myself an JSON editor
// But basicaly it's going very slow at a limit
// Maybe the limit of the state variable ?
// Maybe a loss of memory from the module ?
const CHARACTER_LIMIT = 14000;

const highlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
    .join("\n");


// Have to :
/*
    - when beautify json, if not valid, display error message
    - when try to save if json not valid, display error message
    - if quit without save, display confirm
    - if import json without save display confirm
    - if import json > 14000 char refuse to do it
*/

const JSONEditor = (props) => {
  const [jsonText, setJsonText] = React.useState(
    JSON.stringify(JSON.parse(props.content), null, 4)
  );

  const handleChange = (value) => {
    setJsonText(value.substring(0, CHARACTER_LIMIT));
  };

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
      <div
        style={{
          overflowY: "scroll",
          backgroundColor: "#f6f6f6",
          marginTop: 10,
          height: "100%",
        }}
      >
        <Editor
          value={jsonText}
          onValueChange={handleChange}
          highlight={(code) => highlightWithLineNumbers(code, languages.json)}
          padding={10}
          textareaId="codeArea"
          className="editor"
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 18,
            outline: 0,
          }}
        />
      </div>
    </div>
  );
};

export default JSONEditor;
