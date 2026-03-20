import { FC, Fragment } from "react";
import { Button, Checkbox } from "antd";
import type { CheckboxProps } from 'antd';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
interface IProps {
    check: any,
    setCheck: any,
    menu: any
}
const ComponentExportData: FC<IProps> = (props) => {
    const {check, setCheck, menu} = props;
    const navigate = useNavigate();
    const {t } = useTranslation(['BCCTDVKH','DSDangKyHen'])

    const onChangeHVT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, name: e.target.checked }))
      };

      const onChangeGT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, gender: e.target.checked }))
      };

      const onChangeT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, yearOld: e.target.checked }))
      };

      const onChangeSDT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, phone: e.target.checked }))
      };

      const onChangeNDTV: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, content: e.target.checked }))
      };

      const onChangeKhoa: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, department: e.target.checked }))
      };
      const onChangeBenh: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, diseases: e.target.checked }))
      };

      const onChangeTinh: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, city: e.target.checked }))
      };

      const onChangeHuyen: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, district: e.target.checked }))
      };

      const onChangeMCG: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, code: e.target.checked }))
      };

      const onChangeTGH: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, appointmentTime: e.target.checked }))
      };

      const onChangeTGNH: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, reminderTime: e.target.checked }))
      };

      const onChangeGC: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, note: e.target.checked }))
      };

      const onChangeTT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, status: e.target.checked }))
      };

      const onChangeBS: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, doctor: e.target.checked }))
      };

      const onChangeNT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, user: e.target.checked }))
      };

      const onChangeMDT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, treatment: e.target.checked }))
      };

      const onChangeTGT: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, created_at: e.target.checked }))
      };

      const onChangeMedia: CheckboxProps['onChange'] = (e) => {
        setCheck((form : any)=> ({...form, media: e.target.checked }))
      };

      const onClickCheckAll = (e: React.MouseEvent<HTMLElement>)=> {
        e.preventDefault()
        setCheck((prevCheck : any) => {
            const allTrueCheck = Object.keys(prevCheck).reduce((acc : any, key) => {
                acc[key] = true;
                return acc;
            }, {} as typeof prevCheck);
            return allTrueCheck;
        });
      }

      const onClickComeBack = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setCheck((prevCheck : any) => {
            const allFalseCheck = Object.keys(prevCheck).reduce((acc : any, key) => {
                acc[key] = false;
                return acc;
            }, {} as typeof prevCheck);
            return allFalseCheck;
        });
        navigate(`/xuat-du-lieu-benh-nhan`);
      }
    return <Fragment>
        <div className="flex items-center gap-1 flex-wrap " >
                <div className="text-base text-red-500 font-bold " >{t("BCCTDVKH:du_lieu_xuat")} :</div>
                <Checkbox onChange={onChangeHVT} checked={check.name}>{t("DSDangKyHen:ho_va_ten")}</Checkbox>
                <Checkbox onChange={onChangeGT} checked={check.gender} >{t("DSDangKyHen:gioi_tinh")}</Checkbox>
                <Checkbox onChange={onChangeT} checked={check.yearOld}>{t("DSDangKyHen:tuoi")}</Checkbox>
                {
                  menu?.[1].ds?.action_XDLBN?.phone && <Checkbox onChange={onChangeSDT} checked={check.phone}>{t("DSDangKyHen:so_dien_thoai")}</Checkbox>
                }
                
                <Checkbox onChange={onChangeNDTV} checked={check.content}>{t("DSDangKyHen:noi_dung_tu_van")}</Checkbox>
                <Checkbox onChange={onChangeKhoa} checked={check.department}>{t("DSDangKyHen:khoa")}</Checkbox>
                <Checkbox onChange={onChangeBenh} checked={check.diseases}>{t("DSDangKyHen:benh")}</Checkbox>
                <Checkbox onChange={onChangeMedia} checked={check.media}>{t("DSDangKyHen:nguon")}</Checkbox>
                <Checkbox onChange={onChangeTinh} checked={check.city}>{t("DSDangKyHen:tinh/TP")}</Checkbox>
                <Checkbox onChange={onChangeHuyen} checked={check.district}>{t("DSDangKyHen:quan/huyen")}</Checkbox>
                <Checkbox onChange={onChangeMCG} checked={check.code}>{t("DSDangKyHen:ma_chuyen_gia")}</Checkbox>
                <Checkbox onChange={onChangeTGH} checked={check.appointmentTime}>{t("DSDangKyHen:thoi_gian_hen")}</Checkbox>
                <Checkbox onChange={onChangeTGNH} checked={check.reminderTime}>{t("DSDangKyHen:thoi_gian_nhac_hen")}</Checkbox>
                <Checkbox onChange={onChangeGC} checked={check.note}>{t("DSDangKyHen:ghi_chu")}</Checkbox>
                <Checkbox onChange={onChangeTT} checked={check.status}>{t("DSDangKyHen:trang_thai")}</Checkbox>
                <Checkbox onChange={onChangeBS} checked={check.doctor}>{t("DSDangKyHen:bac_si")}</Checkbox>
                <Checkbox onChange={onChangeNT} checked={check.user}>{t("DSDangKyHen:nguoi_them")}</Checkbox>
                <Checkbox onChange={onChangeMDT} checked={check.treatment}>{t("DSDangKyHen:muc_dieu_tri")}</Checkbox>
                <Checkbox onChange={onChangeTGT} checked={check.created_at}>{t("DSDangKyHen:thoi_gian_them")}</Checkbox>
                <Button onClick={onClickCheckAll} variant="dashed" color="primary" type="default" >{t("BCCTDVKH:tat_ca")}</Button>
                <Button onClick={onClickComeBack} variant="outlined" color="danger" type="primary" >{t("DSDangKyHen:quay_lai")}</Button>
            </div>
    </Fragment>
}

export default ComponentExportData