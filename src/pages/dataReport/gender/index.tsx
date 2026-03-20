import { FC, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Button, DatePicker, DatePickerProps, Select, Space } from "antd";
import { getDaysInQuarter, getMonthsInYear, TIME } from "../../../utils";
import dayjs from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
import { getAllMedia } from "../../../features/patientSlice";
import { getThongkeGioitinh } from "../../../features/dataReportSlice";
import NotHospital from "../../../components/notHospital";
import { useTranslation } from "react-i18next";
dayjs.extend(isoWeek);

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },

    },
};

const Gender: FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const hospitalId = localStorage.getItem('hospitalId')
    const [picker, setPicker] = useState<any>('week');
    const [time, setTime] = useState<any>([]);
    const [timeType, setTimeType] = useState<string>('appointmentTime');
    const [status, setStatus] = useState<string>('');
    const [media, setMedia] = useState<string>('');
    const { patient, dataReport } = useSelector((state: RootState) => state);
    const {t } = useTranslation(['baoCaoDuLieu','DSDangKyHen'])
    
    const labels = dataReport.gender?.map((item:any)=> item?.picker === 'year' ? `${item?.month}/${item?.year}` :`${item?.day}/${item?.month}`);

    useEffect(() => {
        if(hospitalId){
            dispatch(getAllMedia(Number(hospitalId)));
        }
    }, [dispatch, hospitalId])

    const data = {
        labels,
        datasets: [
            {
                label: t("baoCaoDuLieu:nam") ,
                data: dataReport.gender?.map((item : any) => item?.NAM ),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.4,
            },
            {
                label:t("baoCaoDuLieu:nu") ,
                data: dataReport.gender?.map((item : any) => item?.NU ),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.4,
            },
            {
                label:t("baoCaoDuLieu:khong_xac_dinh") ,
                data: dataReport.gender?.map((item : any) => item?.KHONGXACDINH ),
                borderColor: '#f1e016',
                backgroundColor: '#f1e016',
                tension: 0.4,
            },
            {
                label: t("baoCaoDuLieu:tong"),
                data: dataReport.gender?.map((item : any) => item?.total ),
                borderColor: '#2e8502',
                backgroundColor: '#52c41a',
                tension: 0.4,
            },
        ],
    };

    const dataBreadcrumb = [
        {
            title:t("baoCaoDuLieu:bao_cao_du_lieu") ,
        },
        {
            type: 'separator',
        },
        {

            title:t("baoCaoDuLieu:thong_ke_gioi_tinh") ,
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
          if(picker === 'month'){
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
      
          if(picker === 'quarter'){
            const year = date.$y;
            const month = date.$M;
            const days = getDaysInQuarter(year, month);
            setTime(days);
          }
      
          if(picker === 'year'){
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

    const onChangeMedia = (e : any) => {
        setMedia(e);
    } 
    const onClickSearch = () => {
            const body = {
              hospitalId: hospitalId,
              time: picker ==='year' ?  convertTimeYear : convertTime,
              picker: picker,
              timeType: timeType,
              status: status,
              media: media
            }
            dispatch(getThongkeGioitinh(body))

    }
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
                        {label: 'Thời gian hẹn', value:'appointmentTime'},
                        {label: 'Thời gian tạo', value:'created_at'}
                    ]}
                  onChange={onChangeTimeType}
                />
            </div>
            <div>
                <div >{t("baoCaoDuLieu:chon_moc_thoi_gian")}: </div>
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
                <DatePicker allowClear={false} onChange={onChange} picker={picker} />
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
                    options={patient.media.length > 0 && patient.media.map((item : any) => {
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
        <Line options={options} data={data} />
        </> : <NotHospital />
        }
    </Fragment>
}

export default Gender