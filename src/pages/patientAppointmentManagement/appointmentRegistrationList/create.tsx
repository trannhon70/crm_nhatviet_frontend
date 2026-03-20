import type { DatePickerProps, } from 'antd';
import { DatePicker, Form, GetProps } from "antd";
import { FC, Fragment, useEffect, useState } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";

import dayjs from 'dayjs';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { patiantAPI } from "../../../apis/patient.api";
import { fetchCity, fetchDistrictbyIdCity, getAllByIdHospital, getAllDoctor, getAllMedia, getByIdDepartment, getByIdPatient, setPatient } from "../../../features/patientSlice";
import { IPatient } from "../../../interface/patient";
import { AppDispatch, RootState } from "../../../redux/store";
import FormCreateUser from "./form";
import { useTranslation } from 'react-i18next';
import { telephoneCheck } from '../../../utils';
import { getAllDisease } from '../../../features/diseaseSlice';


type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 22,
            offset: 2,
        },
    },
};


const CreateAppointmentRegistrationList: FC = () => {
    const [form] = Form.useForm();
    const navige = useNavigate()
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const { patient, users, disease } = useSelector((state: RootState) => state);
    let { id } = useParams();
    const [error, setError] = useState<any>({
        reminderTime: false,
        phone: false
    })
    const { t } = useTranslation(['DSDangKyHen'])


    useEffect(() => {
        dispatch(fetchCity());

        if (hospitalId) {
            dispatch(getAllDoctor(Number(hospitalId)))
            dispatch(getAllMedia(Number(hospitalId)));
            dispatch(getAllDisease(Number(hospitalId)))
        }

    }, [dispatch, hospitalId]);

    useEffect(() => {
        if (hospitalId) {
            dispatch(getAllByIdHospital(Number(hospitalId)))
        }
    }, [hospitalId, dispatch])

    useEffect(() => {
        if (id) {
            dispatch(getByIdPatient(Number(id)))
        }
    }, [id, dispatch])

    useEffect(() => {

        if (patient.patient.id) {
            dispatch(getByIdDepartment({ hospitalId, departmentId: patient.patient.departmentId }))
            dispatch(fetchDistrictbyIdCity(patient.patient.cityId))
            form.setFieldValue('name', patient.patient.name);
            form.setFieldValue('gender', patient.patient.gender);
            form.setFieldValue('yearOld', patient.patient.yearOld);
            form.setFieldValue('phone', patient.patient.phone);
            form.setFieldValue('content', patient.patient.content);
            form.setFieldValue('departmentId', patient.patient.departmentId);
            form.setFieldValue('diseasesId', patient.patient.diseasesId);
            form.setFieldValue('mediaId', patient.patient.mediaId);
            form.setFieldValue('cityId', patient.patient.cityId);
            form.setFieldValue('districtId', patient.patient.districtId);
            form.setFieldValue('code', patient.patient.code);
            form.setFieldValue('treatment', patient.patient.treatment ? JSON.parse(patient.patient.treatment) : []);
            form.setFieldValue('appointmentTime', patient.patient.appointmentTime == 0 ? undefined : dayjs(patient.patient.appointmentTime * 1000));
            form.setFieldValue('reminderTime', patient.patient.reminderTime == 0 ? undefined : dayjs(patient.patient.reminderTime * 1000));
            form.setFieldValue('note', patient.patient.note);
            form.setFieldValue('editregistrationTime', patient.patient.editregistrationTime == 0 ? undefined : dayjs(patient.patient.editregistrationTime * 1000));
            form.setFieldValue('status', patient.patient.status);
            form.setFieldValue('doctorId', patient.patient.doctorId);
            form.setFieldValue('record', patient.patient.record);
            form.setFieldValue('money', patient.patient.money);
        }

    }, [patient.patient.id])

    const dataBreadcrumb = [
        {

            title: t("DSDangKyHen:quan_ly_cuoc_hen"),
        },
        {
            type: 'separator',
        },
        {
            href: '/danh-sach-dang-ky-hen',
            title: t("DSDangKyHen:danh_sach_dang_ky_hen"),
        },
        {
            type: 'separator',
        },
        {
            title: <>{id ? t("DSDangKyHen:cap_nhat") : t("DSDangKyHen:them_moi")}</>,
        },
    ];

    const onFinish = async (body: IPatient) => {
        if (users?.entities?.role?.id !== 3) {
            if (!telephoneCheck(body.phone)) {
                toast.warning('Số điện thoại không hợp lệ!');
                setError({
                    ...error,
                    phone: true,
                })
                return;
            }
        }

        // const appointmentTime = dayjs(body.appointmentTime).unix()
        // const reminderTime = dayjs(body.reminderTime).unix()
        // if(appointmentTime < reminderTime && !id){
        //         toast.warning('Thời gian hẹn phải lớn hơn thời gian nhắc hẹn!');
        //         setError({
        //             ...error,
        //             reminderTime: true,
        //         })
        //         return;
        // }
        const dataRef: IPatient = {
            name: body.name,
            gender: body.gender,
            yearOld: body.yearOld,
            phone: body.phone,
            content: body.content,
            diseasesId: body.diseasesId,
            departmentId: body.departmentId,
            mediaId: body.mediaId,
            cityId: body.cityId,
            districtId: body.districtId,
            code: body.code,
            appointmentTime: dayjs(body.appointmentTime).unix(),
            reminderTime: body.reminderTime ? dayjs(body.reminderTime).unix() : 0,
            note: body.note,
            editregistrationTime: body.editregistrationTime ? dayjs(body.editregistrationTime).unix() : 0,
            status: body.status,
            doctorId: body.doctorId,
            hospitalId: Number(hospitalId),
            chat: body.chat,
            treatment: body.treatment,
            record: body.record,
            money: body.money || ''
        }

        if (id) {
            try {
                const result = await patiantAPI.updatePatiant(dataRef, Number(id))
                if (result.data.statusCode === 1) {
                    toast.success('Cập nhật thành công!')
                    form.resetFields();
                    navige('/danh-sach-dang-ky-hen')
                    dispatch(setPatient({}))
                }
            } catch (error: any) {
                toast.error(`${error.response.data.message}`)
            }

        } else {
            try {
                const result = await patiantAPI.createPatiant(dataRef)
                if (result.data.statusCode === 1) {
                    toast.success('Thêm mới thành công!')
                    form.resetFields();
                    navige('/danh-sach-dang-ky-hen')
                }
            } catch (error: any) {
                toast.error(`${error.response.data.message}`)
            }
        }


    }

    const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
        console.log('onOk: ', value);
    };

    const handleChangeCity = (e: any) => {
        dispatch(fetchDistrictbyIdCity(e))
        form.setFieldsValue({ districtId: undefined });
    }

    const handleChangeDepartment = (e: any) => {
        dispatch(getByIdDepartment({ hospitalId, departmentId: e }))
        form.setFieldsValue({ diseasesId: undefined });
    }

    const onClickPrev = () => {
        navige('/danh-sach-dang-ky-hen')
    }
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className="flex items-center justify-center mt-5 " >
            <FormCreateUser
                formItemLayout={formItemLayout}
                tailFormItemLayout={tailFormItemLayout}
                form={form}
                onFinish={onFinish}
                patient={patient}
                handleChangeDepartment={handleChangeDepartment}
                handleChangeCity={handleChangeCity}
                id={Number(id)}
                onOk={onOk}
                error={error}
                setError={setError}
                onClickPrev={onClickPrev}
                disease={disease.dataAll}
                userId={users?.entities?.id}

            />
        </div>
    </Fragment>
}

export default CreateAppointmentRegistrationList