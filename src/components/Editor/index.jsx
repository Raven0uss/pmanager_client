import { Button, Input, Modal } from "antd";
import React from "react";
import useWindowSize from "../../hooks/useWindowSize";
import calculateEditorSize from "./calculateEditorSize";
import { getProjectAPI } from "../../api/projects";
import JSONEditor from "./JSONEditor";

const Editor = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [content, setContent] = React.useState("");

  const { openEditor, setEditorOpen } = props;
  const { isOpen, isNew, projectId, name: currentName } = openEditor;

  const [name, setName] = React.useState(currentName);

  const windowSize = useWindowSize();

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

  return (
    <Modal
      maskClosable={false}
      centered
      keyboard={false}
      closable={false}
      open={isOpen}
      onOk={() =>
        setEditorOpen({
          isOpen: false,
          isNew: false,
          projectId: null,
        })
      }
      okText={"Save JSON"}
      onCancel={() =>
        setEditorOpen({
          isOpen: false,
          isNew: false,
          projectId: null,
        })
      }
      width={modalSize.width}
      bodyStyle={{
        height: modalSize.height,
      }}
      destroyOnClose={true}
      confirmLoading={false}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <JSONEditor content={content} />
        </>
      )}
    </Modal>
  );
};

export default Editor;
