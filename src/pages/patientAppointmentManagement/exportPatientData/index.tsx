import moment from "moment";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { AppDispatch, RootState } from "../../../redux/store";
import ComponentExportData from "./componentExportData";
import ModalSearch from "./modalSearch";
import { useTranslation } from "react-i18next";
import dayjs from 'dayjs';
import { getXuatDuLieuBenhNhan } from "../../../features/patientSlice";
import useMenuData from "../../../hooks/useMenuData";

const ExportPatientData: FC = () => {
    const { dataExport , total} = useSelector((state: RootState) => state.patient)
    const hospitalId = localStorage.getItem('hospitalId');
    const dispatch = useDispatch<AppDispatch>();
    const [check, setCheck] = useState({
        name: true, gender: false, yearOld: false, phone: false, content: false, department: false, diseases: false, city: false,
        district: false, code: false, appointmentTime: false, reminderTime: false, note: false, status: false, doctor: false, user: false, treatment: false,
        created_at: false, media: false
    })
    const [query, setQuery] = useState<any>({
        hospitalId: Number(hospitalId),
        pageSize: 100,
        pageIndex: 1,
        created_at: '',
        appointmentTime: '',
        doctorId: '',
        status: '',
        departmentId: '',
        diseasesId: '',
        cityId: '',
        districtId: '',
    })
    const { t } = useTranslation(['BCCTDVKH', 'DSDangKyHen'])
    const tableRef = useRef<HTMLDivElement>(null);
    const menu = useMenuData(); 
    
    const dataBreadcrumb = [
        {
            title: t("BCCTDVKH:quan_ly_cuoc_hen_benh_nhan"),
        },
        {
            type: 'separator',
        },
        {
            title: t("BCCTDVKH:xuat_du_lieu_benh_nhan"),
        },
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!tableRef.current) return;
            const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
            if (scrollTop + clientHeight >= scrollHeight - 50) {
                setQuery((prevQuery: any) => {
                    if (total > prevQuery.pageSize) {
                        return {
                            ...prevQuery,
                            pageSize: Math.min(prevQuery.pageSize + 20, total), 
                        };
                    }
                    return prevQuery; 
                });
            }
        };
        const tableDiv = tableRef.current;
        if (tableDiv) {
            tableDiv.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (tableDiv) {
                tableDiv.removeEventListener("scroll", handleScroll);
            }
        };
    }, [total]);

    useEffect(() => {
        dispatch(getXuatDuLieuBenhNhan(query))
    }, [ query])

    const onFinish = (values: any) => {
        setQuery((query: any) => ({
            ...query,
            created_at: values.created_at ? JSON.stringify([dayjs(values.created_at?.[0]).unix(), dayjs(values.created_at?.[1]).unix()]) : '',
            appointmentTime: values.appointmentTime ? JSON.stringify([dayjs(values.appointmentTime?.[0]).unix(), dayjs(values.appointmentTime?.[1]).unix()]) : '',
            doctorId: values.doctorId || '',
            status: values.status || '',
            departmentId: values.departmentId || '',
            diseasesId: values.diseasesId || '',
            cityId: values.cityId || '',
            districtId: values.districtId || '',
        }))
    }

    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className="flex  justify-between " >
            <ComponentExportData setCheck={setCheck} check={check} menu={menu} />
            <ModalSearch  hospitalId={hospitalId} onFinish={onFinish} />
        </div>
        <div ref={tableRef} className="rounded border-lime-700 border mt-3 min-h-[50vh] max-h-[70vh] overflow-auto">
            <table style={{ outline: "none" }} className="w-full" contentEditable="true">
                <tbody>
                    {dataExport.length > 0 &&
                        dataExport.map((item: any, index: number) => (
                            <tr key={index + 1} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                                {check.name && <td className="border p-1">{item?.name}</td>}
                                {check.gender && <td className="border p-1">{item?.gender}</td>}
                                {check.yearOld && <td className="border p-1">{item?.yearOld}</td>}
                                {check.phone && menu?.[1].ds?.action_XDLBN?.phone && <td className="border p-1">{item?.phone}</td>}
                                {check.content && <td className="border p-1">{item?.content}</td>}
                                {check.department && <td className="border p-1">{item?.department?.name}</td>}
                                {check.diseases && <td className="border p-1">{item?.diseases?.name}</td>}
                                {check.media && <td className="border p-1">{item?.media?.name}</td>}
                                {check.city && <td className="border p-1">{item?.city?.name}</td>}
                                {check.district && <td className="border p-1">{item?.district?.full_name}</td>}
                                {check.code && <td className="border p-1">{item?.code}</td>}
                                {check.appointmentTime && (
                                    <td className="border p-1">
                                        {moment(item?.appointmentTime * 1000).format("DD-MM-YYYY HH:mm:ss")}
                                    </td>
                                )}
                                {check.reminderTime && (
                                    <td className="border p-1">
                                        {moment(item?.reminderTime * 1000).format("DD-MM-YYYY HH:mm:ss")}
                                    </td>
                                )}
                                {check.note && <td className="border p-1">{item?.note}</td>}
                                {check.status && <td className="border p-1">{item?.status}</td>}
                                {check.doctor && <td className="border p-1">{item?.doctor?.name}</td>}
                                {check.user && <td className="border p-1">{item?.user?.fullName}</td>}
                                {check.treatment && <td className="border p-1">{item?.treatment}</td>}
                                {check.created_at && (
                                    <td className="border p-1">
                                        {moment(item?.created_at * 1000).format("DD-MM-YYYY HH:mm:ss")}
                                    </td>
                                )}
                            </tr>
                        ))}
                </tbody>

            </table>
        </div>
    </Fragment>
}

export default ExportPatientData