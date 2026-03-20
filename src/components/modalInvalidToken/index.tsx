import { Button, Modal, Result } from 'antd';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ModalInvalidToken: FC = () => {
    const invalidToken = useSelector((state: RootState) => state.users.invalidToken);
  
  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
  };

  return (
    <>
      
      <Modal title="Thông báo" open={invalidToken}  footer={true } >
        <Result
            status="500"
            title="Phiên đăng nhập của bạn đã hết hạn"
            subTitle="Bạn vui lòng đăng nhập lại, để tiếp tục sử dụng hệ thống"
            extra={<Button onClick={handleLogout} type="primary">Đăng xuất</Button>}
        />
      </Modal>
    </>
  );
}

export default ModalInvalidToken