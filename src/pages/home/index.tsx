import { Select } from "antd";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import NotHospital from "../../components/notHospital";
import { getDanhSachXepHangThamKham, getThongKeBenh, getThongKeDangKy, getThongKeKhoa, getThongKeQuaKenh, getThongKeTuVan, setDanhSachXepHangThamKham, setThongKeBenh, setThongKeDangKy, setThongKeKhoa, setThongKeQuaKenh, setThongKeTuVan } from "../../features/dashboardSlice";
import { getAllHospital, getByIdHospital } from "../../features/hospitalSlice";
import useMenuData from "../../hooks/useMenuData";
import { AppDispatch, RootState } from "../../redux/store";
import CardChannel from "./cardChannel";
import CartRanking from "./cartRanking";
import Consultant from "./consultant";
import DiseaseStatistics from "./diseaseStatistics";
import ScienceStatistics from "./scienceStatistics";
const { Option } = Select;

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const hospital = useSelector((state: RootState) => state.hospital.hospital);
    const users = useSelector((state: RootState) => state.users);

    const hospitalId = localStorage.getItem('hospitalId');
    const [nameSelect, setNameSelect] = useState<string | undefined>('')
    const [dataHospital, setDataHospital] = useState<any>([])
    const menu = useMenuData();
    const { t } = useTranslation(['home'])

    useEffect(() => {
        dispatch(getAllHospital());
    }, [dispatch]);

    useLayoutEffect(() => {
        if (hospitalId) {
            getHospitalStatistics(Number(hospitalId));
        }
    }, [dispatch, hospitalId])

    const getHospitalStatistics = useCallback((hospitalId: number) => {
        dispatch(getThongKeDangKy(hospitalId));
        dispatch(getDanhSachXepHangThamKham(hospitalId));
        setTimeout(() => {
            dispatch(getThongKeQuaKenh(hospitalId));
        }, 500)
        setTimeout(() => {
            dispatch(getThongKeKhoa(hospitalId));
        }, 1500)
        setTimeout(() => {
            dispatch(getThongKeBenh(hospitalId));
            dispatch(getThongKeTuVan(hospitalId));
        }, 3000)
    }, [dispatch]);

    const clearStatistics = useCallback(() => {
        dispatch(setThongKeDangKy({}));
        dispatch(setDanhSachXepHangThamKham({}));
        dispatch(setThongKeQuaKenh([]));
        dispatch(setThongKeKhoa([]));
        dispatch(setThongKeBenh([]));
        dispatch(setThongKeTuVan([]));
    }, [dispatch]);

    const onChangeHospital = useCallback((value: string) => {
        if (value === undefined) {
            localStorage.removeItem('hospitalId');
            clearStatistics();
        } else {
            localStorage.setItem('hospitalId', value);
        }
        dispatch(getByIdHospital(Number(value)));
        const selectName = hospital.filter((item: any) => item.id === value)
        setNameSelect(selectName[0]?.name);

    }, [dispatch, hospital, clearStatistics]);

    useEffect(() => {
        if (hospitalId && hospital.length > 0) {
            const selectName = hospital.filter((item: any) => item.id === Number(hospitalId))
            setNameSelect(selectName[0]?.name);
        }
    }, [hospitalId, hospital])

    useLayoutEffect(() => {
        if (users.entities.hospitalId && hospital) {
            const check = JSON.parse(users.entities.hospitalId)
            const result = hospital.filter((item: any) => check.includes(item.id));
            setDataHospital(result)
        }
    }, [users.entities.hospitalId, hospital])

    return (
        <div>
            <div className="flex gap-2 items-center "  >
                <label htmlFor="">{t("home:chon_benh_vien_hoat_dong")} : </label>

                <Select
                    placeholder={t("home:chon_benh_vien")}
                    allowClear
                    onChange={onChangeHospital}
                    className="min-w-[200px]"
                    value={nameSelect || undefined}
                >
                    {dataHospital?.length > 0 && dataHospital.map((item: any) => (
                        <Option key={item.id} value={item.id}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </div>
            {
                hospitalId ? <>
                    <CartRanking />
                    {
                        menu?.[0].ds.TKKenh === true && <CardChannel />
                    }
                    {
                        menu?.[0].ds.TKKhoa === true && <ScienceStatistics />
                    }
                    {
                        menu?.[0].ds.TKBenh === true && <DiseaseStatistics />
                    }
                    {
                        menu?.[0].ds.TKTuvan === true && <Consultant />
                    }
                </> : <NotHospital />
            }


        </div>
    );
};

export default Home;
