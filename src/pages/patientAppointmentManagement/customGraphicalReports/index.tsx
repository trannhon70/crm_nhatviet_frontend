import { FC, Fragment, useState } from "react";
import React from 'react';
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
import { Button, DatePicker, Select, Space } from "antd";
import type { DatePickerProps } from 'antd';
import dayjs from "dayjs";
import isoWeek from 'dayjs/plugin/isoWeek';
import { getDaysInQuarter, getMonthsInYear, TIME } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getBaoCaoDoHoaTuyChinh } from "../../../features/hospitalSlice";
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

export

const CustomGraphicalReports: FC = () => {
  const [picker, setPicker] = useState<any>('week');
  const [time, setTime] = useState<any>([]);
  const hospitalId = localStorage.getItem('hospitalId')
  const dispatch = useDispatch<AppDispatch>();
  const {BCDHTC} = useSelector((state: RootState) => state.hospital);
  const {t } = useTranslation(['BCCTDVKH'])

  const labels = BCDHTC?.map((item:any)=> item.picker === 'year' ? `${item.month}/${item.year}` :`${item.day}/${item.month}`);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text:t("BCCTDVKH:thong_ke_tuy_chinh") ,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: t("BCCTDVKH:chua_den") ,
        data: BCDHTC?.map((item : any) => item.totalChuaDen ),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.4,
      },
      {
        label:t("BCCTDVKH:da_den") ,
        data: BCDHTC?.map((item : any) => item.totalDaDen ),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.4,
      },
      {
        label: t("BCCTDVKH:tong") ,
        data: BCDHTC?.map((item : any) => item.total ),
        borderColor: '#2e8502',
        backgroundColor: '#52c41a',
        tension: 0.4,
      },
    ],
  };
  
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
    
  };

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


  const onClickSearch = () => {

    if(convertTime.length > 0){
      const body = {
        hospitalId: hospitalId,
        time: picker ==='year' ?  convertTimeYear : convertTime,
        picker: picker,
      }
      
      dispatch(getBaoCaoDoHoaTuyChinh(body))
    }
  }
  return <Fragment>
    <Space direction="horizontal">
      <div>
        <div >{t("BCCTDVKH:chon_moc_thoi_gian")} : </div>
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
        <div>{t("BCCTDVKH:thoi_gian")} :</div>
        <DatePicker allowClear={false} onChange={onChange} picker={picker} />
      </div>

      <Button onClick={onClickSearch} className="mt-5" type="primary" >{t("BCCTDVKH:tim_kiem")}</Button>
    </Space>
    <Line options={options} data={data} />
  </Fragment>
}

export default CustomGraphicalReports