import React, { useState, FC } from 'react';
import { Button, Modal, Space, Upload, message } from 'antd';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { patiantAPI } from '../../../apis/patient.api';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface IProps {
    id?: number
}

const ModalUpload: FC<IProps> = (props) => {
    const {id} = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { t } = useTranslation(['DSDangKyHen']);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (fileList.length > 0) {
            const formData = new FormData();
            
            fileList.forEach((file) => {
                if (file.originFileObj) {
                    formData.append('file', file.originFileObj); 
                }
            });
            try {
                const result = await patiantAPI.uploadPatient(formData, Number(id))
                if (result.data.statusCode === 1) {
                    toast.success(`${t("DSDangKyHen:luu_file_thanh_cong")}`)
                    setIsModalOpen(false); // Đóng modal
                    setFileList([]); // Xóa danh sách file
                }
                
            } catch (error) {
                console.log(error);
                toast.error(`${t("DSDangKyHen:luu_file_khong_thanh_cong")}`)
            }
        } else {
            message.warning(`${t("DSDangKyHen:khong_co_tap_tin")}`);
        }
        // setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setFileList([]); // Xóa danh sách file khi đóng modal
    };

    const handleUploadChange = (info: { fileList: UploadFile[] }) => {
        setFileList(info.fileList); // Cập nhật danh sách file
    };

    return (
        <>
            <div onClick={showModal} className='flex justify-center items-center gap-1 ' >
                <FaCloudUploadAlt  className="cursor-pointer text-orange-500" size={25} />
                <span>{t("DSDangKyHen:tai_tap_tin")}</span>
            </div>

            <Modal
                title={t("DSDangKyHen:tai_tap_tin")}
                open={isModalOpen}
                footer={null}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                    <Upload
                        accept=".docx,.doc,.pdf,.mp4"
                        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture"
                        fileList={fileList}
                        onChange={handleUploadChange}
                        maxCount={1} // Số lượng file tối đa
                    >
                        <Button icon={<UploadOutlined />}>{t("DSDangKyHen:tai_tap_tin")}</Button>
                    </Upload>
                </Space>
                <div className="flex justify-end items-center gap-2 mt-4">
                    <Button type="primary" onClick={handleOk}>{t("DSDangKyHen:luu")}</Button>
                    <Button onClick={handleCancel} danger type="dashed">{t("DSDangKyHen:huy")}</Button>
                </div>
            </Modal>
        </>
    );
};

export default ModalUpload;
