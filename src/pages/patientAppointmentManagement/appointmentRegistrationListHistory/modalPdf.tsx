import { Modal } from "antd";
import { FC, Fragment, useState } from "react";
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

interface IProps {
    isModalOpen: any,
    setIsModalOpen: any,
    file: any
}

const ModalPdf: FC<IProps> = (props) => {
    const { isModalOpen, setIsModalOpen, file } = props
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return <Fragment>
        <Modal width={800} height={600} className="p-2" title={file.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} >
            <div className="overflow-auto h-[600px] w-[100%] " >
                <Document file={`${process.env.REACT_APP_URL_API}/uploads/${file.name}`} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.apply(null, Array(numPages))
                        .map((_, i) => i + 1)
                        .map((page) => {
                            return (
                                <Page scale={1.2} key={page} pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} />
                            )
                        })}
                </Document>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </div>
        </Modal>
    </Fragment>
}

export default ModalPdf