import { FC, Fragment, useEffect } from "react";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getBaoCaoXuHuongHangThang } from "../../../features/hospitalSlice";
import NotHospital from "../../../components/notHospital";
import { useTranslation } from "react-i18next";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const CurrentTrendReport:FC = () => {
  
    const dispatch = useDispatch<AppDispatch>();
    const {BCXHHT} = useSelector((state: RootState) => state.hospital);
    const hospitalId = localStorage.getItem('hospitalId')
    const {t } = useTranslation(['BCCTDVKH'])

    useEffect(() => {
        if(hospitalId){
            dispatch(getBaoCaoXuHuongHangThang(Number(hospitalId)))
        }
        
    }, [dispatch,hospitalId])

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: t("BCCTDVKH:thong_ke_bieu_do_ds_hen_theo_thang") ,
            font: {
              size: 20, // Kích thước chữ
            
            },
          },
        },
      };

      const labels = BCXHHT.map((item:any)=> `${item.month}/${item.year}`)
      
      const data = {
        labels,
        datasets: [
          {
              label: t("BCCTDVKH:tong"),
              data: BCXHHT.map((item : any) => item.total ),
              backgroundColor: 'rgba(245, 40, 145, 0.8)',
            },
          {
            label:t("BCCTDVKH:da_den") ,
            data:BCXHHT.map((item : any) => item.totalDaDen ),
            backgroundColor: 'rgba(54, 156, 29, 0.8)',
          },
          {
            label:t("BCCTDVKH:chua_den") ,
            data: BCXHHT.map((item : any) => item.totalChuaDen ),
            backgroundColor: 'rgba(238, 94, 38, 0.8)',
          },
          
        ],
      };
    return <Fragment>
        {
            hospitalId ?
        <Bar options={options} data={data} />
        : <NotHospital />}
    </Fragment>
}

export default CurrentTrendReport