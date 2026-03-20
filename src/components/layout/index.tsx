import {
    UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, MenuProps, theme } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaHistory } from "react-icons/fa";
import { GrSystem } from "react-icons/gr";
import { IoHomeOutline, IoSettings } from "react-icons/io5";
import { TbReport } from "react-icons/tb";
import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import useMenuData from '../../hooks/useMenuData';
import HeaderComponent from '../header';
import { MdOutlineHistoryEdu } from "react-icons/md";
import { useCheckRoleAdmin } from '../../hooks/useCheckRole';
import { RiDeleteBin2Fill } from "react-icons/ri";
import { GiBlackHandShield } from "react-icons/gi";

const { Sider, Content } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const sub7 = [
    '/nhat-ky-hoat-dong', '/nhat-ky-loi-dang-nhap'
]

const sub6 = [
    '/quan-ly-con-nguoi', '/quan-ly-quyen', '/danh-sach-benh-vien'
]

const sub5 = [
    '/thiet-lap-bac-si', '/thiet-lap-benh-tat', '/quan-ly-khoa', '/cong-cu-tim-kiem'
]

const sub4 = [
    '/bao-cao-tong-hop', '/thong-ke-gioi-tinh', '/thong-ke-tuoi', '/thong-ke-theo-benh', '/thong-ke-theo-nguon-truyen-thong', '/thong-ke-theo-tinh-trang-nhap-vien', '/thong-ke-theo-bac-si', '/thong-ke-theo-dich-vu-khach-hang', '/bao-cao-khu-vuc'
]

const sub1 = [
    '/danh-sach-dang-ky-hen', '/bao-cao-chi-tiet-dich-vu-khach-hang', '/bao-cao-xu-huong-hang-thang', '/xuat-du-lieu-benh-nhan', '/bao-cao-do-hoa-tuy-chinh'
]

