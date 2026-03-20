import { Modal } from "antd";
import { FC, Fragment, useEffect, useState } from "react";
import { pdfjs } from 'react-pdf';
import { Player } from 'video-react';
import poster from "../../../assets/images/logo.jpg"


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

interface IProps {
    isModalOpen: any,
    setIsModalOpen: any,
    file: any
}

const ModalMp4: FC<IProps> = (props) => {
    const { isModalOpen, setIsModalOpen, file } = props
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://video-react.github.io/assets/video-react.css';
        document.head.appendChild(link);
    
        return () => {
          document.head.removeChild(link); // Xóa thẻ link khi component bị hủy
        };
      }, []);
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return <Fragment>
        <Modal width={800} height={600} className="p-2" title={file.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} >
        <Player
      playsInline
      poster={poster}
      src={`${process.env.REACT_APP_URL_API}/uploads/${file.name}`}
    />
        </Modal>
    </Fragment>
}

export default ModalMp4