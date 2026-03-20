import { Badge, Col, Row } from "antd";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import BrankingHome from "../../components/brankingHome";
import { RootState } from "../../redux/store";
import useMenuData from "../../hooks/useMenuData";

const CartRanking: FC = () => {
    const { DanhSachXepHang, ThongKeDangKy } = useSelector((state: RootState) => state.dashboard);
    const {t } = useTranslation(['home'])
    const menu = useMenuData();
    return <Fragment>
        <Row justify="start" className="mt-3 gap-3 ">
            {
                menu?.[0].ds.TKTong === true && <Col span={8} xs={24} sm={24} md={24} lg={20} xl={12} xxl={8}  >
                <Badge.Ribbon text={t("home:thong_ke_dang_ky")}>
                    <Col span={24} className="rounded border-green-700 border  ">
                        <Row justify="start" className=" gap-2 mt-7 bg-slate-200 p-2">
                            <Col span={4}>
                            {t("home:hom_nay")}:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                            {t("home:tong_cong")}: <strong>{ThongKeDangKy?.TKDangKy?.currentDate?.tong || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                             {t("home:da_den")}: <strong>{ThongKeDangKy?.TKDangKy?.currentDate?.daden || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                              {t("home:chua_den")}: <strong>{ThongKeDangKy?.TKDangKy?.currentDate?.chuaden || 0}</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  p-2">
                            <Col span={4}>
                              {t("home:hom_qua")}:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                {t("home:tong_cong")}: <strong>{ThongKeDangKy?.TKDangKy?.yesterday?.tong || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                {t("home:da_den")}: <strong>{ThongKeDangKy?.TKDangKy?.yesterday?.daden || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                {t("home:chua_den")}: <strong>{ThongKeDangKy?.TKDangKy?.yesterday?.chuaden || 0}</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                            <Col span={4}>
                               {t("home:thang_nay")}:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                {t("home:tong_cong")}: <strong>{ThongKeDangKy?.TKDangKy?.thisMonth?.tong || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                {t("home:da_den")}: <strong>{ThongKeDangKy?.TKDangKy?.thisMonth?.daden || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                {t("home:chua_den")}: <strong>{ThongKeDangKy?.TKDangKy?.thisMonth?.chuaden || 0}</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  p-2">
                            <Col span={4}>
                              {t("home:hang_nam")}:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                {t("home:tong_cong")}: <strong>{ThongKeDangKy?.TKDangKy?.yearly?.tong || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                {t("home:da_den")}: <strong>{ThongKeDangKy?.TKDangKy?.yearly?.daden || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                {t("home:chua_den")}: <strong>{ThongKeDangKy?.TKDangKy?.yearly?.chuaden || 0}</strong>
                            </Col>
                        </Row>
                        <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                            <Col span={4}>
                              {t("home:thang_truoc")}:
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                {t("home:tong_cong")}: <strong>{ThongKeDangKy?.TKDangKy?.lastMonth?.tong || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                {t("home:da_den")}: <strong>{ThongKeDangKy?.TKDangKy?.lastMonth?.daden || 0}</strong>
                            </Col>
                            <Col span={6} className="flex gap-1" >
                                {t("home:chua_den")}: <strong>{ThongKeDangKy?.TKDangKy?.lastMonth?.chuaden || 0}</strong>
                            </Col>
                        </Row>
                    </Col>

                </Badge.Ribbon>
            </Col>
            }
            {
                menu?.[0].ds.BXHang === true && <BrankingHome color="pink" text={t("home:danh_sach_xep_hang_tham_kham_thang_nay")}  data={DanhSachXepHang?.DSXHThamKhamThangNay?.result} />
            }
            {
                 menu?.[0].ds.BXHang === true && <BrankingHome color="red" text={t("home:danh_sach_Xep_hang_dat_cho_thang_nay")}  data={DanhSachXepHang?.DSXHDatChoThangNay?.result} />
            }
            

        </Row>
        <Row justify="start" className="mt-3 gap-3 ">
            {
                 menu?.[0].ds.TKTong === true &&  <Col span={8} xs={24} sm={24} md={24} lg={20} xl={12} xxl={8}  >
                 <Badge.Ribbon color="volcano" text={t("home:thong_ke_cac_cuoc_hen_chua_quyet_dinh")}>
                     <Col span={24} className="rounded border-green-700 border  ">
                         <Row justify="start" className=" gap-2 mt-7 bg-slate-200 p-2">
                             <Col span={4}>
                                 {t("home:hom_nay")}:
                             </Col>
                             <Col span={6} className="flex gap-1" >
                                 {t("home:tong_cong")}: <strong>{ThongKeDangKy?.TKCuocHenChuaQuyetDinh?.currentDate?.tong || 0}</strong>
                             </Col>
 
                         </Row>
                         <Row justify="start" className=" gap-2  p-2">
                             <Col span={4}>
                                 {t("home:hom_qua")}:
                             </Col>
                             <Col span={6} className="flex gap-1" >
                                 {t("home:tong_cong")}: <strong>{ThongKeDangKy?.TKCuocHenChuaQuyetDinh?.yesterday?.tong || 0}</strong>
                             </Col>
 
                         </Row>
                         <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                             <Col span={4}>
                                 {t("home:thang_nay")}:
                             </Col>
                             <Col span={6} className="flex gap-1" >
                                 {t("home:tong_cong")}: <strong>{ThongKeDangKy?.TKCuocHenChuaQuyetDinh?.thisMonth?.tong || 0}</strong>
                             </Col>
 
                         </Row>
                         <Row justify="start" className=" gap-2  p-2">
                             <Col span={4}>
                                 {t("home:hang_nam")}:
                             </Col>
                             <Col span={6} className="flex gap-1" >
                                 {t("home:tong_cong")}: <strong>{ThongKeDangKy?.TKCuocHenChuaQuyetDinh?.yearly?.tong || 0}</strong>
                             </Col>
 
                         </Row>
                         <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                             <Col span={4}>
                                 {t("home:thang_truoc")}:
                             </Col>
                             <Col span={6} className="flex gap-1" >
                                 {t("home:tong_cong")}: <strong>{ThongKeDangKy?.TKCuocHenChuaQuyetDinh?.lastMonth?.tong || 0}</strong>
                             </Col>
 
                         </Row>
                     </Col>
 
                 </Badge.Ribbon>
             </Col>
            }
           {
             menu?.[0].ds.BXHang === true && <BrankingHome color="cyan" text={t("home:danh_sach_xep_hang_tham_kham_thang_truoc")}  data={DanhSachXepHang?.DSXHThamKhamThangTruoc?.result} />
           }
            {
                 menu?.[0].ds.BXHang === true && <BrankingHome color="green" text={t("home:danh_sach_Xep_hang_dat_cho_thang_truoc")}  data={DanhSachXepHang?.DSXHDatChoThangTruoc?.result} />
            }
            

        </Row>

    </Fragment>
}

export default CartRanking