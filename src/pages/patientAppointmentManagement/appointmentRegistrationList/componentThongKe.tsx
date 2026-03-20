import { Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getPagingPatient, getThongKeAll, getThongKeNgayHienTai } from "../../../features/patientSlice";
import { useTranslation } from "react-i18next";
import useMenuData from "../../../hooks/useMenuData";
import dayjs from 'dayjs';


const ComponentThongKe: FC = () => {
    const hospitalId = localStorage.getItem('hospitalId')
    const dispatch = useDispatch<AppDispatch>();
    const { thongKeTheoNgayHienTai, daden ,total, chuaden } = useSelector((state: RootState) => state.patient);
    const {entities} = useSelector((state: RootState) => state.users)
    // console.log(entities, 'r');
    
    const { t } = useTranslation(['DSDangKyHen']);
    const menu = useMenuData();
    const startOfDay = dayjs().startOf('day').unix();
    const endOfDay = dayjs().endOf('day').unix();
    const endOfDayConvert = endOfDay - 86399;
    const [query, setQuery] = useState<any>({
        pageSize: 500,
        pageIndex: 1,
        hospitalId: Number(hospitalId),
        search:  '',
        doctorId:  '',
        status:  '',
        departmentId:  '',
        diseasesId:  '',
        mediaId:  '',
        created_at: '',
        appointmentTime: JSON.stringify([startOfDay, endOfDayConvert]),
        userId: ''
    })

    useEffect(() => {
        if (entities.id) {
            setQuery((prevQuery : any) => ({
                ...prevQuery,
                userId: menu?.[1].ds?.action_DSDKH.viewAllData === true ? '' : entities.id,
            }));
        }
    }, [entities.id, menu]);

    useEffect(() => {
        if(hospitalId){
            dispatch(getThongKeNgayHienTai(Number(hospitalId)))
            dispatch(getThongKeAll(Number(hospitalId)))
        }
        
    }, [dispatch, hospitalId])

    const onclickSearchTotal = () => {
        setQuery((prevQuery: any) => {
            const updatedQuery = {
                ...prevQuery,
                userId: menu?.[1].ds?.action_DSDKH.viewAllData === true ? '' : entities.id,
                status: ''
            };
            dispatch(getPagingPatient(updatedQuery));
            return updatedQuery;
        });
    }

    const onclickSearchDaen = () => {
         setQuery((prevQuery: any) => {
        const updatedQuery = {
            ...prevQuery,
            userId: menu?.[1].ds?.action_DSDKH.viewAllData === true ? '' : entities.id,
            status: 'ĐÃ ĐẾN'
        };
        dispatch(getPagingPatient(updatedQuery));
        return updatedQuery;
    });
    }

    const onclickSearchChuaden = () => {
        setQuery((prevQuery: any) => {
       const updatedQuery = {
           ...prevQuery,
           userId: menu?.[1].ds?.action_DSDKH.viewAllData === true ? '' : entities.id,
           status: 'CHƯA ĐẾN TK'
       };
       dispatch(getPagingPatient(updatedQuery));
       return updatedQuery; 
   });
   }

    return <div className="flex items-center justify-between w-[70%] bg-slate-200 p-1 " >
        <div className="flex gap-2 " >
            <Tag color="#2db7f5">{t("DSDangKyHen:thong_ke")} </Tag>
            <div>{t("DSDangKyHen:tong_cong")}: <strong>{total}</strong> </div>
            <div>{t("DSDangKyHen:da_den")}: <strong>{daden}</strong> </div>
            <div>{t("DSDangKyHen:chua_den")}: <strong>{chuaden}</strong> </div>
        </div>

        <div className="flex gap-2 ">
            <Tag color="#f50">{t("DSDangKyHen:du_lieu_hom_nay")} </Tag>
            <div onClick={onclickSearchTotal} className="cursor-pointer hover:text-orange-600" >{t("DSDangKyHen:tong_cong")}: <strong>{thongKeTheoNgayHienTai?.total}</strong> </div>
            <div onClick={onclickSearchDaen} className="cursor-pointer hover:text-orange-600">{t("DSDangKyHen:da_den")}: <strong>{thongKeTheoNgayHienTai?.daden}</strong> </div>
            <div onClick={onclickSearchChuaden} className="cursor-pointer hover:text-orange-600">{t("DSDangKyHen:chua_den")}: <strong>{thongKeTheoNgayHienTai?.chuaden}</strong> </div>
        </div>
    </div>
}

export default ComponentThongKe;