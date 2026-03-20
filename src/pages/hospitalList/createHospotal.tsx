import { FC, Fragment, useEffect } from "react";
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { hospitalAPI } from "../../apis/hospital.api";
import { toast } from "react-toastify";
import { getByIdHospital } from "../../features/hospitalSlice";
import { useTranslation } from "react-i18next";

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
const CreateHospotal: FC = () => {
    let { id } = useParams();
    const [form] = Form.useForm();
    const navige = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    const {  hospitalById } = useSelector((state: RootState) => state.hospital);
    const {t } = useTranslation(['QLHT'])

    useEffect(() =>{ 
        if(id){
            dispatch(getByIdHospital(Number(id)))
        }
    }, [id, dispatch])

    useEffect(() => {
        if(hospitalById.id){
            form.setFieldValue('name', hospitalById.name);
            form.setFieldValue('phone', hospitalById.phone);
        }
    }, [hospitalById.id])

    const dataBreadcrumb = [
        {
            title: t("QLHT:quan_ly_he_thong"),
        },
        {
            type: 'separator',
        },
        {
            href: '/danh-sach-benh-vien',
            title: t("QLHT:danh_sach_benh_vien"),
        },
        {
            type: 'separator',
        },
        {
            title: <>{id ? t("QLHT:cap_nhat") : t("QLHT:them_moi")}</>,
        },
    ];

    const onFinish = async (values: any) => {
        const body = {
            name: values.name,
            phone: values.phone
        }

        if (id) {
            const update = await hospitalAPI.updateHospital(Number(id), body)
            if(update.data.statusCode === 1){
                toast.success(`${t("QLHT:cap_nhat_thanh_cong")}`)
                navige('/danh-sach-benh-vien')
            }
        } else {
            try {
                const result = await hospitalAPI.createHospital(body);
                if(result.data.statusCode === 1){
                    toast.success(`${t("QLHT:them_moi_thanh_cong")}`)
                    form.resetFields();
                }
            } catch (error : any) {
                console.log(error)
                if(error.response.data.message === 'Tên Bệnh viện đã được đăng ký, vui lòng đăng ký tên khác!'){
                    toast.warning('Tên Bệnh viện đã được đăng ký, vui lòng đăng ký tên khác!')
                }
            }
        }

    }

    const onClickPrev = () => {
        navige('/danh-sach-benh-vien')
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
                    label={t("QLHT:ten_benh_vien")}
                    rules={[{ required: true, message:t("QLHT:ten_benh_vien_err") , whitespace: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label={t("QLHT:so_dien_thoai")}
                    rules={[{ required: true, message:t("QLHT:so_dien_thoai_err") , whitespace: true }]}
                >
                    <Input />
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        {id ? t("QLHT:cap_nhat") : t("QLHT:them_moi")}
                    </Button>
                    <Button className="ml-2" type="dashed" color="danger" variant="outlined" onClick={onClickPrev} >{t("QLHT:quay_lai")}</Button>
                </Form.Item>
            </Form>
        </div>
    </Fragment>
}

export default CreateHospotal