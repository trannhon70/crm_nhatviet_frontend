import { Button, Input, Modal, Popover } from "antd";
import { FC, useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { patiantAPI } from "../../apis/patient.api";
import { toast } from "react-toastify";

interface IProps {
    record?: any,
    dispatchGetData?: any
}
const ComponentPatientCause: FC<IProps> = (props) => {
    const { record, dispatchGetData } = props;
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [value, setValue] = useState<any>("")

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChangeValue = (e: any) => {
        setValue(e.target.value)
    }

    const handleSave = () => {
        const body = {
            reason: value,
            id: record.id
        }

        patiantAPI.updatePatientReason(body).then((_res: any) => {
            toast.success(` Lưu thành công! `);
            setIsModalOpen(false);
            dispatchGetData();
        }).catch((_err: any) => {
            toast.error(` Lưu không thành công! `)
        })
    }

    return <>
        <div onClick={showModal} className="flex items-center cursor-pointer " >
            <Popover content={record.reason} >
                <div style={{ cursor: "pointer", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: '90%' }}>{record.reason}</div>
            </Popover>

            <LiaEdit className="cursor-pointer" size={20} />

        </div>
        <Modal
            title={record?.name}
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onCancel={handleCancel}
            footer
        >
            <div>
                <div>Nhập nguyên nhân mới: </div>
                <Input.TextArea placeholder="Nhập nguyên nhân"
                    value={value}
                    onChange={onChangeValue}
                />
            </div>
            <div className="mt-2" >
                <div>Nguyên nhân cũ:</div>
                {
                    record.reason && <div className="rounded p-1 bg-slate-400 text-white" >
                        {record.reason}
                    </div>
                }

            </div>
            <div className="flex items-center justify-end gap-3 mt-3" >
                <Button onClick={handleCancel} variant="solid" color="danger" >Thoát</Button>
                <Button onClick={handleSave} variant="solid" color="primary" >Lưu</Button>
            </div>
        </Modal>
    </>
}

export default ComponentPatientCause