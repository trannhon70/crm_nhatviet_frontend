import { Button, DatePicker, Form, Input, Select } from "antd";
import { FC, Fragment, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { STATUS } from "../../../utils";
import { getByIdDepartment, getPagingPatient, setPatient } from "../../../features/patientSlice";
import useMenuData from "../../../hooks/useMenuData";
import ImportExcel from "../../../components/ImportExcel";
import ExportExcel from "../../../components/exportExcel";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { getAllDisease } from "../../../features/diseaseSlice";
import { debounce } from 'lodash';

const { RangePicker } = DatePicker;
interface Iprops {
    setPageIndex: any,
    pageSize: number,
    pageIndex: number,
    query: any,
    setQuery: any
}
const FormSearch: FC<Iprops> = (props) => {
    const { setPageIndex, pageIndex, pageSize, query, setQuery } = props
    const navige = useNavigate()
    const { t } = useTranslation(['DSDangKyHen']);
    const { patient, disease } = useSelector((state: RootState) => state);
    const dispatch = useDispatch<AppDispatch>();
    const hospitalId = localStorage.getItem('hospitalId')
    const menu = useMenuData();

    useEffect(() => {
        if(hospitalId) {
            dispatch(getAllDisease(Number(hospitalId)))
        }
    }, [hospitalId])

    const handleChangeDepartment = (e: any) => {
        setQuery((query: any) => ({
            ...query,
            departmentId: e ? e : ''
        }))
        dispatch(getByIdDepartment({ hospitalId, departmentId: e }))
    }

    const onChangeKeyWord = useCallback(
        debounce((value: string) => {
            setQuery((prevQuery: any) => ({
                ...prevQuery,
                search: value
            }));
        }, 300), // Debounce 300ms
        []
    );

    const onchangecreatedAt = (e: any) => {
        setQuery((query: any) => ({
            ...query,
            created_at: e ?  JSON.stringify([dayjs(e?.[0]).unix(), dayjs(e?.[1]).unix()]) : '' ,
        }))
    }

    const onchangeAppointmentTime = (e: any) => {
        setQuery((query: any) => ({
            ...query,
            appointmentTime: e ?  JSON.stringify([dayjs(e?.[0]).unix(), dayjs(e?.[1]).unix()]) : '' ,
        }))
    }

    const onchangeDoctor = (e: any) => {
        setQuery((query: any) => ({
            ...query,
            doctorId: e ? e : '',
        }))
    }

    const onchangeStatus = (e: any) => {
        setQuery((query: any) => ({
            ...query,
            status: e ? e : '',
        }))
    }

    const handleChangeDiseases = (e: any) => {
        setQuery((query: any) => ({
            ...query,
            diseasesId: e ? e : ''
        }))
    }

    const handleChangeMedia = (e: any) => {
        setQuery((query: any) => ({
            ...query,
            mediaId: e ? e : ''
        }))
    }

    const onFormSubmit = (e: any) => {
        setPageIndex(1)
        dispatch(getPagingPatient(query))
    }

    const onClickCreate = () => {
        navige('/danh-sach-dang-ky-hen/them-moi');
        dispatch(setPatient({}))
    }
    return <Fragment>
        <Form onFinish={onFormSubmit} className="flex items-end justify-start gap-2 flex-wrap " >
            <div className='w-[250px]'>
                <div>{t("DSDangKyHen:tu_khoa")} :</div>
                <Input onChange={(e) => onChangeKeyWord(e.target.value)} size='small' placeholder={t("DSDangKyHen:tu_khoa_placeholder")} />
            </div>
            <div className='w-[220px]'>
                <div>{t("DSDangKyHen:thoi_gian_them")}:</div>
                <RangePicker onChange={onchangecreatedAt} size="small" className='w-[100%]' />
            </div>
            <div className='w-[220px]'>
                <div>{t("DSDangKyHen:thoi_gian_hen")}:</div>
                <RangePicker onChange={onchangeAppointmentTime} size="small" className='w-[100%]' />
            </div>
            <div className='w-[130px]'>
                <div>{t("DSDangKyHen:bac_si")}:</div>
                <Select
                    size="small"
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
                    onChange={onchangeDoctor}
                />
            </div>
            <div className='w-[150px]'>
                <div>{t("DSDangKyHen:tinh_trang_cuoc_hen")}:</div>
                <Select
                    size="small"
                    allowClear
                    className='w-[100%]'
                    showSearch
                    placeholder={`--${t("DSDangKyHen:lua_chon")}--`}
                    filterOption={(input, option) =>
                        typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={STATUS()}
                    onChange={onchangeStatus}
                />
            </div>
            <div className='w-[150px]'>
                <div>{t("DSDangKyHen:khoa")}:</div>
                <Select
                    size="small"
                    allowClear
                    className='w-[100%]'
                    showSearch
                    placeholder={`--${t("DSDangKyHen:lua_chon")}--`}
                    filterOption={(input, option) =>
                        typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={patient?.department?.map((item: any) => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                    })}
                    onChange={handleChangeDepartment}
                />
            </div>
            <div className='w-[150px]'>
                <div>{t("DSDangKyHen:benh")}:</div>
                <Select
                    size="small"
                    allowClear
                    className='w-[100%]'
                    showSearch
                    placeholder={`--${t("DSDangKyHen:lua_chon")}--`}
                    filterOption={(input, option) =>
                        typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={disease.dataAll?.map((item: any) => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                    })}
                    onChange={handleChangeDiseases}
                />
            </div>
            <div className='w-[150px]'>
                <div>{t("DSDangKyHen:nguon_den")}:</div>
                <Select
                    size="small"
                    allowClear
                    className='w-[100%]'
                    showSearch
                    placeholder={`--${t("DSDangKyHen:lua_chon")}--`}
                    filterOption={(input, option) =>
                        typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    options={patient?.media?.map((item: any) => {
                        return {
                            value: item.id,
                            label: item.name
                        }
                    })}
                    onChange={handleChangeMedia}
                />
            </div>
            <div>
                <Button size='small' htmlType="submit" type="primary" variant="dashed" color="primary" >
                    {t("DSDangKyHen:tim_kiem")}
                </Button>
            </div>
            {
                menu?.[1].ds?.action_DSDKH.excel === true ? <div className="flex gap-2 " >
                    <ImportExcel getPagingPatient={getPagingPatient(query)} />
                    <ExportExcel csvData={[]} fileName="file_mau" headers={['Họ và tên', 'Giới tính', 'Nhập tuổi', 'Nhập số điện thoại', 'Nội dung tư vấn', 'Mã chuyên gia', 'Mục điều trị', 'Thời gian hẹn (dd/mm/yyyy)', 'Thời gian nhắc hẹn (dd/mm/yyyy)', 'Ghi chú', 'Sửa thời gian đăng ký (dd/mm/yyyy)', 'Trạng thái', 'Nội dung tiếp nhận', 'Nhập hồ sơ thăm khám']} />
                </div> : ""
            }
            {
                menu?.[1].ds?.action_DSDKH.create === true ? <Button size="small" onClick={onClickCreate} type="primary">{t("DSDangKyHen:them_moi")}</Button> : ''
            }
        </Form>
    </Fragment>
}

export default FormSearch