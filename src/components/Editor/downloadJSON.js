import moment from "moment";

const downloadFile = ({ data, fileName, fileType }) => {
  const blob = new Blob([data], { type: fileType });

  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);

  const fireEvent = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  a.dispatchEvent(fireEvent);
  a.remove();
};

const exportJSON = ({ json, name }) => {
  try {
    const data = JSON.stringify(JSON.parse(json), null, 4);
    downloadFile({
      data,
      fileName: `${name}-${moment().format("DDmmyyyy-HHmmss")}.json`,
      fileType: "text/json",
    });
  } catch (err) {
    alert(err);
  }
};

export default exportJSON;
