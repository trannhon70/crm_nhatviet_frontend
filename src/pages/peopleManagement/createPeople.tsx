import {
    Alert, Button, Form,
    Input,
    Select,
    Switch
} from "antd";
import { FC, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { userAPI } from "../../apis/user.api";
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { getAllHospital } from "../../features/hospitalSlice";
import { getAllRole } from "../../features/rolesSlice";
import { fecthByIdUser } from "../../features/usersSlice";
import { IUser } from "../../interface/users";
import { AppDispatch, RootState } from "../../redux/store";
import { Languege } from "../../utils";
const { Option } = Select;



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

const CreatePeople: FC = () => {
    let { id } = useParams();
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const { hospital,roles, users } = useSelector((state: RootState) => state);
    const {t } = useTranslation(['QLHT'])
    
    useEffect(() => {
        if(users.user.fullName){
            form.setFieldValue('fullName', users.user.fullName);
            form.setFieldValue('email', users.user.email);
            form.setFieldValue('language', users.user.language);
            form.setFieldValue('code', users.user.code);
            form.setFieldValue('isshow', users.user.isshow);
            try {
                const hospitalId = JSON.parse(users.user.hospitalId);
                form.setFieldValue('hospitalId', hospitalId);
            } catch (error) {
                form.setFieldValue('hospitalId', users.user.hospitalId); 
            }
            form.setFieldValue('roleId', users.user.role.id);
        }
    }, [users.user.fullName])

    useEffect(() =>{ 
        if(id){
            dispatch(fecthByIdUser(Number(id)))
        }
    }, [id, dispatch])
    
    const onFinish = async (values: any) => {
        const body = {
            email: values.email,
            fullName: values.fullName,
            hospitalId: JSON.stringify(values.hospitalId),
            isshow: values.isshow,
            language: values.language,
            roleId: values.roleId,
            password: values.password,
            code: values.code,
        } as IUser
        if(id){
           try {
                const update = await  userAPI.UpdateUserId(Number(id), body)
                if(update.data.statusCode === 1){
                    toast.success(`${t("QLHT:cap_nhat_thanh_cong")}`);
                    // navige('/quan-ly-con-nguoi');
               }
           } catch (error) {
                console.log(error);
           }
        } else {
            try {
                const result = await userAPI.create(body)
               if(result.data.statusCode === 1){
                    toast.success(`${t("QLHT:them_moi_thanh_cong")}`)
                    form.resetFields();
               }
            } catch (error : any) {
                toast.error(`${error.response.data.message}`)
            }
        }
    };


    const dataBreadcrumb = [
        {
            title: t("QLHT:quan_ly_he_thong"),
        },
        {
            type: 'separator',
        },
        {
            href: '/quan-ly-con-nguoi',
            title: t("QLHT:quan_ly_con_nguoi"),
        },
        {
            type: 'separator',
        },
        {
            title: <>{id ? t("QLHT:cap_nhat") : t("QLHT:them_moi")}</>,
        },
    ];

    useEffect(() => {
        dispatch(getAllHospital());
        dispatch(getAllRole());
      }, [dispatch ])
    
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <Alert className="mt-2" message={
            <div>
                <div>{t("QLHT:meo_sua_doi")}:</div>
                <ul style={{ listStyle: 'inside' }} >
                    <li><span className="text-red-600" >{t("QLHT:moi_muc")}</span>{t("QLHT:meo_1")} <span className="text-red-600">{t("QLHT:meo_2")}</span>{t("QLHT:meo_3")}</li>

                </ul>
            </div>
        } type="warning" />
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
                    name="fullName"
                    label={t("QLHT:ho_va_ten")}
                    rules={[{ required: true, message: t("QLHT:ho_va_ten_err"), whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: t("QLHT:email_err"),
                        },
                        {
                            required: true,
                            message: t("QLHT:email_err1"),
                        },
                    ]}
                >
                    <Input disabled={id ? true : false} />
                </Form.Item>

                <Form.Item
                    name="password"
                    label={t("QLHT:mat_khau")}
                    rules={[
                        {
                            required: id ? false : true,
                            message: t("QLHT:mat_khau_err"),
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label={t("QLHT:nhap_lai_mat_khau")}
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: id ? false : true,
                            message: t("QLHT:nhap_lai_mat_khau_err"),
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(t("QLHT:mat_khau_moi_ban_nhap_khong_khop")));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="language" label={t("QLHT:ngon_ngu")} rules={[
                    { required: true, message:t("QLHT:ngon_ngu_placeholder") , }
                ]}>
                    <Select
                        placeholder={t("QLHT:ngon_ngu_placeholder")}
                        allowClear
                    >
                        {
                            Languege().map((item: any) => {
                                return <Option key={item.value} value={item.value}>{item.label}</Option>
                            })
                        }

                    </Select>
                </Form.Item>
                <Form.Item
                    name="code"
                    label={'Mã chuyên gia'}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="isshow" label="Hoạt động" valuePropName="checked" initialValue={false}>
                    <Switch />
                </Form.Item>
                <div className="text-xl text-red-800 font-bold " >{t("QLHT:uy_quyen")}:</div>
                <Form.Item name="hospitalId" label={t("QLHT:benh_vien")} >
                    <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        //   defaultValue={['a10', 'c12']}
                        //   onChange={handleChange}
                        options={hospital.loading === 'succeeded' && hospital.hospital.map((item: any)=> {
                            return {
                                value: item.id,
                                label: item.name
                            }
                        })}
                    />
                </Form.Item>

                <Form.Item name="roleId" label={t("QLHT:chon_quyen")} >
                    <Select
                        placeholder={t("QLHT:chon_quyen")}
                        allowClear
                    >
                        {
                          roles.loading === 'succeeded' &&  roles.allRole.map((item: any) => {
                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                            })
                        }

                    </Select>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        {id ? t("QLHT:cap_nhat") : t("QLHT:them_moi")}
                    </Button>
                </Form.Item>
            </Form>
        </div>

    </Fragment>
}

export default CreatePeople