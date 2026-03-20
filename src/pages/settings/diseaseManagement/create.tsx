import { Button, Form, Input, Select } from "antd";
import { FC, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { diseaseAPI } from "../../../apis/disease.api";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { getAllByIdHospital } from "../../../features/departmentSlice";
import { getByIdDisease } from "../../../features/diseaseSlice";
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


const CreateDiseaseManagement: FC =() => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const hospitalId = localStorage.getItem('hospitalId')
    const { department, disease } = useSelector((state: RootState) => state);
    let { id } = useParams();
    const navige = useNavigate();
    const {t } = useTranslation(['setting']);

    useEffect(() => {
        if(disease.disease.id){
            form.setFieldValue('name', disease.disease.name)
            form.setFieldValue('departmentId', disease.disease.departmentId)
        }
    }, [disease.disease.id])
    useEffect(() =>{ 
        if(id){
            dispatch(getByIdDisease(Number(id)))
        }
    }, [id, dispatch])

    useEffect(() => {
        if(hospitalId){
            dispatch(getAllByIdHospital(Number(hospitalId)))
        }
        
    }, [dispatch,hospitalId])

    const dataBreadcrumb = [
        {
            title: t("setting:cai_dat"),
        },
        {
            type: 'separator',
        },
        {
            href: '/thiet-lap-benh-tat',
            title: t("setting:thiet_lap_benh"),
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
            departmentId: values.departmentId,
            name: values.name,
            hospitalId: hospitalId
        }
        if(id){
            const update = await diseaseAPI.updateDisease(Number(id), body)
            if(update.data.statusCode === 1){
                toast.success(`${t("setting:cap_nhat_thanh_cong")}`)
                navige('/thiet-lap-benh-tat')
            }
        }else {
            try {
                const result = await diseaseAPI.createdisease(body);
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
                <Form.Item name="departmentId" label={t("setting:chuyen_khoa")} rules={[
                    { required: true, message:t("setting:chuyen_khoa_err") , }
                ]}>
                    <Select
                        style={{textTransform:'capitalize'}}
                        placeholder={t("setting:chuyen_khoa_placeholder")}
                        allowClear
                        options={department.loading==='succeeded' && department.dataAll.map((item: any,index:number)=> {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    >
                    </Select>
                </Form.Item>
                <Form.Item
                    name="name"
                    label={t("setting:ten_benh")}
                    rules={[{ required: true, message:t("setting:ten_benh_err") , whitespace: true }]}
                >
                    <Input />
                </Form.Item>
               

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      {id ? t("setting:cap_nhat"): t("setting:them_moi")} 
                    </Button>
                </Form.Item>
            </Form>
            </div>
    </Fragment>
}

export default CreateDiseaseManagement