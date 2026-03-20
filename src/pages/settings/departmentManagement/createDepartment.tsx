import { Button, Form, Input } from "antd";
import { FC, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { departmentAPI } from "../../../apis/department.api";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { getByIdDepartment } from "../../../features/departmentSlice";
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

const CreateDepartment: FC = () =>{
    let { id } = useParams();
    const [form] = Form.useForm();
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const { department } = useSelector((state: RootState) => state.department);
    const navige = useNavigate()
    const {t } = useTranslation(['setting'])

    useEffect(()=>{
        
        if(id){
            dispatch(getByIdDepartment(Number(id)))
        }
    }, [id, dispatch])

    useEffect(() => {
        if(department.id){
            form.setFieldValue('name', department.name)
            
        }
    }, [department.id])

    const dataBreadcrumb = [
        {
            title: t("setting:cai_dat"),
        },
        {
            type: 'separator',
        },
        {
            href: '/quan-ly-khoa',
            title: t("setting:quan_ly_khoa"),
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
            name: values.name,
            hospitalId: hospitalId
        }

        if(id){
            const update = await departmentAPI.updateDepartment(Number(id), body)
            if(update.data.statusCode === 1){
                toast.success(`${t("setting:cap_nhat_thanh_cong")}`)
                navige('/quan-ly-khoa')
            }
        }else {
            try {
                const result = await departmentAPI.createDepartment(body);
                if(result.data.statusCode === 1){
                    toast.success(`${t("setting:them_moi_thanh_cong")}`)
                    form.resetFields();
                }
            } catch (error) {
                console.log(error);
                
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
                    label={t("setting:ten_khoa")}
                    rules={[{ required: true, message:t("setting:ten_khoa_err") , whitespace: true }]}
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

export default CreateDepartment