import { Table } from 'antd';
import { FC, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { getThongKechiTietDichVuKhachHang } from "../../../features/hospitalSlice";
import { AppDispatch, RootState } from "../../../redux/store";

const { Column, ColumnGroup } = Table;

const CustomerServiceDetailReport: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {TKDVKH} = useSelector((state: RootState) => state.hospital);
    const {t } = useTranslation(['BCCTDVKH'])

    useEffect(() => {
        dispatch(getThongKechiTietDichVuKhachHang())
    }, [dispatch])
    const dataBreadcrumb = [
        {
            title:t("BCCTDVKH:quan_ly_cuoc_hen_benh_nhan"),
        },
       
        {
            type: 'separator',
        },
        {
            title:t("BCCTDVKH:bao_cao_chi_tiet_dich_vu_khach_hang"),
        },
       
    ];
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        
    {
        TKDVKH.length > 0 && TKDVKH.map((item: any, index: number) => {
            return (
                <Fragment key={`${item.name}-${index}`}>  {/* Combined key for uniqueness */}
                    <div className="flex items-center justify-center text-lg text-red-600 p-2" style={{ textTransform: 'capitalize' }}>
                        {item.name}
                    </div>
                    <Table<any> dataSource={item.users.user || []} bordered size="middle" pagination={false}>
                        {/* ColumnGroup needs a unique key */}
                        <ColumnGroup title="" key={`fullName-${item.name}`}>
                            <Column title={t("BCCTDVKH:tu_van_vien")} dataIndex="fullName" key="fullName" />
                        </ColumnGroup>
                        <ColumnGroup title={t("BCCTDVKH:hom_nay")} key={`today-${item.name}`}>
                            <Column title={t("BCCTDVKH:tong_cong")} dataIndex="today" key="today-total" render={(value) => <>{value.total}</>} />
                            <Column title={t("BCCTDVKH:da_den")} dataIndex="today" key="today-arrived" render={(value) => <>{value.totalArrived}</>} />
                            <Column title={t("BCCTDVKH:chua_den")} dataIndex="today" key="today-notArrived" render={(value) => <>{value.totalNotArrived}</>} />
                        </ColumnGroup>
                        <ColumnGroup title={t("BCCTDVKH:hom_qua")} key={`yesterday-${item.name}`}>
                            <Column title={t("BCCTDVKH:tong_cong")} dataIndex="yesterday" key="yesterday-total" render={(value) => <>{value.total}</>} />
                            <Column title={t("BCCTDVKH:da_den")} dataIndex="yesterday" key="yesterday-arrived" render={(value) => <>{value.totalArrived}</>} />
                            <Column title={t("BCCTDVKH:chua_den")} dataIndex="yesterday" key="yesterday-notArrived" render={(value) => <>{value.totalNotArrived}</>} />
                        </ColumnGroup>
                        <ColumnGroup title={t("BCCTDVKH:thang_nay")} key={`thisMonth-${item.name}`}>
                            <Column title={t("BCCTDVKH:tong_cong")} dataIndex="thisMonth" key="thisMonth-total" render={(value) => <>{value.total}</>} />
                            <Column title={t("BCCTDVKH:da_den")} dataIndex="thisMonth" key="thisMonth-arrived" render={(value) => <>{value.totalArrived}</>} />
                            <Column title={t("BCCTDVKH:chua_den")} dataIndex="thisMonth" key="thisMonth-notArrived" render={(value) => <>{value.totalNotArrived}</>} />
                        </ColumnGroup>
                        <ColumnGroup title={t("BCCTDVKH:thang_truoc")} key={`lastMonth-${item.name}`}>
                            <Column title={t("BCCTDVKH:tong_cong")} dataIndex="lastMonth" key="lastMonth-total" render={(value) => <>{value.total}</>} />
                            <Column title={t("BCCTDVKH:da_den")} dataIndex="lastMonth" key="lastMonth-arrived" render={(value) => <>{value.totalArrived}</>} />
                            <Column title={t("BCCTDVKH:chua_den")} dataIndex="lastMonth" key="lastMonth-notArrived" render={(value) => <>{value.totalNotArrived}</>} />
                        </ColumnGroup>
                    </Table>
                </Fragment>
            );
        })
    }
    

        
    </Fragment>
}

export default CustomerServiceDetailReport