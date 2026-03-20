import { Alert, Badge, Col, Row } from "antd";
import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslation } from "react-i18next";

const Consultant: FC = () => {
    const ThongKeTuVan = useSelector((state: RootState) => state.dashboard.ThongKeTuVan);
    const { t } = useTranslation(['home'])
    return <Fragment>
        <Row className="mt-3" >
            <Alert className=" text-base font-semibold "  message={t("home:thong_ke_theo_tu_van")}   type="success" />

        </Row>
        <Row justify="start" className="mt-3 gap-3 " wrap>
        {
                ThongKeTuVan?.length > 0 && ThongKeTuVan?.map((item: any, index: number) => {
                    return <Col key={item?.name} xs={24} sm={24} md={11} lg={7} xl={6} xxl={4}  >
                    <Badge.Ribbon color="green" text={item?.name}>
                        <Col span={24} className="rounded border-green-700 border  ">
                            <Row justify="start" className=" gap-2 mt-7 bg-slate-200 p-2">
                                <Col span={7}>
                                {t("home:hom_nay")}:
                                </Col>
                               
                                <Col span={8} className="flex gap-1" >
                                  {t("home:du_kien")}: <strong>{item?.currentDate.dukien}</strong>
                                </Col>
                                <Col span={5} className="flex gap-1" >
                                  {t("home:den")}: <strong>{item?.currentDate.den}</strong>
                                </Col>
                            </Row>
                            <Row justify="start" className=" gap-2  p-2">
                                <Col span={7}>
                                {t("home:hom_qua")}:
                                </Col>
                               
                                <Col span={8} className="flex gap-1" >
                                    {t("home:du_kien")}: <strong>{item?.yesterday.dukien}</strong>
                                </Col>
                                <Col span={5} className="flex gap-1" >
                                    {t("home:den")}: <strong>{item?.yesterday.den}</strong>
                                </Col>
                            </Row>
                            <Row justify="start" className=" gap-2  bg-slate-200 p-2">
                                <Col span={7}>
                                    {t("home:thang_nay")}:
                                </Col>
                                
                                <Col span={8} className="flex gap-1" >
                                    {t("home:du_kien")}: <strong>{item?.thisMonth.dukien}</strong>
                                </Col>
                                <Col span={5} className="flex gap-1" >
                                    {t("home:den")}: <strong>{item?.thisMonth.den}</strong>
                                </Col>
                            </Row>
                            <Row justify="start" className=" gap-2  p-2">
                                <Col span={7  }>
                                {t("home:thang_truoc")}:
                                </Col>
                                
                                <Col span={8} className="flex gap-1" >
                                    {t("home:du_kien")}: <strong>{item?.lastMonth.dukien}</strong>
                                </Col>
                                <Col span={5} className="flex gap-1" >
                                    {t("home:den")}: <strong>{item?.lastMonth.den}</strong>
                                </Col>
                            </Row>
                        </Col>
                    </Badge.Ribbon>
                </Col>
                })
            }
            
        </Row>
    </Fragment>
}

export default Consultant