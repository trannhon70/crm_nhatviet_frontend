import { Modal } from "antd";
import { FC, Fragment } from "react";

interface IProps {
    isModalOpen: any,
    setIsModalOpen: any,
    file: any
}
const ModalDoc: FC<IProps> = (props) => {
    const { isModalOpen, setIsModalOpen, file } = props
    const googleViewer = `https://docs.google.com/gview?url=${`${process.env.REACT_APP_URL_API}/uploads/${file.name}`}&embedded=true`;
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return <Fragment>
       <Modal width={800} height={600} className="p-2" title={file.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} >
       <iframe
            src={googleViewer}
            style={{ width: "100%", height: "70vh", border: "none" }}
            title="DOCX Viewer"
        />
       </Modal>
    </Fragment>
}

export default ModalDoc