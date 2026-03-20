import { FC, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";
import { getPagingPatientDetele } from "../../features/patientSlice";
import { Input, Table, TableProps, Tag } from "antd";
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { Link } from "react-router-dom";
import moment from "moment";
import NotHospital from "../../components/notHospital";
import TableComponent from "../../components/tableComponent";
import { MdOutlinePreview } from "react-icons/md";

const scrollProps = {
    x: 'calc(700px + 50%)',
    y: 130 * 5
};
const CustomerDeleted: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { dataDelete, total } = useSelector((state: RootState) => state.patient);
    const { t } = useTranslation(['DSDangKyHen'])
    const hospitalId = localStorage.getItem('hospitalId')
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(25)
    const [query, setQuery] = useState<any>({
        pageSize: pageSize,
        pageIndex: pageIndex,
        hospitalId: Number(hospitalId),
        search: '',
        created_at: '',
    }
    )

    useEffect(() => {
        if (hospitalId) {
            dispatch(getPagingPatientDetele(query))
        }
    }, [dispatch, hospitalId, pageIndex, pageSize, query])

    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
    }

    const columns: TableProps<any>['columns'] = [
        {
            title: t("DSDangKyHen:thao_tac"),
            dataIndex: 'delete',
            key: 'delete',
            render(value, record, index) {
                return <div className="flex items-center gap-2" >
                     
                    <Link to={`/danh-sach-dang-ky-hen/history/${record.id}`} ><MdOutlinePreview className="cursor-pointer" color="#108ee9" size={30} /></Link>
                </div>
            },
            width: 100,
            fixed: 'left',
        },
       
       
        {
            title: t("DSDangKyHen:ho_va_ten"),
            dataIndex: 'name',
            key: 'name',
            width: 150,
        },
        {
            title: t("DSDangKyHen:gioi_tinh"),
            key: 'gender',
            dataIndex: 'gender',
            width: 150,

        },
        {
            title: t("DSDangKyHen:so_dien_thoai"),
            key: 'phone',
            dataIndex: 'phone',
            width: 150,

        },
        {
            title: t("DSDangKyHen:ma_chuyen_gia"),
            key: 'code',
            dataIndex: 'code',
            width: 120,
        },
        {
            title: t("DSDangKyHen:khoa"),
            key: 'department',
            dataIndex: 'department',
            render: (value) => {
                return <>{value?.name}</>
            },
            width: 120,
        },
        {
            title: t("DSDangKyHen:benh"),
            key: 'diseases',
            dataIndex: 'diseases',
            render: (value) => {
                return <>{value?.name}</>
            },
            width: 150,
        },
        {
            title: t("DSDangKyHen:nguon_den"),
            key: 'media',
            dataIndex: 'media',
            render: (value) => {
                return <>{value?.name}</>
            },
            width: 150,
        },
        {
            title: t("DSDangKyHen:tinh/TP"),
            key: 'city',
            dataIndex: 'city',
            render: (value) => {
                return <>{value?.name}</>
            },
            width: 150,
        },
        {
            title: t("DSDangKyHen:quan/huyen"),
            key: 'district',
            dataIndex: 'district',
            render: (value) => {
                return <>{value?.name}</>
            },
            width: 150,
        },
        {
            title: t("DSDangKyHen:thoi_gian_hen"),
            key: 'appointmentTime',
            dataIndex: 'appointmentTime',
            render: (value) => {
                return <>{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</>
            },
            width: 150,
        },
        {
            title: t("DSDangKyHen:thoi_gian_nhac_hen"),
            key: 'reminderTime',
            dataIndex: 'reminderTime',
            render: (value) => {
                return <>{value !== 0 ? moment(value * 1000).format('DD-MM-YYYY HH:mm:ss') : ''}</>
            },
            width: 150,
        },
        {
            title: t("DSDangKyHen:bac_si"),
            key: 'doctor',
            dataIndex: 'doctor',
            render: (value) => {
                return <>{value?.name}</>
            },
            width: 150,
        },
        {
            title: t("DSDangKyHen:tinh_trang_cuoc_hen"),
            key: 'status',
            dataIndex: 'status',
            render: (value) => {
                return <>{value}</>
            },
            width: 150,
        },
    ];
    const dataBreadcrumb = [
        {
            title: "Danh sách khách hàng bị xóa",
        },
    ];

    const onChangeKeyWord = (e: any) => {
        setQuery((query: any) => ({
            ...query,
            search: e.target.value
        }))
    }

    return <Fragment>
        {
            hospitalId ?
                <Fragment>
                    <BreadcrumbComponent items={dataBreadcrumb} />
                    <div className='w-[250px]'>
                        <div>{t("DSDangKyHen:tu_khoa")} :</div>
                        <Input onChange={onChangeKeyWord} size='middle' placeholder={t("DSDangKyHen:tu_khoa_placeholder")} />
                    </div>
                    <div className="mt-2">
                    <TableComponent rowKey={false} columns={columns} data={dataDelete} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} scroll={scrollProps} />
                    </div>

                </Fragment> : <NotHospital />}
    </Fragment>
}

export default CustomerDeleted