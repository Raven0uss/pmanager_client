import { Button, Input, Modal } from "antd";
import React from "react";
import useWindowSize from "../../hooks/useWindowSize";
import calculateEditorSize from "./calculateEditorSize";
import {
  createProjectAPI,
  getProjectAPI,
  updateProjectAPI,
} from "../../api/projects";
import JSONEditor from "./JSONEditor";

const Editor = (props) => {
  const editorRef = React.useRef(null);

  const [loading, setLoading] = React.useState(true);
  const [loadingSave, setLoadingSave] = React.useState(false);
  const [content, setContent] = React.useState("");

  const { openEditor, setEditorOpen } = props;
  const { isOpen, isNew, projectId, name: currentName } = openEditor;

  const [name, setName] = React.useState(currentName);

  const windowSize = useWindowSize();

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  React.useEffect(() => {
    (async () => {
      if (isOpen) {
        if (isNew) {
          setLoading(false);
          return;
        }
        const response = await getProjectAPI(projectId).catch(() => {
          setEditorOpen(() => ({
            isOpen: false,
            isNew: false,
            projectId: null,
          }));
        });
        setContent(JSON.stringify(JSON.parse(response.data.content), null, 4));
        setName(() => currentName);
        setLoading(false);
      }
    })();
    // This warning strange, it brokes, only isOpen is handy here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const modalSize = calculateEditorSize({
    windowHeight: windowSize.height,
    windowWidth: windowSize.width,
  });

  const onSave = async () => {
    setLoadingSave(true);
    if (isNew) {
      try {
        const response = await createProjectAPI({
          name,
          content: editorRef.current.getValue(),
        }).catch((err) => {
          throw err;
        });
      } catch (err) {
        setLoadingSave(false);
        return;
      }
    } else {
      try {
        const response = await updateProjectAPI(projectId, {
          name,
          content: editorRef.current.getValue(),
        }).catch((err) => {
          throw err;
        });
      } catch (err) {
        setLoadingSave(false);
        return;
      }
    }
    setLoadingSave(false);
    onClose();
  };

  const onClose = () => {
    setEditorOpen({
      isOpen: false,
      isNew: false,
      projectId: null,
    });
  };

  return (
    <Modal
      maskClosable={false}
      centered
      keyboard={false}
      closable={false}
      open={isOpen}
      okText={"Save JSON"}
      onOk={() => {
        onSave();
      }}
      cancelText={"Close"}
      onCancel={() => onClose()}
      width={modalSize.width}
      bodyStyle={{
        height: modalSize.height,
      }}
      destroyOnClose={true}
      confirmLoading={loadingSave}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <JSONEditor
            name={name}
            content={content}
            handleEditorDidMount={handleEditorDidMount}
            editorRef={editorRef}
          />
        </>
      )}
    </Modal>
  );
};

export default Editor;
