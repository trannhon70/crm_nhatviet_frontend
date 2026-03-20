import type { GetProps, TableProps } from 'antd';
import { Button, Input } from "antd";
import moment from "moment";
import { FC, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiPencilSquare } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { hospitalAPI } from "../../apis/hospital.api";
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import Loading from "../../components/loading";
import PopconfirmComponent from "../../components/popconfirmComponent";
import TableComponent from "../../components/tableComponent";
import { fetchGetPaging, setHospitalById } from "../../features/hospitalSlice";
import useMenuData from "../../hooks/useMenuData";
import { AppDispatch, RootState } from "../../redux/store";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

const HospitalList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navige = useNavigate()
  const [pageIndex, setPageIndex] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(50)
  const [search] = useState<string>('')
  const { data, total, loading } = useSelector((state: RootState) => state.hospital);
  const menu = useMenuData();
  const {t } = useTranslation(['QLHT']);

  useEffect(() => {
    dispatch(fetchGetPaging({ pageSize, pageIndex, search }));
  }, [dispatch, pageSize, pageIndex])

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    dispatch(fetchGetPaging({ pageSize, pageIndex, search: value }));
  };

  const dataBreadcrumb = [
    {
      href: '/danh-sach-benh-vien',
      title: t("QLHT:quan_ly_he_thong"),
    },
    {
      type: 'separator',
    },
    {
      title: t("QLHT:danh_sach_benh_vien"),
    },
  ];

  const onClickCreate = () => {
    navige('/danh-sach-benh-vien/them-moi');
    dispatch(setHospitalById({}))
  }

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
      title: t("QLHT:ten_benh_vien"),
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: t("QLHT:nguoi_tao"),
      key: 'author',
      dataIndex: 'author',

    },
    {
      title: t("QLHT:thoi_gian_tao"),
      key: 'created_at',
      dataIndex: 'created_at',
      render(value, record, index) {
        return <Fragment>{moment(value * 1000).format('DD-MM-YYYY hh:ss')}</Fragment>
      },
    },
    {
      title: t("QLHT:thao_tac"),
      key: 'id',
      dataIndex: 'id',
      render(value, record, index) {
        return <div className='flex gap-4 ' >
          {
            menu?.[6].ds?.action_DSBV.delete === true ?
              <PopconfirmComponent
                title={<>{t("QLHT:xoa_benh_vien")} {record.name}</>}
                description={t("QLHT:ban_co_chac_muon_xoa_benh_vien")}
                value={value}
                deleteRole={deleteHospital}
              />
              : null
          }
          {
            menu?.[6].ds?.action_DSBV.update === true ?
              <HiPencilSquare
                onClick={() => onClickEdit(value)}
                className='cursor-pointer text-green-700 ' color='primary' size={25} />
              : null}
        </div>
      },
    },
  ];

  const onChangePage = (page: number, pageSize: number) => {
    setPageIndex(page)
    setPageSize(pageSize)
  }

  const deleteHospital = async (value: number) => {
    try {
      const result = await hospitalAPI.deleteHospital(value)
      if (result.data.statusCode === 1) {
        toast.success(`${t("QLHT:xoa_thanh_cong")}`)
        dispatch(fetchGetPaging({ pageSize, pageIndex, search }))
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onClickEdit = (id: number) => {
    navige(`/danh-sach-benh-vien/cap-nhat/${id}`);
  }
  return <Fragment>
    <BreadcrumbComponent items={dataBreadcrumb} />
    <div className='mt-2 pb-2 flex justify-between ' >
      <Search className='w-[250px]' placeholder={t("QLHT:nhap_ten_benh_vien")} onSearch={onSearch} enterButton />
      {
        menu?.[6].ds?.action_DSBV.create === true ?
          <Button onClick={onClickCreate} type="primary">{t("QLHT:them_moi")}</Button> : null}
    </div>
    {
      loading === 'succeeded' ? <TableComponent columns={columns} data={data || []} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
    }
  </Fragment>
}

export default HospitalList