import { Button, GetProps, Input, TableProps } from "antd";
import moment from "moment";
import { FC, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiPencilSquare } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { mediaAPI } from "../../../apis/media.api";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import Loading from "../../../components/loading";
import NotHospital from "../../../components/notHospital";
import PopconfirmComponent from "../../../components/popconfirmComponent";
import TableComponent from "../../../components/tableComponent";
import { getPagingMedia, setMedia } from "../../../features/mediaSlice";
import useMenuData from "../../../hooks/useMenuData";
import { AppDispatch, RootState } from "../../../redux/store";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;
const SearchEngine: FC = () => {
    const navige = useNavigate()
    const { data, total, loading } = useSelector((state: RootState) => state.media);
    const [pageIndex, setPageIndex] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(50)
    const [search,setSearch] = useState<string>('')
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const menu = useMenuData();
    const {t } = useTranslation(['setting'])

    useEffect(() => {
        if(hospitalId){
             dispatch(getPagingMedia({ pageSize, pageIndex, search, hospitalId : Number(hospitalId) }))
        }
        
    }, [dispatch,hospitalId, pageIndex, pageSize])

    const dataBreadcrumb = [
        {
           
            title: t("setting:cai_dat"),
        },
        {
            type: 'separator',
        },
        {
            title: t("setting:cong_cu_tim_kiem") ,
        },
    ];

    const onClickCreate = () => {
        dispatch(setMedia({}))
        navige('/cong-cu-tim-kiem/them-moi');
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        setSearch(value);
        dispatch(getPagingMedia({ pageSize, pageIndex, search: value, hospitalId : Number(hospitalId) }))
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
            title: t("setting:ten_media"),
            dataIndex: 'name',
            key: 'name',
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
            title:t("setting:thao_tac"),
            key: 'id',
            dataIndex: 'id',
            render(value, record, index) {
                
                return <div className='flex gap-4 ' >
                    {
                        menu?.[4].ds?.action_CDCCTK.delete === true ?
                        <PopconfirmComponent
                        title={<>{t("setting:xoa")} {record.name}</>}
                        description={t("setting:xoa_cong_cu_tim_kiem")}
                        value={value}
                      deleteRole={deleteDesease}
                    /> : null
                    }
                   
                    
                    {
                         menu?.[4].ds?.action_CDCCTK.update === true ?
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


    const deleteDesease = async(value: number) =>{ 
       try {
            const result = await mediaAPI.deleteMedia(value)
            if(result.data.statusCode === 1){
                toast.success(`${t("setting:xoa_thanh_cong")}`)
                dispatch(getPagingMedia({ pageSize, pageIndex, search, hospitalId : Number(hospitalId) }))
           }
       } catch (error) {
            console.log(error);
       }
        
    }

    const onClickEdit = (id: number) => {
        navige(`/cong-cu-tim-kiem/cap-nhat/${id}`);
    }
    return <Fragment>
 {
            hospitalId ? 
        <Fragment>
         <BreadcrumbComponent items={dataBreadcrumb} />
         <div className='mt-2 pb-2 flex justify-between ' >
            <div className="flex gap-3" >
                <Search className='w-[250px]' placeholder={t("setting:nhap_ten")}  onSearch={onSearch} enterButton />
            </div>
            {
                menu?.[4].ds?.action_CDCCTK.create === true ?<Button onClick={onClickCreate} type="primary">{t("setting:them_moi")}</Button> : null
            }
            
        </div>
        {
            loading === 'succeeded' ? <TableComponent rowKey={true} columns={columns} data={data} total={total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} /> : <Loading />
        }
         </Fragment> : <NotHospital /> }
    </Fragment>
}

export default SearchEngine