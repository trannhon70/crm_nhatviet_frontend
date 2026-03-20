import { FC } from "react";
import { Button, Result } from 'antd';
import { useNavigate } from "react-router-dom";

const NotHospital: FC = () => {
    const navige = useNavigate()

    const onClick = () => {
        navige('/')
    }
    return <div className=" flex items-center justify-center h-[80vh] w-[100%] " >
        <Result
            status="warning"
            title="Vui lòng chọn bệnh viện để hoạt động "extra={
                <Button onClick={onClick} type="primary" key="console">
                  Đi đến bệnh viện
                </Button>
              }
        />
    </div>
}

export default NotHospital