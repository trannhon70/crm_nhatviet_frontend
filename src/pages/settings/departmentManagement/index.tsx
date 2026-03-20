import { Button, GetProps, Input, TableProps } from "antd";
import moment from "moment";
import { FC, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiPencilSquare } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { departmentAPI } from "../../../apis/department.api";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import Loading from "../../../components/loading";
import NotHospital from "../../../components/notHospital";
import PopconfirmComponent from "../../../components/popconfirmComponent";
import TableComponent from "../../../components/tableComponent";
import { getPagingDepartment, setDepartment } from "../../../features/departmentSlice";
import useMenuData from "../../../hooks/useMenuData";
import { AppDispatch, RootState } from "../../../redux/store";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const DepartmentManagement: FC = () => {

    const navige = useNavigate()
    const { data, total, loading } = useSelector((state: RootState) => state.department);
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const [search, setSearch] = useState<string>('')
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const menu = useMenuData();
    const {t } = useTranslation(['setting'])
    

    useEffect(() => {
        if (hospitalId) {
            dispatch(getPagingDepartment({ pageSize, pageIndex, search, hospitalId: Number(hospitalId) }))
        }

    }, [dispatch, hospitalId, pageIndex, pageSize])


    const dataBreadcrumb = [
        {
            title: t("setting:cai_dat"),
        },
        {
            type: 'separator',
        },
        {
            title: t("setting:quan_ly_khoa"),
        },
    ];
    const onClickCreate = () => {
        dispatch(setDepartment({}))
        navige('/quan-ly-khoa/them-moi');
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setSearch(value);
        dispatch(getPagingDepartment({ pageSize, pageIndex, search: value, hospitalId: Number(hospitalId) }))
    };

    const columns: TableProps<any>['columns'] = [
        {
            title:t("setting:stt") ,
            dataIndex: 'age',
            key: 'age',
            render(value, record, index) {
                return <Fragment>{index + 1}</Fragment>
            },
        },
        {
            title: t("setting:ten_benh"),
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: t("setting:benh_vien"),
            key: 'hospital',
            dataIndex: 'hospital',
            render(value, record, index) {

                return <div style={{ textTransform: 'capitalize' }} className="" >{value.name}</div>;
            },
        },
        {
            title:t("setting:nguoi_tao") ,
            key: 'user',
            dataIndex: 'user',
            render(value, record, index) {

                return <div style={{ textTransform: 'capitalize' }} className="" >{value.fullName}</div>;
            },
        },

        {
            title: t("setting:thoi_gian_tao"),
            key: 'created_at',
            dataIndex: 'created_at',
            render(value, record, index) {
                return <Fragment>{moment.unix(value).format('YYYY-MM-DD HH:mm:ss')}</Fragment>
            },
        },
        {
            title: t("setting:thao_tac"),
            key: 'id',
            dataIndex: 'id',
            render(value, record, index) {

                return <div className='flex gap-4 ' >
                    {
                         menu?.[4].ds?.action_CDKBV.delete === true ?  <PopconfirmComponent
                         title={<>{t("setting:xoa_khoa")} {record.name}</>}
                         description={t("setting:ban_co_chac_chan_muon_xoa_khoa")}
                         value={value}
                         deleteRole={deleteDepartment}
                     /> : null
                    }
                   

                    {
                        menu?.[4].ds?.action_CDKBV.update === true ?  <HiPencilSquare
                        onClick={() => onClickEdit(value)}
                        className='cursor-pointer text-green-700 ' color='primary' size={25} /> : null
                    }
                    
                </div>
            },
        },
    ];

    const deleteDepartment = async (id: number) => {
        try {
            const result = await departmentAPI.deleteDepartment(id)
            if (result.data.statusCode === 1) {
                toast.success(`${t("setting:xoa_thanh_cong")}`)
                dispatch(getPagingDepartment({ pageSize, pageIndex, search, hospitalId: Number(hospitalId) }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onClickEdit = (id: number) => {
        navige(`/quan-ly-khoa/cap-nhat/${id}`);
    }
    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
    }
    if (hospitalId === 'undefined') {
        return <NotHospital />
    }

    return <Fragment>
        {
            hospitalId ?
                <Fragment>
                    <BreadcrumbComponent items={dataBreadcrumb} />
                    <div className='mt-2 pb-2 flex justify-between ' >
                        <div className="flex gap-3" >

                            <Search className='w-[250px]' placeholder={t("setting:nhap_ten")} onSearch={onSearch} enterButton />
                        </div>
                        {
                             menu?.[4].ds?.action_CDKBV.create === true ? <Button onClick={onClickCreate} type="primary">{t("setting:them_moi")}</Button> : null
                        }
                        
                    </div>
                    {
                        loading === 'succeeded' ? <TableComponent rowKey={true} columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
                    }
                </Fragment> : <NotHospital />}
    </Fragment>
}

export default DepartmentManagement