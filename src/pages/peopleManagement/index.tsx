import { FC, Fragment, useEffect, useState } from "react";
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { Button, GetProps, Input, Select, TableProps, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../components/tableComponent";
import moment from "moment";
import PopconfirmComponent from "../../components/popconfirmComponent";
import { HiMiniLockOpen, HiPencilSquare } from "react-icons/hi2";
import Loading from "../../components/loading";
import { fetchGetPaging } from "../../features/usersSlice";
import { Languege } from "../../utils";
import { HiMiniLockClosed } from "react-icons/hi2";
import { userAPI } from "../../apis/user.api";
import { toast } from "react-toastify";
import useMenuData from "../../hooks/useMenuData";
import { useTranslation } from "react-i18next";



type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const PeopleManagement: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navige = useNavigate()
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const [search, setSearch] = useState<string>('')
    const [isshow, setIsshow] = useState<any>('')
    const [language, setLanguage] = useState<string>('')
    const { data, total, loading, entities } = useSelector((state: RootState) => state.users);
    const menu = useMenuData();
    const {t } = useTranslation(['QLHT'])

    const dataBreadcrumb = [
        {
            href: '/quan-ly-con-nguoi',
            title:t("QLHT:quan_ly_he_thong") ,
        },
        {
            type: 'separator',
        },
        {
            title:t("QLHT:quan_ly_con_nguoi") ,
        },
    ];

    useEffect(() => {
        dispatch(fetchGetPaging({ pageSize, pageIndex, search, isshow, language }))
    }, [dispatch, pageSize, pageIndex, isshow, language])

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setSearch(value);
        dispatch(fetchGetPaging({ pageSize, pageIndex, search: value, isshow, language }));
    };

    const onClickCreate = () => {
        navige('/quan-ly-con-nguoi/them-moi');
        // dispatch(setRoleData({}))
    }

    const columns: TableProps<any>['columns'] = [
        {
            title: t("QLHT:stt") ,
            dataIndex: 'age',
            key: 'age',
            render(value, record, index) {
                return <Fragment>{index + 1}</Fragment>
            },
        },
        {
            title: t("QLHT:ho_va_ten"),
            dataIndex: 'fullName',
            key: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title:t("QLHT:ngon_ngu") ,
            key: 'language',
            dataIndex: 'language',
            render(value, record, index) {
                if (value === 'vi') {
                    return <Tag  >Tiếng Việt</Tag>;
                }
                if (value === 'en') {
                    return <Tag color="error" >Tiếng Anh</Tag>;
                }
                return <Tag color="green" >Tiếng Trung</Tag>;
            },
        },
        {
            title:t("QLHT:phan_quyen") ,
            key: 'role',
            dataIndex: 'role',
            render(value, record, index) {
                
                return <Tag color="processing" >{value?.name}</Tag>;
            },
        },
        {
            title:"Online" ,
            key: 'online',
            dataIndex: 'online',
            render(value, record, index) {
                console.log(value, 'sadas');
                
                if (value === true) {
                    return <Tag color="success" >online</Tag>
                }
                return <Tag color="red" >offline</Tag>
            },
        },
        {
            title:t("QLHT:tinh_trang") ,
            key: 'isshow',
            dataIndex: 'isshow',
            render(value, record, index) {
                if (value === true) {
                    return <Tag color="success" >Hoạt động</Tag>
                }
                return <Tag color="red" >không hoạt động</Tag>
            },
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
            title:t("QLHT:thao_tac") ,
            key: 'id',
            dataIndex: 'id',
            render(value, record, index) {
                if (entities.role.id === 1) {
                    return <div className='flex gap-4 ' >
                        {
                            record?.role?.id !== 1 ? <>
                                <PopconfirmComponent
                                    title={<>{t("QLHT:xoa")} {record.fullName}</>}
                                    description={t("QLHT:ban_co_chac_muon_xoa_tai_khoan")}
                                    value={value}
                                    deleteRole={deleteRole}
                                />
                                {
                                    record.isshow == true ?
                                        <HiMiniLockOpen onClick={() => onClickUnActiveUser(value)} color='primary' className='cursor-pointer  ' size={25} /> :
                                        <HiMiniLockClosed onClick={() => onClickActiveUser(value)} color='warning' className='cursor-pointer text-red-600' size={25} />
                                }
                            </> : ''
                        }


                        <HiPencilSquare
                            onClick={() => onClickEdit(value)}
                            className='cursor-pointer text-green-700 ' color='primary' size={25} />
                    </div>
                }
                if (record?.role?.id !== 1) {
                    return <div className='flex gap-4 ' >
                        {
                             menu?.[6].ds?.action_QLCN.delete === true && <PopconfirmComponent
                             title={<>{t("QLHT:xoa")} {record.fullName}</>}
                             description={t("QLHT:ban_co_chac_muon_xoa_tai_khoan")}
                             value={value}
                             deleteRole={deleteRole}
                         />
                        }
                        {
                            menu?.[6].ds?.action_QLCN.close === true && <>
                                 {
                                record.isshow == true ?
                                    <HiMiniLockOpen onClick={() => onClickUnActiveUser(value)} color='primary' className='cursor-pointer' size={25} /> :
                                    <HiMiniLockClosed onClick={() => onClickActiveUser(value)} color='warning' className='cursor-pointer text-red-600' size={25} />
                            }
                            </>
                        }
                        {
                             menu?.[6].ds?.action_QLCN.update === true &&  <HiPencilSquare
                             onClick={() => onClickEdit(value)}
                             className='cursor-pointer text-green-700 ' color='primary' size={25} />
                        }

                       
                    </div>
                }
            },
        },
    ];

    const onClickEdit = (id: number) => {
        navige(`/quan-ly-con-nguoi/cap-nhat/${id}`)
    }

    const deleteRole = async (id: number) => {
        try {
            const result = await userAPI.deleteUser(id)
            if (result.data.statusCode === 1) {
                toast.success('Xóa thành công!')
                dispatch(fetchGetPaging({ pageSize, pageIndex, search, isshow, language }))
            }
        } catch (error) {
            console.log(error);

        }

    }

    const onClickActiveUser = async (id: number) => {
        const result = await userAPI.activeUser(id)
        if (result.data.statusCode === 1) {
            toast.success(`${t("QLHT:mo_tai_khoan_thanh_cong")}`)
            dispatch(fetchGetPaging({ pageSize, pageIndex, search, isshow, language }))
        }
    }

    const onClickUnActiveUser = async (id: number) => {
        const result = await userAPI.unActiveUser(id)
        if (result.data.statusCode === 1) {
            toast.success(`${t("QLHT:khoa_tai_khoan")}}`)
            dispatch(fetchGetPaging({ pageSize, pageIndex, search, isshow, language }))
        }
    }
    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
    }

    const handleChangeTinhTrang = (e: any) => {
        if (e === undefined) {
            setIsshow('')
        } else {
            setIsshow(e)
        }

    }

    const handleChangeNgonNgu = (e: any) => {
        if (e === undefined) {
            setLanguage('')
        } else {
            setLanguage(e)
        }

    }


    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className='mt-2 pb-2 flex justify-between ' >
            <div className="flex gap-3" >
                <Select
                    onChange={handleChangeTinhTrang}
                    showSearch
                    allowClear
                    style={{ width: 200 }}
                    placeholder={t("QLHT:tinh_trang")}
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                        {
                            value: '1',
                            label: 'Hoạt động',
                        },
                        {
                            value: '0',
                            label: 'Không hoạt động',
                        },

                    ]}
                />
                <Select
                    onChange={handleChangeNgonNgu}
                    showSearch
                    allowClear
                    style={{ width: 200 }}
                    placeholder={t("QLHT:ngon_ngu")}
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={Languege()}
                />
                <Search className='w-[250px]' placeholder={t("QLHT:nhap_ten_quyen")} onSearch={onSearch} enterButton />
            </div>
            {
                 menu?.[6].ds?.action_QLCN.create === true &&  <Button onClick={onClickCreate} type="primary">{t("QLHT:them_moi")}</Button>
            }
            
        </div>
        {
            loading === 'succeeded' ? <TableComponent rowKey={true} columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
        }
    </Fragment>
}

export default PeopleManagement