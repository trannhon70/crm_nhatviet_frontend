import { Button, Form, Modal, Select } from 'antd';
import dayjs from 'dayjs';
import { FC, Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import { patiantAPI } from '../../apis/patient.api';
import { fetchDistrictbyIdCity, getByIdDepartment } from "../../features/patientSlice";
import { AppDispatch, RootState } from "../../redux/store";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const ImportExcel: FC<any> = ({ getPagingPatient }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const hospitalId = localStorage.getItem('hospitalId')
    const [form] = Form.useForm();
    const { patient } = useSelector((state: RootState) => state);
    const { t } = useTranslation(['DSDangKyHen']);
    const [items, setItems] = useState([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChangeDiseases = (e: any) => {
        dispatch(getByIdDepartment({ hospitalId, departmentId: e }))
        form.setFieldsValue({ diseasesId: undefined });
    }

    const handleChangeCity = (e: any) => {
        dispatch(fetchDistrictbyIdCity(e))
        form.setFieldsValue({ districtId: undefined });
    }

    const onclickClose = (event: any) => {
        event.preventDefault();
        setIsModalOpen(false);
    }
    const convertExcelDate = (serial: number) => {
        const utc_days = serial - 25569; // Chuyển đổi từ số ngày Excel
        const utc_milliseconds = utc_days * 86400 * 1000; // Chuyển đổi sang milliseconds
        const date = new Date(utc_milliseconds); // Tạo đối tượng Date

        // Hiển thị dạng đầy đủ ISO
        return date.toISOString(); // Kết quả: "YYYY-MM-DDTHH:mm:ss.sssZ"
    };

    const readExcel = (file: any) => {
        if (!(file instanceof Blob)) {
            console.error("The provided file is not a Blob or File.");
            return;
        }
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e: any) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d: any) => {
            setItems(d);
        });
    };

    const onFinish = async (values: any) => {
        // console.log(items, 'items');
        if (items.length === 0) {
            return toast.warning('file excel không được bỏ trống!')
        }
        const body = items.map((item: any) => {

            return {
                name: item["Họ và tên"],
                gender: item["Giới tính"] ? item["Giới tính"].toUpperCase() : "",
                yearOld: item["Nhập tuổi"],
                phone: item["Nhập số điện thoại"],
                content: item["Nội dung tư vấn"],
                code: item["Mã chuyên gia"],
                treatment: JSON.stringify([item["Mục điều trị"]]),
                appointmentTime: item["Thời gian hẹn (dd/mm/yyyy)"] > 0 ? dayjs(convertExcelDate(item["Thời gian hẹn (dd/mm/yyyy)"])).unix() : 0,
                reminderTime: item["Thời gian nhắc hẹn (dd/mm/yyyy)"] > 0 ? dayjs(convertExcelDate(item["Thời gian nhắc hẹn (dd/mm/yyyy)"])).unix() : 0,
                note: item["Ghi chú"],
                editregistrationTime: item["Sửa thời gian đăng ký (dd/mm/yyyy)"] > 0 ? dayjs(convertExcelDate(item["Sửa thời gian đăng ký (dd/mm/yyyy)"])).unix() : 0,
                status: item["Trạng thái"] ? item["Trạng thái"].toUpperCase() : "",
                record: item["Nội dung tiếp nhận"],
                chat: item["Nhập hồ sơ thăm khám"],
                cityId: values.cityId,
                departmentId: values.departmentId,
                diseasesId: values.diseasesId,
                districtId: values.districtId,
                doctorId: values.doctorId,
                mediaId: values.mediaId,
                hospitalId: hospitalId
            }
        })

        try {
            const result = await patiantAPI.importFileExcel(body)
            if (result.data.statusCode === 1) {
                toast.success('Thêm mới thành công!');
                dispatch(getPagingPatient);
                setItems([])
                form.resetFields()
            }
        } catch (error) {
            console.log(error);

        }

    }
    return <Fragment>
        <Button size='small' type="primary" onClick={showModal}>
            Import
        </Button>
        <Modal title="Import file excel" open={isModalOpen} footer={false} onOk={handleOk} onCancel={handleCancel}>
            <Form
                form={form}
                {...layout}
                name="search_form"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                variant="filled"
                size="middle"
            >

                <Form.Item name="doctorId" label={t("DSDangKyHen:bac_si")}>
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder={`--${t("DSDangKyHen:lua_chon")}--`}
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient.doctor.length > 0 && patient?.doctor?.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />
                </Form.Item>

                <Form.Item name="departmentId" label={t("DSDangKyHen:khoa")} rules={[
                    { required: true, message: t("DSDangKyHen:khoa_err"), }
                ]}>
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder="---Lựa chọn---"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient?.department?.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                        onChange={handleChangeDiseases}
                    />
                </Form.Item>
                <Form.Item name="diseasesId" label={t("DSDangKyHen:benh")} rules={[
                    { required: true, message: t("DSDangKyHen:benh_err"), }
                ]}>
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder="---Lựa chọn---"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient?.diseasses?.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />
                </Form.Item>
                <Form.Item name="mediaId" label={t("DSDangKyHen:nguon_den")} rules={[
                    { required: true, message: t("DSDangKyHen:nguon_den_err"), }
                ]}>
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder="---Lựa chọn---"
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient?.media?.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />
                </Form.Item>
                <Form.Item name="cityId" label={t("DSDangKyHen:tinh/TP")} 
                // rules={[
                //     { required: true, message: t("DSDangKyHen:tinh/TP_err"), }
                // ]}
                >
                    <Select
                        showSearch
                        placeholder={`--${t("DSDangKyHen:chon_tinh/tp")}--`}
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient.loading === 'succeeded' && patient.city.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                        onChange={handleChangeCity}
                    />

                </Form.Item>
                <Form.Item name="districtId" label={t("DSDangKyHen:quan/huyen")} >
                    <Select

                        showSearch
                        placeholder={`--${t("DSDangKyHen:chon_quan/huyen")}--`}
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient.district.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.full_name
                            }
                        })}
                    />

                </Form.Item>
                <Form.Item
                    name="upload"
                    label="Tải file"
                >
                    <input
                        accept=".xlsx, .xls"
                        type="file"
                        onChange={(e: any) => {
                            const selectedFile = e.target.files?.[0];
                            if (selectedFile) {
                                readExcel(selectedFile);
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <div className='flex items-center justify-end gap-1' >
                        <Button type="primary" htmlType="submit" variant='solid' color='primary' >{t("DSDangKyHen:luu")}</Button>
                        <Button onClick={onclickClose} variant='solid' color='danger' >{t("DSDangKyHen:thoat")}</Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    </Fragment>
}

export default ImportExcel