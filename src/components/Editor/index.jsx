import { Modal } from 'antd';
import React from 'react';

const Editor = (props) => {
    const [loading, setLoading] = React.useState(false);
    const { openEditor, setEditorOpen } = props;
    const { isOpen, isNew, projectId } = openEditor;

    return (
        <Modal
            maskClosable={false}
            centered
            closable={false}
            open={isOpen}
            onOk={() => setEditorOpen({
                isOpen: false,
                isNew: false,
                projectId: null
            })}
            onCancel={() => setEditorOpen({
                isOpen: false,
                isNew: false,
                projectId: null
            })}
            width={'70%'}
            heifh
        >

        </Modal>
    )
};

export default Editor;