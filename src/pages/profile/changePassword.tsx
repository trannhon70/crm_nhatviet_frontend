import { Alert, Button, Form, Input } from "antd";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userAPI } from "../../apis/user.api";
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { RootState } from "../../redux/store";

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
const ChangePassword: FC = () => {
    const [form] = Form.useForm();
    const {id } = useSelector((state: RootState) => state.users.entities);
    const {t } = useTranslation(['profile'])

    const dataBreadcrumb = [
        {
            title: t("profile:trang_chu"),
        },
        {
            type: 'separator',
        },
        {
            title: t("profile:thay_doi_mat_khau"),
        },

    ];

    const onFinish = async (values: any) => {
        try {
            const result = await userAPI.resetPassword(id, values)
            if(result?.data?.error?.message === "Mật khẩu gốc không đúng"){
                toast.warning(`${t("profile:mat_khau_goc_khong_dung")}`);
            }
            if(result?.data?.statusCode === 1){
                toast.success(`${t("profile:cap_nhat_thanh_cong")}`);
           }
        } catch (error) {
            console.log(error);
            
        }
        

    }
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <Alert className="mt-2" message={
            <div>
                <div>{t("profile:meo_sua_doi")}:</div>
                <ul style={{ listStyle: 'inside' }} >
                    <li>{t("profile:meo_1")}</li>
                    <li>{t("profile:meo_2")}</li>

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
                    name="password"
                    label={t("profile:mat_khau_goc")}
                    rules={[{ required: true, message: `${t("profile:vui_long_nhap_mat_khau_cua_ban")}`, whitespace: true }]}
                >
                    <Input.Password />
                </Form.Item>
                

                <Form.Item
                    name="passwordnew"
                    label={t("profile:mat_khau_moi")}
                    rules={[
                        {
                            required: true,
                            message: `${t("profile:vui_long_nhap_mat_khau_moi_cua_ban")}`,
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label={t("profile:nhap_lại_mat_khau_moi")}
                    dependencies={['passwordNew']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: `${t("profile:vui_long_xac_nhap_mat_khau_moi_cua_ban")}` ,
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('passwordnew') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(`${t("profile:mat_khau_moi_ban_nhap_khong_khop")}`));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                         {t("profile:cap_nhat")}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </Fragment>
}

export default ChangePassword