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
import { get, pick } from "lodash";
import Loading from "../../navigation/Loading";
import { editorInitialState } from "../../pages/Apps";
import withNotificationContext from "../../hoc/withNotification";

const Editor = (props) => {
  const editorRef = React.useRef(null);
  const dispatch = useDispatch();

  const { openEditor, setEditorOpen, openNotification } = props;
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
      // JSON can be heavy, so we load it in the editor case by case
      try {
        await getProjectAPI(projectId)
          .then((response) => {
            setContent(
              JSON.stringify(JSON.parse(response.data.content), null, 4)
            );
            setName(currentName);
          })
          .catch((err) => {
            throw get(err, "response.data", err.message);
          });
      } catch (err) {
        openNotification({
          type: "error",
          message: "An error occurred 🤕",
          description: err,
        });
        setEditorOpen(editorInitialState);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      editorRef.current = null;
    };
  }, [currentName, isNew, projectId, setEditorOpen, openNotification]);

  // An error can occurred if the state changement is
  // too fast for the DOM. 0 data avoid to inject NaN in CSS DOM
  const modalSize = calculateEditorSize({
    windowHeight: isNaN(windowSize.height) ? 0 : windowSize.height,
    windowWidth: isNaN(windowSize.width) ? 0 : windowSize.width,
  });

  const saveNewProject = async () => {
    try {
      const response = await createProjectAPI({
        name,
        content: editorRef.current.getValue(),
      }).catch((err) => {
        throw get(err, "response.data", err.message);
      });
      dispatch(addApp(response.data));
      openNotification({
        type: "success",
        message: "App Created ! 🎉",
        description: `${name} has been succesfully created.`,
      });
      setEditorOpen(editorInitialState);
    } catch (err) {
      openNotification({
        type: "error",
        message: "An error occurred 🤕",
        description: err,
      });
    }
  };

  const saveProject = async () => {
    try {
      const response = await updateProjectAPI(projectId, {
        name,
        content: editorRef.current.getValue(),
      }).catch((err) => {
        throw get(err, "response.data", err.message);
      });
      // We avoid to pass in memory the content which can be heavy
      dispatch(updateApp(pick(response.data, ["name", "id", "updateAt"])));
      openNotification({
        type: "success",
        message: "App saved.",
        description: `${name} has been succesfully saved.`,
      });
      setEditorOpen(editorInitialState);
    } catch (err) {
      openNotification({
        type: "error",
        message: "An error occurred 🤕",
        description: err,
      });
    }
  };

  const onSave = async () => (isNew ? saveNewProject() : saveProject());

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

export default withNotificationContext(Editor);