const LayoutComponent: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const menu = useMenuData(); 
    const location = useLocation();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const {t } = useTranslation(['home'])
     const checkRole = useCheckRoleAdmin()

    useLayoutEffect(() => {
        if (sub7.includes(location.pathname)) {
            setOpenKeys(['sub7']); 
        } 
        if (sub6.includes(location.pathname)) {
            setOpenKeys(['sub6']); 
        } 
        if (sub5.includes(location.pathname)) {
            setOpenKeys(['sub5']); 
        } 

        if (sub1.includes(location.pathname)) {
            setOpenKeys(['sub1']); 
        } 

        if(sub4.includes(location.pathname)){
            setOpenKeys(['sub4'])
        }
       
    }, [location.pathname, sub7])
    
    const items: MenuItem[] = [
        getItem(<Link to={'/'}>{t("home:menu_left.home")}</Link>, '/', <IoHomeOutline size={20} />),
        
        ...(menu?.[1]?.QLBN === true ? [ getItem(<div>{t("home:menu_left.Patient_Appointment_Management")}</div>, 'sub1', <UserOutlined size={20}/>, [
            menu?.[1]?.ds?.DSDKH === true ? getItem(<Link to={'/danh-sach-dang-ky-hen'}>{t("home:menu_left.Appointment_registration_list")}</Link>, '/danh-sach-dang-ky-hen'): null,
            // menu?.[1]?.ds?.CHTKBN === true ? getItem(<Link to={'/tim-kiem-benh-nhan'}>Tìm kiếm bệnh nhân</Link>, '4') : null,
            // menu?.[1]?.ds?.LLTVBN === true ? getItem(<Link to={'/tim-kiem-benh-nhan'}>Lặp lại truy vấn bệnh nhân</Link>, '5') : null,
            menu?.[1]?.ds?.BCCTDVKH === true ?getItem(<Link to={'/bao-cao-chi-tiet-dich-vu-khach-hang'}>{t("home:menu_left.bao_cao_chi_tiet_dich_vu_khach_hang")}</Link>, '/bao-cao-chi-tiet-dich-vu-khach-hang'): null,
            menu?.[1]?.ds?.BCXHHT === true ?getItem(<Link to={'/bao-cao-xu-huong-hang-thang'}>{t("home:menu_left.bao_cao_xu_huong_hang_thang")}</Link>, '/bao-cao-xu-huong-hang-thang'): null,
            menu?.[1]?.ds?.BCDHTC === true ?getItem(<Link to={'/bao-cao-do-hoa-tuy-chinh'}>{t("home:menu_left.bao_cao_do_hoa_tuy_chinh")}</Link>, '/bao-cao-do-hoa-tuy-chinh'): null,
            menu?.[1]?.ds?.XDLBN === true ?getItem(<Link to={'/xuat-du-lieu-benh-nhan'}>{t("home:menu_left.xuat_du_lieu_benh_nhanh")}</Link>, '/xuat-du-lieu-benh-nhan'): null,
            // menu?.[1]?.ds?.SSDLTCN === true ?getItem(<Link to={'/so-sanh-du-lieu-theo-nam'}>So sánh dữ liệu theo từng năm</Link>, '/so-sanh-du-lieu-theo-nam'): null,
        ]),] : []),
        
        ...(menu?.[3]?.BCDL === true ? [getItem( <div>{t("home:menu_left.bao_cao_du_lieu")}</div>, 'sub4', <TbReport size={20}/>, [
            menu?.[3]?.ds.BCTH === true ?getItem(<Link to={'/bao-cao-tong-hop'}>{t("home:menu_left.bao_cao_tong_hop")}</Link>, '/bao-cao-tong-hop') : null, 
            menu?.[3]?.ds.GT === true ? getItem(<Link to={'/thong-ke-gioi-tinh'}>{t("home:menu_left.gioi_tinh")}</Link>, '/thong-ke-gioi-tinh') : null,
            menu?.[3]?.ds.TUOI === true ? getItem(<Link to={'/thong-ke-tuoi'}>{t("home:menu_left.tuoi")}</Link>, '/thong-ke-tuoi') : null,
            menu?.[3]?.ds.LBN === true ? getItem(<Link to={'/thong-ke-theo-benh'}>{t("home:menu_left.loai_benh_nhan")}</Link>, '/thong-ke-theo-benh') : null,
            menu?.[3]?.ds.NTT === true ? getItem(<Link to={'/thong-ke-theo-nguon-truyen-thong'}>{t("home:menu_left.nguon_truyen_thong")}</Link>, '/thong-ke-theo-nguon-truyen-thong') : null,
            menu?.[3]?.ds.TTNV === true ? getItem(<Link to={'/thong-ke-theo-tinh-trang-nhap-vien'}>{t("home:menu_left.tinh_trang_nhap_vien")}</Link>, '/thong-ke-theo-tinh-trang-nhap-vien') : null,
            menu?.[3]?.ds.BSLT === true ? getItem(<Link to={'/thong-ke-theo-bac-si'} >{t("home:menu_left.bac_si")}</Link>, '/thong-ke-theo-bac-si') : null,
            menu?.[3]?.ds.DVKH === true ? getItem(<Link to={'/thong-ke-theo-dich-vu-khach-hang'} >{t("home:menu_left.dich_vu_khach_hang")}</Link>, '/thong-ke-theo-dich-vu-khach-hang') : null,
            menu?.[3]?.ds.BCKV === true ? getItem(<Link to={'/bao-cao-khu-vuc'} >Báo cáo khu vực</Link>, '/bao-cao-khu-vuc') : null,
        
        ]),] : []), 
        ...(menu?.[4]?.CD === true ? [getItem(<>{t("home:menu_left.cai_dat")}</>, 'sub5', <IoSettings size={20}/>, [
            menu?.[4]?.ds.CDBS === true ? getItem(<Link to={'/thiet-lap-bac-si'}>{t("home:menu_left.cai_dat_bac_si")}</Link>, '/thiet-lap-bac-si') : null, 
            menu?.[4]?.ds.TLBT === true ? getItem(<Link to={'/thiet-lap-benh-tat'} >{t("home:menu_left.thet_lap_benh_tat")}</Link>, '/thiet-lap-benh-tat') : null,
            // menu?.[4]?.ds.CDLDTYT === true ? getItem('Cài đặt loại điều trị y tế', '25') : null,
            menu?.[4]?.ds.CDKBV === true ? getItem(<Link to={'/quan-ly-khoa'}>{t("home:menu_left.cai_dat_khoa_benh_vien")}</Link>, '/quan-ly-khoa') : null,
            menu?.[4]?.ds.CDCCTK === true ? getItem( <Link to={'/cong-cu-tim-kiem'} >{t("home:menu_left.Cai_dat_cong_cu_tim_kiem")}</Link> , '/cong-cu-tim-kiem') : null,
        
        ]),] : []),
        
        ...(menu?.[6]?.QLHT === true ? [getItem(<>{t("home:menu_left.quan_ly_he_thong")}</>, 'sub6', <GrSystem size={20}/>, [
            menu?.[6]?.ds.QLCN === true ? getItem(<Link to={'/quan-ly-con-nguoi'}>{t("home:menu_left.quan_ly_con_nguoi")}</Link>, '/quan-ly-con-nguoi') : null, 
            menu?.[6]?.ds.QLQ === true ? getItem(<Link to={'/quan-ly-quyen'}>{t("home:menu_left.quan_ly_quyen")}</Link>, '/quan-ly-quyen') : null,
            menu?.[6]?.ds.DSBV === true ? getItem(<Link to={'/danh-sach-benh-vien'}>{t("home:menu_left.danh_sach_benh_vien")}</Link>, '/danh-sach-benh-vien') : null,
            // menu?.[6]?.ds.QLTB === true ? getItem('Quản lý thông báo', '31') : null,
        ]),] : []),
        ...(menu?.[7]?.LSTT === true ? [getItem(<>{t("home:menu_left.lich_su_thao_tac")}</>, 'sub7', <FaHistory size={20}/>, [
            menu?.[7]?.ds.NKHD === true ?  getItem(<Link to={'/nhat-ky-hoat-dong'}>{t("home:menu_left.nhat_ky_hoat_dong")}</Link>, '/nhat-ky-hoat-dong') : null, 
            menu?.[7]?.ds.NKLDN === true ?  getItem(<Link to={'/nhat-ky-loi-dang-nhap'}>{t("home:menu_left.nhat_ky_loi_dang_nhap")}</Link>, '/nhat-ky-loi-dang-nhap') : null,
        ]),] : []),
        ...[checkRole === true ? getItem(<Link to={"/danh-sach-khach-hang-bi-xoa"} >Thùng rác</Link>, '/danh-sach-khach-hang-bi-xoa', <RiDeleteBin2Fill size={20}/>) : null ],
        ...[checkRole === true ? getItem(<Link to={"/danh-sach-den"} >Danh sách đen</Link>, '/danh-sach-den', <GiBlackHandShield size={20}/>) : null ],
    ];

    

    return (
        <Layout style={{ height: '100vh' }} >
            <Sider  style={{overflow:'auto'}} width={300} trigger={null} collapsible collapsed={collapsed}  >
                <div className="p-2">
                    <img className='w-[100%] ' src={logo} alt="..." />
                </div>
                <Menu
                    className='mt-3'
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    openKeys={openKeys} // Use openKeys instead of defaultOpenKeys
                    onOpenChange={setOpenKeys} // Update openKeys on change
                    items={items}
                />
            </Sider>
            <Layout>
                <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
                <Content
                    style={{
                        margin: '6px ',
                        padding: '0px 0px 0px 10px',
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow:'auto'
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

export default LayoutComponent