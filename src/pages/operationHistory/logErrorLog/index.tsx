import { FC, Fragment, useEffect, useState } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { GetProps, Input, TableProps } from "antd";
import TableComponent from "../../../components/tableComponent";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import Loading from "../../../components/loading";
import { getPagingHistoryLogin } from "../../../features/historyLoginSlice";
import useMenuData from "../../../hooks/useMenuData";
import PopconfirmComponent from "../../../components/popconfirmComponent";
import { historyLoginAPI } from "../../../apis/historyLogin.api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;


const LogErrorLog: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const { data, total, loading } = useSelector((state: RootState) => state.historyLogin);
    const menu = useMenuData();
    const {t } = useTranslation(['history','setting']);

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        dispatch(getPagingHistoryLogin({ pageSize, pageIndex, search : value, action: 'ERROR' }));
    };

    useEffect(() => {
        dispatch(getPagingHistoryLogin({ pageSize, pageIndex, search : '', action: 'ERROR' }))
    }, [dispatch,pageSize, pageIndex])

    const dataBreadcrumb = [
        {
            href: '/nhat-ky-hoat-dong',
            title: t("history:lich_su_thao_tac"),
        },
        {
            type: 'separator',
        },
        {
            title: t("history:nhat_ky_loi_dang_nhap"),
        },
    ];

    const columns: TableProps<any>['columns'] = [
        {
            title: t("history:stt"),
            dataIndex: 'age',
            key: 'age',
            render(value, record, index) {
                return <Fragment>{index + 1}</Fragment>
            },
        },
       

        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',

        },
        {
            title: t("history:mat_khau"),
            key: 'password',
            dataIndex: 'password',

        },
        {
            title: t("history:loi"),
            key: 'error',
            dataIndex: 'error',

        },
        {
            title: t("history:dia_chi_ip"),
            key: 'ip',
            dataIndex: 'ip',

        },
        {
            title: t("history:thoi_gian"),
            key: 'created_at',
            dataIndex: 'created_at',
            render(value, record, index) {
                return <Fragment>{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</Fragment>
            },
        },
        {
            title: t("history:thao_tac"),
            key: 'id',
            dataIndex: 'id',
            render(value, record, index) {

                return <div className='flex gap-4 ' >
                    {
                         menu?.[7].ds?.action_NKHD.delete === true ?  <PopconfirmComponent
                         title={<>{t("history:xoa_lich_su")} {record.ip}</>}
                         description={t("history:ban_co_chac_chan_muon_xoa_lich_su")}
                         value={value}
                         deleteRole={deleteHistoryLogin}
                     /> : null
                    }
                   
                </div>
            },
        },
       
    ];

    const deleteHistoryLogin = async (id: number) => {
        try {
            const result = await historyLoginAPI.deleteHistory(id)
            if (result.data.statusCode === 1) {
              toast.success(`${t("setting:xoa_thanh_cong")}`)
              dispatch(getPagingHistoryLogin({ pageSize, pageIndex, search : '', action: 'ERROR' }))
            }
          } catch (error) {
            console.log(error);
          }
        
    }

    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
    }
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className='mt-2 pb-2 flex justify-between ' >
            <Search className='w-[250px]' placeholder={t("history:dia_chi_ip")} onSearch={onSearch} enterButton />
        </div>
        {
            loading === 'succeeded' ? <TableComponent columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
        }
    </Fragment>
}


export default LogErrorLog