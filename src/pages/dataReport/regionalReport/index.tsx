import { Button, DatePicker, DatePickerProps, Select, Space, Table, TableProps } from "antd";
import dayjs from 'dayjs';
import { FC, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import NotHospital from "../../../components/notHospital";
import { fetchCity, fetchDistrictbyIdCity } from "../../../features/patientSlice";
import { AppDispatch, RootState } from "../../../redux/store";
import { getMonthsInYear } from "../../../utils";
import { getBaoCaoKhuVuc } from "../../../features/dataReportSlice";



const RegionalReport: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const hospitalId = localStorage.getItem('hospitalId')
    const { t } = useTranslation(['baoCaoDuLieu', 'DSDangKyHen']);
    
    const [query, setQuery] = useState<any>({
        time: JSON.stringify(getMonthsInYear(new Date().getFullYear())),
        cityId: '',
        districtId: '',
        hospitalId: hospitalId
    })

    const { patient, dataReport } = useSelector((state: RootState) => state);
    useEffect(() => {
        dispatch(fetchCity());
    }, [dispatch]);


    const dataBreadcrumb = [
        {
            title: t("baoCaoDuLieu:bao_cao_du_lieu"),
        },
        {
            type: 'separator',
        },
        {

            title: 'Báo cáo khu vực',
        },

    ];


    const onChangeDatePicker: DatePickerProps['onChange'] = (date: any, dateString) => {
        const year = date.$y;
        const months = JSON.stringify(getMonthsInYear(year));
        setQuery((prev: any) => {
            return {
                ...prev,
                time: months
            }
        })
    }

    const onChangeCity = (value: any) => {
        dispatch(fetchDistrictbyIdCity(value));
        setQuery((prev: any) => {
            return {
                ...prev,
                cityId: value
            }
        })
    }

    const onChangeDistrict = (e: any) => {
        setQuery((prev: any) => {
            return {
                ...prev,
                districtId: e
            }
        })
    }

    useEffect(() => {
        dispatch(getBaoCaoKhuVuc(query))
    }, [query.time])
    
    const onClickSearch = () => {
        dispatch(getBaoCaoKhuVuc(query))
    }

     const columns: TableProps<any>['columns'] = [
            {
                title: t("baoCaoDuLieu:thoi_gian"),
                dataIndex: 'year',
                key: 'year',
                render(value, record, index) {
                    return <div>{value}</div>
    
                },
            },
            {
                title:t("baoCaoDuLieu:tong_so_nguoi") ,
                dataIndex: 'total',
                key: 'total',
                render(value, record, index) {
                    if(Number(value) > 0){
                        return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                    } else {
                        return <>{value}</>
                    }
                },
            },
            {
               title:t("baoCaoDuLieu:da_den") ,
                dataIndex: 'total_da_den',
                key: 'total_da_den',
                render(value, record, index) {
                    if(Number(value) > 0){
                        return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                    } else {
                        return <>{value}</>
                    }
                },
            },
            {
                title:t("baoCaoDuLieu:chua_den") ,
                key: 'total_chua_den',
                dataIndex: 'total_chua_den',
                render(value, record, index) {
                    if(Number(value) > 0){
                        return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                    } else {
                        return <>{value}</>
                    }
                },
    
            },
            {
                title:t("baoCaoDuLieu:cho_doi") ,
                key: 'total_cho_doi',
                dataIndex: 'total_cho_doi',
                render(value, record, index) {
                    if(Number(value) > 0){
                        return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                    } else {
                        return <>{value}</>
                    }
                },
            },
            {
               title:t("baoCaoDuLieu:ty_le") ,
                key: 'ty_le',
                dataIndex: 'ty_le',
                render(value, record, index) {
                    if(Number(value) > 0){
                        return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value.toFixed(2)}</span>
                    } else {
                        return <>{value}</>
                    }
                },
    
            },
    
        ];

    return <Fragment>
        {
            hospitalId ? <>
                <BreadcrumbComponent items={dataBreadcrumb} />
                <Space direction="horizontal" className="mb-2" >
                    <div>
                        <div>Thời gian :</div>
                        <DatePicker allowClear={false} picker="year" onChange={onChangeDatePicker} defaultValue={dayjs()} />
                    </div>
                    <div>
                        <div >Tỉnh/TP : </div>
                        <Select

                            className="w-[200px]"
                            showSearch
                            placeholder="--- Tùy Chọn ---"
                            filterOption={(input, option) =>
                                typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                            }
                            options={
                                Array.isArray(patient?.city)
                                    ? patient.city.map((item: any) => ({
                                        label: item.name,
                                        value: item.id
                                    }))
                                    : []
                            }
                            onChange={onChangeCity}
                        />
                    </div>
                    <div>
                        <div >Quận/huyện : </div>
                        <Select
                            allowClear
                            className="w-[200px]"
                            showSearch
                            placeholder="--- Tùy Chọn ---"
                            filterOption={(input, option) =>
                                typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                            }
                            options={
                                Array.isArray(patient?.district)
                                    ? patient.district.map((item: any) => ({
                                        label: item.full_name,
                                        value: item.id
                                    }))
                                    : []
                            }
                            onChange={onChangeDistrict}
                        />
                    </div>
                    <Button onClick={onClickSearch} className="mt-5" type="primary" >{t("baoCaoDuLieu:tim_kiem")}</Button>
                </Space>
               <Table<any> columns={columns} dataSource={ dataReport.TKBCKV || []} bordered pagination={false} />
            </>
                :
                <NotHospital />}
    </Fragment>
}

export default RegionalReport