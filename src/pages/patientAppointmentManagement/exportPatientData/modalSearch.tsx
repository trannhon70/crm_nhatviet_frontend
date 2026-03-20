import { Button, DatePicker, Form, Modal, Select } from 'antd';

import { FC, Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCity, fetchDistrictbyIdCity, getAllByIdHospital, getAllDoctor, getAllMedia, getByIdDepartment } from '../../../features/patientSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { STATUS } from '../../../utils';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const { RangePicker } = DatePicker;
interface IProps{
    hospitalId: any,
    onFinish?: any
}
const ModalSearch: FC<IProps> = (props) => {
    const {hospitalId, onFinish} = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    
    const { patient } = useSelector((state: RootState) => state);
    const {t } = useTranslation(['BCCTDVKH','DSDangKyHen'])

    useEffect(() => {
        dispatch(fetchCity())
        if (hospitalId) {
            dispatch(getAllDoctor(Number(hospitalId)))
            dispatch(getAllByIdHospital(Number(hospitalId)))
            dispatch(getAllMedia(Number(hospitalId)));
        }
    }, [hospitalId, dispatch])

    const showModal = () => {
      setIsModalOpen(true);
    };
  
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    

    const handleChangeDiseases = (e: any) => {
        dispatch(getByIdDepartment({ hospitalId, departmentId: e }))
        form.setFieldsValue({ diseasesId: undefined });
    }

    const handleChangeCity = (e: number) => {
        dispatch(fetchDistrictbyIdCity( e ))
        form.setFieldsValue({ districtId: undefined });
    }

    const onclickClose = (event: any) => {
        event.preventDefault();
        setIsModalOpen(false);
    }
    return <Fragment>
       <Button type="primary" onClick={showModal}>
         {t("DSDangKyHen:tim_kiem")}
      </Button>
      <Modal title= {t("DSDangKyHen:tim_kiem")} open={isModalOpen}  onCancel={handleCancel} footer={false} >
      <Form
                form={form}
                {...layout}
                name="search_form"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                 variant="filled"
                 size="middle"
            >
               
                <Form.Item name="created_at" label= {t("DSDangKyHen:thoi_gian_them")}>
                    <RangePicker className='w-[100%]' />
                </Form.Item>
                <Form.Item name="appointmentTime" label= {t("DSDangKyHen:thoi_gian_hen")}>
                    <RangePicker className='w-[100%]' />
                </Form.Item>
                <Form.Item name="doctorId" label= {t("DSDangKyHen:bac_si")}>
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder={`---${t("DSDangKyHen:lua_chon")}---`}
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
                <Form.Item name="status" label={t("DSDangKyHen:tinh_trang_cuoc_hen")}>
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder={`---${t("DSDangKyHen:lua_chon")}---`}
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={STATUS()}
                    />
                </Form.Item>
                <Form.Item name="departmentId" label={t("DSDangKyHen:khoa")}>
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder={`---${t("DSDangKyHen:lua_chon")}---`}
                        
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
                <Form.Item name="diseasesId" label={t("DSDangKyHen:benh")}>
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder={`---${t("DSDangKyHen:lua_chon")}---`}
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
                <Form.Item name="cityId" label={t("DSDangKyHen:tinh/TP")}>
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder={`---${t("DSDangKyHen:lua_chon")}---`}
                        
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient?.city?.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                        onChange={handleChangeCity}
                    />
                </Form.Item>
                <Form.Item name="districtId" label={t("DSDangKyHen:quan/huyen")}>
                    <Select
                        allowClear
                        className='w-[100%]'
                        showSearch
                        placeholder={`---${t("DSDangKyHen:lua_chon")}---`}
                        
                        filterOption={(input, option) =>
                            typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                        }
                        options={patient?.district?.map((item: any) => {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />
                </Form.Item>
                
                <Form.Item {...tailLayout}>
                    <div className='flex items-center justify-end gap-1' >
                        <Button type="primary" htmlType="submit" variant='solid' color='primary' >{t("DSDangKyHen:tim_kiem")}</Button>
                        <Button onClick={onclickClose} variant='solid' color='danger' >{t("DSDangKyHen:thoat")}</Button>
                    </div>
                </Form.Item>
            </Form>
      </Modal>
    </Fragment>
}

export default ModalSearch