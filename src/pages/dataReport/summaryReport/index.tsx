import type { TableProps } from 'antd';
import { Table } from 'antd';
import { FC, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { getBaoCaoTongHop } from "../../../features/dataReportSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import NotHospital from '../../../components/notHospital';
import { useTranslation } from 'react-i18next';

interface DataYear {
    key: string;
    year: number;
    total: number;
    daDen: number;
    chuaDen: number;
    tile: number;
}

interface DataMonths {
    key: string;
    year: number;
    total: number;
    daDen: number;
    chuaDen: number;
    tile: number;
}


const SummaryReport: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { resultMonth, resultYear } = useSelector((state: RootState) => state.dataReport);
    const hospitalId = localStorage.getItem('hospitalId')
    const {t } = useTranslation(['baoCaoDuLieu','DSDangKyHen'])

    useEffect(() => {
        if (hospitalId) {
            dispatch(getBaoCaoTongHop({ hospitalId: hospitalId }))
        }
    }, [dispatch, hospitalId])

    const dataBreadcrumb = [
        {
            title: t("baoCaoDuLieu:bao_cao_du_lieu") ,
        },
        {
            type: 'separator',
        },
        {

            title: t("baoCaoDuLieu:bao_cao_tong_hop_theo_thoi_gian_hen") ,
        },

    ];

    const columns: TableProps<DataYear>['columns'] = [
        {
            title: t("baoCaoDuLieu:năm") ,
            dataIndex: 'year',
            key: 'year',
            render: (text) => <a>{text}</a>,
        },
        {
            title: t("baoCaoDuLieu:tong"),
            dataIndex: 'total',
            key: 'total',
            render: (text) => <a>{text}</a>,
        },
        {
            title: t("baoCaoDuLieu:da_den") ,
            dataIndex: 'daDen',
            key: 'daDen',
        },
        {
            title: t("baoCaoDuLieu:chua_den") ,
            dataIndex: 'chuaDen',
            key: 'chuaDen',
        },
        {
            title: t("baoCaoDuLieu:ty_le") ,
            dataIndex: 'tile',
            key: 'tile',
            render(value, record, index) {
                return <>{value > 0 ? value.toFixed(2) : 0} %</>
            },
        },

    ];

    const columnsMonths: TableProps<DataMonths>['columns'] = [
        {
            title: t("baoCaoDuLieu:thang") ,
            dataIndex: 'month',
            key: 'month',
            render: (text) => <a>{text}</a>,
        },
        {
            title:t("baoCaoDuLieu:tong") ,
            dataIndex: 'total',
            key: 'total',
            render: (text) => <a>{text}</a>,
        },
        {
            title: t("baoCaoDuLieu:da_den") ,
            dataIndex: 'daDen',
            key: 'daDen',
        },
        {
            title:t("baoCaoDuLieu:chua_den") ,
            dataIndex: 'chuaDen',
            key: 'chuaDen',
        },
        {
            title: t("baoCaoDuLieu:ty_le") ,
            dataIndex: 'tile',
            key: 'tile',
            render(value, record, index) {
                return <>{value > 0 ? value.toFixed(2) : 0} %</>
            },
        },

    ];

    return <Fragment>
        {
            hospitalId ? <>
                <BreadcrumbComponent items={dataBreadcrumb} />
                <div className="mt-2 mb-2 font-bold text-lg text-lime-700 " >
                  {t("baoCaoDuLieu:thong_ke_theo_nam")}  
                </div>
                <Table<DataYear> columns={columns} dataSource={resultYear || []} size="middle" bordered pagination={false} />

                <div className="mt-2 mb-2 font-bold text-lg text-lime-700 " >
                  {t("baoCaoDuLieu:thong_ke_theo_thang")}  
                </div>
                <Table<DataMonths> columns={columnsMonths} dataSource={resultMonth || []} size="middle" bordered pagination={false} />
            </> : <NotHospital />
        }

    </Fragment>
}


export default SummaryReport