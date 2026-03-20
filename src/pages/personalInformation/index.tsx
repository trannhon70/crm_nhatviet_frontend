import { FC, Fragment } from "react";
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { Alert } from "antd";


const PersonalInformation:FC = () => {

    const dataBreadcrumb = [
        {
            title: 'Trang chủ',
        },
       
        {
            type: 'separator',
        },
        {
            title: 'Thay đổi mất khẩu',
        },
    ];
    return <Fragment>
       <BreadcrumbComponent items={dataBreadcrumb} />
        <Alert className="mt-2" message={
            <div>
                <div>Mẹo sửa đổi:</div>
                <ul style={{ listStyle: 'inside' }} >
                    <li>Do nhu cầu duy trì tính bảo mật và tính nhất quán của phần phụ trợ, tên tài khoản không thể được sửa đổi sau khi đã xác định.</li>
                    <li>Để tạo điều kiện cho người khác liên hệ với bạn, bạn nên điền thông tin cá nhân và thông tin liên hệ của mình một cách cẩn thận và trung thực.</li>

                </ul>
            </div>
        } type="warning" />
    </Fragment>
}

export default PersonalInformation