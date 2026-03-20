import React, { FC, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { Button, DatePicker, DatePickerProps, Select, Space, Table, TableProps } from "antd";
import { getDaysInQuarter, getMonthsInYear, TIME } from "../../../utils";
import dayjs from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
import { getAllMedia } from "../../../features/patientSlice";
import NotHospital from "../../../components/notHospital";
import { getThongkeTuoi } from "../../../features/dataReportSlice";
import 'dayjs/locale/vi';
import { useTranslation } from "react-i18next";
dayjs.extend(isoWeek);

interface DataType {
    key: string;
    picker: string,
    timeType: string,
    month: string,
    year: string,
    day?: string,
    total: number,
    _0To9Year: number,
    _10To14Year: number,
    _15To19Year: number,
    _20To24Year: number,
    _25To29Year: number,
    _30To34Year: number,
    _35To39Year: number,
    _40To44Year: number,
    _45To49Year: number,
    _50To54Year: number,
    _55To59Year: number,
    _60Year: number,
}

const AgeStatistics: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const hospitalId = localStorage.getItem('hospitalId')
    const [picker, setPicker] = useState<any>('week');
    const [time, setTime] = useState<any>([]);
    const [timeType, setTimeType] = useState<string>('appointmentTime');
    const [status, setStatus] = useState<string>('');
    const [media, setMedia] = useState<string>('');
    const { patient, dataReport } = useSelector((state: RootState) => state);
    const currentWeek = dayjs();
    const {t } = useTranslation(['baoCaoDuLieu'])

    useEffect(() => {
        if (hospitalId) {
            dispatch(getAllMedia(Number(hospitalId)));
        }
    }, [dispatch, hospitalId])


    const dataBreadcrumb = [
        {
            title: t("baoCaoDuLieu:bao_cao_du_lieu"),
        },
        {
            type: 'separator',
        },
        {

            title: t("baoCaoDuLieu:thong_ke_tuoi"),
        },

    ];

    const onChangeTime = (e: any) => {
        setPicker(e)
    }
    const onChange: DatePickerProps['onChange'] = (date: any, dateString) => {
        
        if (picker === 'week') {
            if (typeof dateString === 'string') {
                const [year, week] = dateString.split('-');
                const parsedYear = parseInt(year, 10);
                const parsedWeek = parseInt(week.replace('th', ''), 10);
                const startOfWeek = dayjs().year(parsedYear).isoWeek(parsedWeek).startOf('isoWeek');
                const weekDaysArray = [];
                for (let i = -1; i < 6; i++) {
                    const day = startOfWeek.add(i, 'day').format('YYYY-MM-DD');
                    weekDaysArray.push(day);
                }
                setTime(weekDaysArray);
            }
        }
        if (picker === 'month') {
            const year = date.$y;
            const month = date.$M;
            const daysInMonth = dayjs(new Date(year, month)).daysInMonth();
            const daysArray = [];
            for (let day = 1; day <= daysInMonth; day++) {
                const fullDate = dayjs(new Date(year, month, day)).format('YYYY-MM-DD');
                daysArray.push(fullDate);
            }
            setTime(daysArray);
        }

        if (picker === 'quarter') {
            const year = date.$y;
            const month = date.$M;
            const days = getDaysInQuarter(year, month);
            setTime(days);
        }

        if (picker === 'year') {
            const year = date.$y;
            const months = getMonthsInYear(year);
            setTime(months);

        }
    }

    const convertTime = time?.map((item: any) => {
        const [year, month, day] = item.split('-');
        const date = dayjs(item);
        const startTimestamp = date.startOf('day').unix();
        const endTimestamp = date.endOf('day').unix();
        return {
            startTimestamp, endTimestamp, year, month, day
        }
    })

    const convertTimeYear = time?.map((item: any) => {
        const [year, month, day] = item.split('-');
        const date = dayjs(item);
        const startTimestamp = date.startOf('month').unix();
        const endTimestamp = date.endOf('month').unix();
        return {
            startTimestamp, endTimestamp, year, month, day
        }
    })

    const onChangeTimeType = (e: any) => {
        setTimeType(e);
    }

    const onChangeStatus = (e: any) => {
        setStatus(e)
    }

    const onChangeMedia = (e: any) => {
        setMedia(e);
    }
   
    const onClickSearch = () => {
     
        const body = {
            hospitalId: hospitalId,
            time: picker === 'year' ? convertTimeYear : convertTime,
            picker: picker,
            timeType: timeType,
            status: status,
            media: media
        }
        dispatch(getThongkeTuoi(body))
    }
    
    useEffect(() => {
        switch (picker) {
            case 'week':
                const defaultWeek = currentWeek.format('YYYY-ww');
                onChange(currentWeek, defaultWeek);
                dispatch(getThongkeTuoi({hospitalId, time: convertTime, picker,timeType, status, media}))
                break;

            case 'month':
                onChange(currentWeek, currentWeek.format('YYYY-MM'));
                break;

            case 'quarter':
                onChange(currentWeek, currentWeek.format('YYYY-Q'));
                break;

            case 'year':
                onChange(currentWeek, currentWeek.format('YYYY'));
                break;

            default:
                break;
        }
        
    }, [picker,hospitalId, time.length > 0])

    const columns: TableProps<DataType>['columns'] = [
        {
            title: t("baoCaoDuLieu:thoi_gian"),
            dataIndex: 'year',
            key: 'year',
            render(value, record, index) {
                if (record.picker === 'year') {
                    return <>{record.month}/{record.year}</>
                } else {
                    return <>{record.day}/{record.month}/{record.year}</>
                }

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
            title: '0~9',
            dataIndex: '_0To9Year',
            key: '_0To9Year',
            render(value, record, index) {
                if(Number(value) > 0){
                    return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                } else {
                    return <>{value}</>
                }
            },
        },
        {
            title: '10~14',
            key: '_10To14Year',
            dataIndex: '_10To14Year',
            render(value, record, index) {
                if(Number(value) > 0){
                    return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                } else {
                    return <>{value}</>
                }
            },

        },
        {
            title: '15~19',
            key: '_15To19Year',
            dataIndex: '_15To19Year',
            render(value, record, index) {
                if(Number(value) > 0){
                    return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                } else {
                    return <>{value}</>
                }
            },
        },
        {
            title: '20~24',
            key: '_20To24Year',
            dataIndex: '_20To24Year',
            render(value, record, index) {
                if(Number(value) > 0){
                    return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                } else {
                    return <>{value}</>
                }
            },

        },
        {
            title: '25~29',
            key: '_25To29Year',
            dataIndex: '_25To29Year',
            render(value, record, index) {
                if(Number(value) > 0){
                    return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                } else {
                    return <>{value}</>
                }
            },
        },
        {
            title: '30~34',
            key: '_30To34Year',
            dataIndex: '_30To34Year',
            render(value, record, index) {
                if(Number(value) > 0){
                    return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                } else {
                    return <>{value}</>
                }
            },

        },
        {
            title: '35~39',
            key: '_35To39Year',
            dataIndex: '_35To39Year',
            render(value, record, index) {
                if(Number(value) > 0){
                    return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                } else {
                    return <>{value}</>
                }
            },
        },
        {
            title: '40~44',
            key: '_40To44Year',
            dataIndex: '_40To44Year',
            render(value, record, index) {
                if(Number(value) > 0){
                    return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                } else {
                    return <>{value}</>
                }
            },

        },
        {
            title: '45~49',
            key: '_45To49Year',
            dataIndex: '_45To49Year',
            render(value, record, index) {
                if(Number(value) > 0){
                    return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                } else {
                    return <>{value}</>
                }
            },
        },
        {
            title: '50~54',
            key: '_50To54Year',
            dataIndex: '_50To54Year',
            render(value, record, index) {
                if(Number(value) > 0){
                    return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                } else {
                    return <>{value}</>
                }
            },

        },
        {
            title: '55~59',
            key: '_55To59Year',
            dataIndex: '_55To59Year',
            render(value, record, index) {
                if(Number(value) > 0){
                    return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
                } else {
                    return <>{value}</>
                }
            },
        },
        {
            title: '60+',
            key: '_60Year',
            dataIndex: '_60Year',
            render(value, record, index) {
                if(Number(value) > 0){
                    return <span className="px-2 py-1 rounded-full bg-orange-500 text-white " > {value}</span>
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
                        <div >{t("baoCaoDuLieu:chon_loai_thoi_gian")} : </div>
                        <Select
                            className="w-[150px]"
                            showSearch
                            placeholder="--- Tùy Chọn ---"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            value={timeType}
                            options={[
                                { label: 'Thời gian hẹn', value: 'appointmentTime' },
                                { label: 'Thời gian tạo', value: 'created_at' }
                            ]}
                            onChange={onChangeTimeType}
                        />
                    </div>
                    <div>
                        <div >{t("baoCaoDuLieu:chon_moc_thoi_gian")} : </div>
                        <Select
                            className="w-[150px]"
                            allowClear
                            showSearch
                            placeholder="--- Tùy Chọn ---"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            value={picker}
                            options={TIME}
                            onChange={onChangeTime}
                        />
                    </div>
                    <div>
                        <div>{t("baoCaoDuLieu:thoi_gian")} :</div>
                        <DatePicker allowClear={false} onChange={onChange} picker={picker} defaultValue={currentWeek} />
                    </div>
                    <div>
                        <div>{t("baoCaoDuLieu:tinh_trang")} :</div>
                        <Select
                            className="w-[150px]"
                            allowClear
                            showSearch
                            placeholder={`---${t("baoCaoDuLieu:tuy_chon")}---`}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            options={[
                                { id: '2', value: 'ĐÃ ĐẾN', label: 'ĐÃ ĐẾN' },
                                { id: '3', value: 'CHƯA ĐẾN', label: 'CHƯA ĐẾN' }
                            ]}
                            onChange={onChangeStatus}
                        />
                    </div>
                    <div>
                        <div>{t("baoCaoDuLieu:nguon_den")} :</div>
                        <Select
                            className="w-[150px]"
                            allowClear
                            showSearch
                            placeholder={`---${t("baoCaoDuLieu:tuy_chon")}---`}
                            filterOption={(input, option) =>
                                typeof option?.label === 'string' && option.label.toLowerCase().includes(input.toLowerCase())
                            }
                            options={patient.media.length > 0 && patient.media.map((item: any) => {
                                return {
                                    label: item.name,
                                    value: item.id
                                }
                            })}
                            onChange={onChangeMedia}
                        />
                    </div>

                    <Button onClick={onClickSearch} className="mt-5" type="primary" >{t("baoCaoDuLieu:tim_kiem")}</Button>
                </Space>
                <Table<DataType> columns={columns} dataSource={dataReport.tuoi || []} bordered pagination={false} />
            </> : <NotHospital />
        }

    </Fragment>
}

export default AgeStatistics