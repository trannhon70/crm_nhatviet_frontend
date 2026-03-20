import type { GetProps, TableProps } from 'antd';
import { Button, Input, Tag } from 'antd';
import { FC, Fragment, useEffect, useState } from "react";
import { HiPencilSquare } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import Loading from '../../components/loading';
import PopconfirmComponent from '../../components/popconfirmComponent';
import TableComponent from "../../components/tableComponent";
import { fetchGetPaging, setRoleData } from '../../features/rolesSlice';
import { AppDispatch, RootState } from '../../redux/store';
import { rolesAPI } from '../../apis/roles.api';
import { toast } from 'react-toastify';
import useMenuData from '../../hooks/useMenuData';
import { useTranslation } from 'react-i18next';
const moment = require('moment');



type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const RightsManagement: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navige = useNavigate()
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(50)
  const [search] = useState<string>('')
  const { data, total,loading } = useSelector((state: RootState) => state.roles);
  const menu = useMenuData();
  const {t } = useTranslation(['QLHT'])

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    dispatch(fetchGetPaging({ pageSize, pageIndex, search : value }));
  };

  const dataBreadcrumb = [
    {
      href: '/quan-ly-quyen',
      title: t("QLHT:quan_ly_he_thong"),
    },
    {
      type: 'separator',
    },
    {
      title: t("QLHT:quan_ly_quyen"),
    },
  ];

  useEffect(() => {
    dispatch(fetchGetPaging({ pageSize, pageIndex, search }));
  }, [dispatch, pageSize,pageIndex , search])

  const columns: TableProps<any>['columns'] = [
    {
      title: t("QLHT:stt"),
      dataIndex: 'age',
      key: 'age',
      render(value, record, index) {
        return <Fragment>{index + 1}</Fragment>
      },
    },
    {
      title: t("QLHT:ten_quyen"),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t("QLHT:nguoi_dung_hien_tai") ,
      key: 'users',
      dataIndex: 'users',
      render(value, record, index) {
        return <Fragment>
            {
              value.map((item : any, index:number)=>{
                return <Fragment  key={index}><Tag className='text-base' style={{textTransform:'capitalize'}}  color='gold-inverse' >{item.fullName}</Tag > | </Fragment>
              })
            }
        </Fragment>
      },
    },
    {
      title: t("QLHT:thoi_gian_tao"),
      key: 'created_at',
      dataIndex: 'created_at',
      render(value, record, index) {
        return <Fragment>{moment(value * 1000).format('DD-MM-YYYY')}</Fragment>
      },
    },
    {
        title:t("QLHT:thao_tac") ,
        key: 'id',
        dataIndex: 'id',
        render(value, record, index) {
            // if(record.id !== 1){
              return <div className='flex gap-4 ' >
                {
                  record.id !== 1 &&  menu?.[6].ds?.action_QLQ.delete === true && <PopconfirmComponent 
                   title ={<>{t("QLHT:xoa")}  {record.name}</>} 
                   description= {t("QLHT:ban_co_chac_muon_xoa_quyen")}
                   value={value}
                   deleteRole={deleteRole}
                 />
                }
                {
                   menu?.[6].ds?.action_QLQ.update === true && 
                   <HiPencilSquare onClick={() => onClickEdit(value)} className='cursor-pointer text-green-700 ' color='primary' size={25} />
                }
           
            
          </div>
            // }
          
          
        },
      },
  ];

  const onClickCreate = () => {
    navige('/quan-ly-quyen/them-moi');
    dispatch(setRoleData({}))
  }

  const onChangePage = (page: number, pageSize:number) => {
    setPageIndex(page)
    setPageSize(pageSize)
  }

  const deleteRole = async (id: any) => {
      try {
          const result = await rolesAPI.deleteRole(id)
          if(result.data.statusCode === 1){
            toast.success(`${t("QLHT:xoa_thanh_cong")}`)
            dispatch(fetchGetPaging({ pageSize, pageIndex, search }));
          }
      } catch (error) {
        console.log(error);
        
      }
  }

  const onClickEdit = (id: number)=>{
      navige(`/quan-ly-quyen/cap-nhat/${id}`)
  }

  return (
    <Fragment>
      <BreadcrumbComponent items={dataBreadcrumb} />
      <div className='mt-2 pb-2 flex justify-between ' >
        <Search className='w-[250px]' placeholder={t("QLHT:nhap_ten_quyen")} onSearch={onSearch} enterButton />
        {
          menu?.[6].ds?.action_QLQ.create === true && <Button onClick={onClickCreate} type="primary">{t("QLHT:them_moi")}</Button>
        }
        
      </div>
      {
        loading === 'succeeded' ? <TableComponent columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
      }
    </Fragment>
  );
}

export default RightsManagement;
