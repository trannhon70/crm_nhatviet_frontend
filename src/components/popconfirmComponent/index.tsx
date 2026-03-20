import type { PopconfirmProps } from 'antd';
import { Popconfirm } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MdDelete } from 'react-icons/md';

interface IPopconfirm {
  title?: any
  description?: any
  value?: any
  deleteRole?: (value: any) => void;
  text?: string
}
const PopconfirmComponent: FC<IPopconfirm> = (props) => {
  const { title, description, value, deleteRole, text } = props
  const { t } = useTranslation(['DSDangKyHen']);
  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    if (deleteRole) {
      deleteRole(value); // Ensure deleteRole is called safely
    }
  };

  const cancel: PopconfirmProps['onCancel'] = (e) => {
  };
  return <Popconfirm
    title={title}
    description={description}
    onConfirm={confirm}
    onCancel={cancel}
    okText={t("DSDangKyHen:co")}
    cancelText={t("DSDangKyHen:khong")}
     placement="topLeft"
  > {
      text ? <div className='flex items-center gap-1 ' >
        <MdDelete className='cursor-pointer' color='red' size={25} /> <span>{text}</span>
      </div> : <MdDelete className='cursor-pointer' color='red' size={25} />
    }

  </Popconfirm>
}

export default PopconfirmComponent