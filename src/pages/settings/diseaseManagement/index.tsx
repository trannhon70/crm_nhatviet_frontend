import { FC, Fragment, useEffect, useState } from "react";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button, GetProps, Input, Select, TableProps, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import TableComponent from "../../../components/tableComponent";
import moment from "moment";
import PopconfirmComponent from "../../../components/popconfirmComponent";
import { HiPencilSquare } from "react-icons/hi2";
import Loading from "../../../components/loading";
import { getPagingDisease, setDisease } from "../../../features/diseaseSlice";
import { diseaseAPI } from "../../../apis/disease.api";
import { toast } from "react-toastify";
import NotHospital from "../../../components/notHospital";
import useMenuData from "../../../hooks/useMenuData";
import { useTranslation } from "react-i18next";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const DiseaseManagement: FC = () => {
    const navige = useNavigate()
    const { data, total, loading } = useSelector((state: RootState) => state.disease);
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const [search,setSearch] = useState<string>('')
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const menu = useMenuData();
    const [isshow, setIsshow] = useState<any>('');
    const {t } = useTranslation(['setting']);

    useEffect(() => {
        if(hospitalId){
            dispatch(getPagingDisease({ pageSize, pageIndex, search, hospitalId : Number(hospitalId),isshow }))
        }
        
    }, [dispatch,hospitalId, pageIndex, pageSize, isshow])

    const dataBreadcrumb = [
        {
           
            title: t("setting:cai_dat"),
        },
        {
            type: 'separator',
        },
        {
            title: t("setting:thiet_lap_benh"),
        },
    ];

    const onClickCreate = () => {
        dispatch(setDisease({}))
        navige('/thiet-lap-benh-tat/them-moi');
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setSearch(value);
        dispatch(getPagingDisease({ pageSize, pageIndex, search: value, hospitalId : Number(hospitalId),isshow }))
    };

    const columns: TableProps<any>['columns'] = [
        {
            title:t("setting:stt"),
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
            title:t("setting:khoa") ,
            dataIndex: 'department',
            key: 'department',
            render(value, record, index) {
              
                return <div style={{textTransform:'capitalize'}} className="" >{value.name}</div>;
            },
        },
        {
            title:t("setting:benh_vien") ,
            key: 'hospital',
            dataIndex: 'hospital',
            render(value, record, index) {
               
                return <div style={{textTransform:'capitalize'}} className="" >{value.name}</div>;
            },
        },
        {
            title:t("setting:nguoi_tao") ,
            key: 'user',
            dataIndex: 'user',
            render(value, record, index) {
                
                return <div style={{textTransform:'capitalize'}} className="" >{value.fullName}</div>;
            },
        },
        {
            title:t("setting:tinh_trang") ,
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
            title:t("setting:thoi_gian_tao") ,
            key: 'created_at',
            dataIndex: 'created_at',
            render(value, record, index) {
                return <Fragment>{moment.unix(value).format('YYYY-MM-DD HH:mm:ss')}</Fragment>
            },
        },
        {
            title:t("setting:thao_tac") ,
            key: 'id',
            dataIndex: 'id',
            render(value, record, index) {
                
                return <div className='flex gap-4 ' >
                    {
                        menu?.[4].ds?.action_TLBT.delete === true ?
                        <PopconfirmComponent
                        title={<>{t("setting:xoa_benh")} {record.name}</>}
                        description={t("setting:ban_co_chac_chan_muon_xoa_benh")}
                        value={value}
                      deleteRole={deleteDesease}
                    /> : null
                    }
                   
                    
                    {
                         menu?.[4].ds?.action_TLBT.update === true ?
                         <HiPencilSquare
                         onClick={() => onClickEdit(value)} 
                         className='cursor-pointer text-green-700 ' color='primary' size={25} /> : null
                    }
                   
                </div>
            },
        },
    ];

    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
    }

    const handleChangeTinhTrang= (e:any) => {
        if(e ===  undefined){
            setIsshow('')
        }else {
            setIsshow(e)
        }
    }

    const deleteDesease = async(value: any) =>{ 
       try {
            const result = await diseaseAPI.deleteDisease(value)
            if(result.data.statusCode === 1){
                toast.success(`${t("setting:xoa_thanh_cong")}`)
                dispatch(getPagingDisease({ pageSize, pageIndex, search, hospitalId : Number(hospitalId),isshow }))
           }
       } catch (error) {
            console.log(error);
       }
        
    }

    const onClickEdit = (id: number) => {
        navige(`/thiet-lap-benh-tat/cap-nhat/${id}`);
    }

    if(hospitalId === 'undefined'){
        return<NotHospital/>
    }
    return <Fragment>
         {
            hospitalId ? 
        <Fragment>
         <BreadcrumbComponent items={dataBreadcrumb} />
         <div className='mt-2 pb-2 flex justify-between ' >
            <div className="flex gap-3" >
                <Select
                    onChange={handleChangeTinhTrang}
                    showSearch
                    allowClear
                    style={{ width: 200 }}
                    placeholder={t("setting:tinh_trang")}
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
                 
                <Search className='w-[250px]' placeholder={t("setting:nhap_ten")} onSearch={onSearch} enterButton />
            </div>
            {
                menu?.[4].ds?.action_TLBT.create === true ?<Button onClick={onClickCreate} type="primary">{t("setting:them_moi")}</Button> : null
            }
            
        </div>
        {
            loading === 'succeeded' ? <TableComponent rowKey={true} columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
        }
         </Fragment> : <NotHospital /> }
    </Fragment>
}

export default DiseaseManagement