import type { TableProps } from 'antd';
import { Table, Tag } from 'antd';
import moment from "moment";
import { FC, Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BreadcrumbComponent from "../../../components/breadcrumbComponent";
import { getAllHistoryPatiant } from "../../../features/patientSlice";
import { AppDispatch, RootState } from "../../../redux/store";


const OperationHistory:FC = () => {
    let { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { history } = useSelector((state: RootState) => state.patient);
    const {t } = useTranslation(['DSDangKyHen'])

    useEffect(() =>{ 
        if(id){
            dispatch(getAllHistoryPatiant(Number(id)))
        }
    }, [id, dispatch])

    const columns: TableProps<any>['columns'] = [
        {
          title: t("DSDangKyHen:thao_tac") ,
          dataIndex: 'action',
          key: 'action',
          render: (value) =>{
            if(value === 'THÊM'){
                return <Tag color="#87d068">{value}</Tag>
            }
            if(value === 'CẬP NHẬT'){
                return <Tag color="#108ee9">{value}</Tag>
            } else {
                return <Tag color="#f50">{value}</Tag>
            } 
          },
          width: 100,
          fixed: 'left',
        },
        {
          title: t("DSDangKyHen:thoi_gian_thao_tac"),
          dataIndex: 'created_at',
          key: 'created_at',
          render: (value) =>{
            return <>{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</>
          },
          width: 150,
        },
        {
            title: t("DSDangKyHen:nguoi_thay_doi") ,
            dataIndex: 'user',
            key: 'user',
            render: (value) =>{
                return <>{value?.fullName}</>
              },
              width: 150,
          },
        {
          title: t("DSDangKyHen:ho_va_ten"),
          dataIndex: 'name',
          key: 'name',
          width: 150,
        },
        {
          title: t("DSDangKyHen:gioi_tinh"),
          key: 'gender',
          dataIndex: 'gender',
          width: 150,
          
        },
        {
          title: t("DSDangKyHen:so_dien_thoai"),
          key: 'phone',
          dataIndex: 'phone',
          width: 150,
         
        },
        {
            title:t("DSDangKyHen:ma_chuyen_gia") ,
            key: 'code',
            dataIndex: 'code',
            width: 120,
          },
          {
            title: t("DSDangKyHen:khoa"),
            key: 'department',
            dataIndex: 'department',
            render: (value) =>{
                return <>{value?.name}</>
              },
              width: 120,
          },
          {
            title:t("DSDangKyHen:benh"),
            key: 'diseases',
            dataIndex: 'diseases',
            render: (value) =>{
                return <>{value?.name}</>
              },
              width: 150,
          },
          {
            title: t("DSDangKyHen:nguon_den"),
            key: 'media',
            dataIndex: 'media',
            render: (value) =>{
                return <>{value?.name}</>
              },
              width: 150,
          },
          {
            title: t("DSDangKyHen:tinh/TP") ,
            key: 'city',
            dataIndex: 'city',
            render: (value) =>{
                return <>{value?.name}</>
              },
              width: 150,
          },
          {
            title: t("DSDangKyHen:quan/huyen") ,
            key: 'district',
            dataIndex: 'district',
            render: (value) =>{
                return <>{value?.name}</>
              },
              width: 150,
          },
          {
            title: t("DSDangKyHen:thoi_gian_hen") ,
            key: 'appointmentTime',
            dataIndex: 'appointmentTime',
            render: (value) =>{
                return <>{moment(value * 1000).format('DD-MM-YYYY HH:mm:ss')}</>
              },
              width: 150,
          },
          {
            title: t("DSDangKyHen:thoi_gian_nhac_hen") ,
            key: 'reminderTime',
            dataIndex: 'reminderTime',
            render: (value) =>{
                return <>{value !== 0 ?moment(value * 1000).format('DD-MM-YYYY HH:mm:ss') : ''}</>
              },
              width: 150,
          },
          {
            title: t("DSDangKyHen:bac_si") ,
            key: 'doctor',
            dataIndex: 'doctor',
            render: (value) =>{
                return <>{value?.name}</>
              },
              width: 150,
          },
          {
            title: t("DSDangKyHen:tinh_trang_cuoc_hen") ,
            key: 'status',
            dataIndex: 'status',
            render: (value) =>{
                return <>{value}</>
              },
              width: 150,
          },
      ];

    

    const dataBreadcrumb = [
        {
            title: t("DSDangKyHen:quan_ly_cuoc_hen"),
        },
        {
            type: 'separator',
        },
        {
            title: <Link to={'/danh-sach-dang-ky-hen'} > {t("DSDangKyHen:danh_sach_dang_ky_hen")} </Link>,
        },
        {
            type: 'separator',
        },
        {
            title: t("DSDangKyHen:lich_su_thao_tac") ,
        },
       
    ];
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <div className="mt-2" >
            <Table<any> rowKey="id" size="small" columns={columns} dataSource={history.length > 0 ? history : []} pagination={false} scroll={{ x: 'max-content' }} />
        </div>
    </Fragment>
}

export default OperationHistory