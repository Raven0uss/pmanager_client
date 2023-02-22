import { get, isNil } from "lodash";

const uploadFile = (editorRef) => {
  const input = document.getElementById("json-input-upload");

  const readFile = (e) => {
    try {
      const jsonFile = get(e, "target.files[0]");
      if (jsonFile) {
        let reader = new FileReader();
        reader.readAsText(jsonFile);
        reader.onload = () => {
          if (!isNil(get(editorRef, "current")))
            editorRef.current.setValue(reader.result);
        };
      }
    } catch (err) {
      throw err;
    } finally {
      // If there is no event, to protect the page to crash
      try {
        input.removeEventListener("change", readFile);
      } catch (err) {}
    }
  };

  if (input) {
    input.addEventListener("change", readFile);
  }

  const fireEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  input.dispatchEvent(fireEvent);
};

const importJSON = (editorRef) => {
  try {
    uploadFile(editorRef);
  } catch (err) {
    throw err;
  }
};

export default importJSON;
