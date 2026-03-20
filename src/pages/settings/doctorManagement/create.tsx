import { Button, Form, Input } from "antd";
import { FC, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doctorAPI } from "../../../apis/doctor.api";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { getByIdDoctor } from "../../../features/doctorSlice";
import { AppDispatch, RootState } from "../../../redux/store";

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
            span: 16,
            offset: 8,
        },
    },
};
const CreateDocTor:FC = () => {
    let { id } = useParams();
    const navige = useNavigate()
    const [form] = Form.useForm();
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const { doctor} = useSelector((state: RootState) => state.doctor);
    const {t } = useTranslation(['setting'])

    useEffect(() =>{ 
        if(id){
            dispatch(getByIdDoctor(Number(id)))
        }
    }, [id, dispatch])

    useEffect(() => {
        if(doctor.id){
            form.setFieldValue('name', doctor.name)
            form.setFieldValue('doctor_office', doctor.doctor_office)
        }
    }, [doctor.id])


    const dataBreadcrumb = [
        {
            title: t("setting:cai_dat"),
        },
        {
            type: 'separator',
        },
        {
            href: '/thiet-lap-bac-si',
            title: t("setting:quan_ly_bac_si"),
        },
        {
            type: 'separator',
        },
        {
            title: <>{id ? t("setting:cap_nhat") : t("setting:them_moi")}</>,
        },
    ];

    const onFinish = async(values: any) => {
        const body = {
            doctor_office: values.doctor_office,
            name: values.name,
            hospitalId: hospitalId
        }

        if(id){
            const update = await doctorAPI.updateDoctor(Number(id), body)
            if(update.data.statusCode === 1){
                toast.success(`${t("setting:cap_nhat_thanh_cong")}`)
                navige('/thiet-lap-bac-si')
            }
        } else {
            try {
                const result = await doctorAPI.createdoctor(body);
                if(result.data.statusCode === 1){
                    toast.success(`${t("setting:them_moi_thanh_cong")}`)
                    form.resetFields();
                }
            } catch (error) {
                console.log(error)
            }
        }
        
    }
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className="flex items-center justify-center mt-5 " >
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{ maxWidth: 1000, width: 500 }}
                scrollToFirstError
                size="middle"
            >
                
                <Form.Item
                    name="name"
                    label={t("setting:ten_bac_si")}
                    rules={[{ required: true, message: t("setting:ten_bac_si_err"), whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="doctor_office"
                    label={t("setting:phong")}
                    rules={[{ required: true, message: t("setting:phong_err"), whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                    {id ? t("setting:cap_nhat") : t("setting:them_moi")} 
                    </Button>
                </Form.Item>
            </Form>
            </div>
    </Fragment>
}

export default CreateDocTor