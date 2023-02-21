import { Input, Modal } from "antd";
import React from "react";
import useWindowSize from "../../hooks/useWindowSize";
import calculateEditorSize from "./calculateEditorSize";
import {
  createProjectAPI,
  getProjectAPI,
  updateProjectAPI,
} from "../../api/projects";
import JSONEditor from "./JSONEditor";
import { useDispatch } from "react-redux";
import { addApp, updateApp } from "../../redux/apps/appSlice";
import { pick } from "lodash";
import Loading from "../../navigation/Loading";
import { editorInitialState } from "../../pages/Apps";

const Editor = (props) => {
  const editorRef = React.useRef(null);
  const dispatch = useDispatch();

  const { openEditor, setEditorOpen } = props;
  const { isOpen, isNew, projectId, name: currentName } = openEditor;

  const [name, setName] = React.useState(currentName);
  const [loading, setLoading] = React.useState(true);
  const [content, setContent] = React.useState("");

  const windowSize = useWindowSize();

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  React.useEffect(() => {
    (async () => {
      if (isNew) {
        setLoading(false);
        return;
      }
      getProjectAPI(projectId)
        .then((response) => {
          setContent(
            JSON.stringify(JSON.parse(response.data.content), null, 4)
          );
          setName(currentName);
        })
        .catch(() => {
          setEditorOpen(editorInitialState);
        })
        .finally(() => setLoading(false));
    })();

    return () => {
      editorRef.current = null;
    };
  }, [currentName, isNew, projectId, setEditorOpen]);

  const modalSize = calculateEditorSize({
    windowHeight: windowSize.height,
    windowWidth: windowSize.width,
  });

  const saveNewProject = async () => {
    try {
      const response = await createProjectAPI({
        name,
        content: editorRef.current.getValue(),
      }).catch((err) => {
        throw err;
      });
      dispatch(addApp(response.data));
    } catch (err) {
      return;
    }
  };

  const saveProject = async () => {
    try {
      const response = await updateProjectAPI(projectId, {
        name,
        content: editorRef.current.getValue(),
      }).catch((err) => {
        throw err;
      });
      dispatch(updateApp(pick(response.data, ["name", "id", "updateAt"])));
    } catch (err) {
      return;
    }
  };

  const onSave = async () => {
    (isNew ? saveNewProject() : saveProject()).finally(() => {
      setEditorOpen(editorInitialState);
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
      onOk={() => onSave()}
      cancelText={"Close"}
      onCancel={() => setEditorOpen(editorInitialState)}
      width={modalSize.width}
      bodyStyle={{
        height: modalSize.height,
      }}
      destroyOnClose={true}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Choose an app name"
          />
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
