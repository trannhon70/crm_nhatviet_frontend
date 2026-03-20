import { Alert, Button, Checkbox, CheckboxProps, Input } from 'antd';
import { FC, Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { rolesAPI } from '../../apis/roles.api';
import BreadcrumbComponent from "../../components/breadcrumbComponent";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchGetById } from '../../features/rolesSlice';
import { useTranslation } from 'react-i18next';

const CreateRight: FC = () => {
    const {t } = useTranslation(['QLHT'])
    const [form, setForm] = useState<any[]>([
        {
            home: false,
            ds: {
                TKTong: false,
                BXHang: false,
                TKKenh: false,
                TKKhoa: false,
                TKBenh: false,
                TKTuvan: false,
            }
            
        },
        {
            QLBN: false,
            ds: {
                DSDKH: false,
                action_DSDKH: {
                    create: false,
                    update: false,
                    delete: false,
                    see: false,
                    viewAllData: false,
                    phone: false ,
                    excel: false,
                    money: false,
                    doctor: false,
                    status: false
                },
                CHTKBN: false,
                LLTVBN: false,
                BCCTDVKH: false,
                BCXHHT: false,
                BCDHTC: false,
                XDLBN: false,
                action_XDLBN:{
                    phone: false
                },
                SSDLTCN: false,
            }
        },
        {
            TKKTC: false,
            ds: {
                CTDLM: false,
                CDDABVM: false,
                action_CDDABVM: {
                    create: false,
                    update: false,
                    delete: false,
                },
                CTDLDT: false,
                CDDABVDT: false,
                action_CDDABVDT: {
                    create: false,
                    update: false,
                    delete: false,
                }
            }
        },
        {
            BCDL:false,
            ds: {
                BCTH: false,
                GT: false,
                TUOI: false,
                LBN: false,
                NTT: false,
                TTNV: false,
                BSLT: false,
                DVKH: false,
                BCKV: false,
            }
        },
        {
            CD:false,
            ds:{
                CDBS: false,
                action_CDBS:{
                    create: false,
                    update: false,
                    delete: false,
                },
                TLBT:false,
                action_TLBT:{
                    create: false,
                    update: false,
                    delete: false,
                },
                CDLDTYT:false,
                action_CDLDTYT:{
                    create: false,
                    update: false,
                    delete: false,
                },
                CDKBV:false,
                action_CDKBV:{
                    create: false,
                    update: false,
                    delete: false,
                },
                CDCCTK:false,
                action_CDCCTK:{
                    create: false,
                    update: false,
                    delete: false,
                }
            }
        },
        {
            TTCT: false,
            ds:{
                SDTTCT: false,
                TDMK: false,
                CDTC: false,
            }
        },
        {
            QLHT: false,
            ds:{
                QLCN: false,
                action_QLCN: {
                    create: false,
                    update: false,
                    delete: false,
                    see: false,
                    close: false,
                },
                QLQ: false,
                action_QLQ: {
                    create: false,
                    update: false,
                    delete: false,
                    
                },
                DSBV: false,
                action_DSBV: {
                    create: false,
                    update: false,
                    delete: false,
                },
                QLTB: false,
                action_QLTB: {
                    create: false,
                    update: false,
                    delete: false,
                    close: false,
                },
            }
        },
        {
            LSTT: false,
            ds:{ 
                NKHD: false,
                action_NKHD: {
                    delete: false,
                    see: false,
                },
                NKLDN: false,
                action_NKLDN: {
                    delete: false,
                }
            }
        }
    ])
    const [name, setName] = useState<string>('')
    const [nameErr, setNameErr] = useState<'' | 'error' | 'warning' | undefined>('');
    const navige = useNavigate()
    let { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const { role } = useSelector((state: RootState) => state.roles);
    
    const dataBreadcrumb = [
        {
            title: t("QLHT:quan_ly_he_thong"),
        },
        {
            type: 'separator',
        },
        {
            href: '/quan-ly-quyen',
            title: t("QLHT:quan_ly_quyen"),
        },
        {
            type: 'separator',
        },
        {
            title: <>{id ? t("QLHT:cap_nhat"): t("QLHT:them_moi")}</>,
        },
    ];

    useEffect(() =>{ 
        if(id){
            dispatch(fetchGetById(Number(id)))
           
        }
    }, [id, dispatch])

    useEffect(() => {
        if(role.menu){
            setName(role.name);
            const menu = JSON.parse(role.menu)
            setForm((prevForm) =>
                prevForm.map((item, index) => {
                    // Thay đổi logic này theo yêu cầu cập nhật của bạn
                    if (menu[index]) {
                        return {
                            ...item,
                            ...menu[index], // Gộp dữ liệu mới từ `menu` vào từng phần tử trong `form`
                        };
                    }
                    return item; // Giữ nguyên nếu không có cập nhật
                })
            );
        }
    }, [role.menu, role.name])

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
        setNameErr('')
    }

    const onclickCreate = async(e: React.FormEvent) => {
        e.preventDefault();
        if(name === '') {
            return (
                setNameErr('error'),
                toast.error(`${t("QLHT:ten_quyen_khong_duoc_bo_trong")}`)
            )
        }
        const body = {
            name: name,
            menu: JSON.stringify(form)
        }
        if(id){
            try {
                const resultUpdate = await rolesAPI.updateRole(Number(id), body)
                if(resultUpdate.data.statusCode === 1){
                    toast.success(`${t("QLHT:cap_nhat_thanh_cong")}`);
                    // navige('/quan-ly-quyen')
                }
            } catch (error) {
                console.log(error);
                
            }

        } else {
            try {
                
                const result = await rolesAPI.create(body)
                if(result.data.statusCode === 1){
                    toast.success(`${t("QLHT:them_moi_thanh_cong")}`);
                    navige('/quan-ly-quyen')
                }
            } catch (error: any) {
                if(error.response.data.message === "Tên quyền đã được đăng ký, vui lòng đăng ký tên khác!"){
                    toast.error("Tên quyền đã được đăng ký, vui lòng đăng ký tên khác!")
                }
            }
        }
    }

    const onChangeHome: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[] ) =>
            {
                const updatedForm = [...prevForm]; 
                updatedForm[0].home = checked;
                updatedForm[0].ds.TKTong = checked;
                updatedForm[0].ds.BXHang = checked;
                updatedForm[0].ds.TKKenh = checked;
                updatedForm[0].ds.TKKhoa = checked;
                updatedForm[0].ds.TKBenh = checked;
                updatedForm[0].ds.TKTuvan = checked;
                return updatedForm; 
            }
        );
    }

    const onChangeTKTong: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[] ) =>
            {
                const updatedForm = [...prevForm]; 
                updatedForm[0].home = true;
                updatedForm[0].ds.TKTong = checked;
                return updatedForm; 
            }
        );
    }

    const onChangeBXHang: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[] ) =>
            {
                const updatedForm = [...prevForm]; 
                updatedForm[0].home = true;
                updatedForm[0].ds.BXHang = checked;
                return updatedForm; 
            }
        );
    }

    const onChangeTKKenh: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[] ) =>
            {
                const updatedForm = [...prevForm]; 
                updatedForm[0].home = true;
                updatedForm[0].ds.TKKenh = checked;
                return updatedForm; 
            }
        );
    }

    const onChangeTKKhoa: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[] ) =>
            {
                const updatedForm = [...prevForm]; 
                updatedForm[0].home = true;
                updatedForm[0].ds.TKKhoa = checked;
                return updatedForm; 
            }
        );
    }

    const onChangeTKBenh: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[] ) =>
            {
                const updatedForm = [...prevForm]; 
                updatedForm[0].home = true;
                updatedForm[0].ds.TKBenh = checked;
                return updatedForm; 
            }
        );
    }
    const onChangeTKTuvan: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[] ) =>
            {
                const updatedForm = [...prevForm]; 
                updatedForm[0].home = true;
                updatedForm[0].ds.TKTuvan = checked;
                return updatedForm; 
            }
        );
    }

    // Quản lý bệnh nhân
    const onChangeQLBN: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = checked;
            updatedForm[1].ds.DSDKH = checked; 
            updatedForm[1].ds.CHTKBN = checked; 
            updatedForm[1].ds.LLTVBN = checked; 
            updatedForm[1].ds.BCCTDVKH = checked; 
            updatedForm[1].ds.BCXHHT = checked; 
            updatedForm[1].ds.BCDHTC = checked; 
            updatedForm[1].ds.XDLBN = checked; 
            updatedForm[1].ds.action_XDLBN = updatedForm[1].ds.action_XDLBN || {};
            updatedForm[1].ds.action_XDLBN.phone = checked;  
            updatedForm[1].ds.SSDLTCN = checked; 
            updatedForm[1].ds.action_DSDKH.create = checked; 
            updatedForm[1].ds.action_DSDKH.update = checked; 
            updatedForm[1].ds.action_DSDKH.delete = checked; 
            updatedForm[1].ds.action_DSDKH.see = checked; 
            updatedForm[1].ds.action_DSDKH.viewAllData = checked; 
            updatedForm[1].ds.action_DSDKH.phone = checked; 
            updatedForm[1].ds.action_DSDKH.excel = checked;
            updatedForm[1].ds.action_DSDKH.money = checked;  
            updatedForm[1].ds.action_DSDKH.doctor = checked;  
            updatedForm[1].ds.action_DSDKH.status = checked;  
            return updatedForm; 
        });
    }

    const onChangeDSDKH: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = checked; 
            updatedForm[1].ds.action_DSDKH.create = checked; 
            updatedForm[1].ds.action_DSDKH.update = checked; 
            updatedForm[1].ds.action_DSDKH.delete = checked; 
            updatedForm[1].ds.action_DSDKH.see = checked; 
            updatedForm[1].ds.action_DSDKH.viewAllData = checked; 
            updatedForm[1].ds.action_DSDKH.phone = checked; 
            updatedForm[1].ds.action_DSDKH.excel = checked;
            updatedForm[1].ds.action_DSDKH.money = checked;  
            updatedForm[1].ds.action_DSDKH.doctor = checked;  
            updatedForm[1].ds.action_DSDKH.status = checked;  
           
            return updatedForm; 
        });

    }

    const onChangeDSDKHCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true; 
            updatedForm[1].ds.action_DSDKH.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSDKHUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true;
            updatedForm[1].ds.action_DSDKH.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSDKHDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true;
            updatedForm[1].ds.action_DSDKH.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSDKHSee: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true;
            updatedForm[1].ds.action_DSDKH.see = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSDKHViewAllData: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true;
            updatedForm[1].ds.action_DSDKH.viewAllData = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSDKHViewPhone: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true;
            updatedForm[1].ds.action_DSDKH.phone = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSDKHExcel: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true;
            updatedForm[1].ds.action_DSDKH.excel = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSDKHMoney: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true;
            updatedForm[1].ds.action_DSDKH.money = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSDKHDoctor: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true;
            updatedForm[1].ds.action_DSDKH.doctor = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSDKHStatus: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.DSDKH = true;
            updatedForm[1].ds.action_DSDKH.status = checked; 
            return updatedForm; 
        });
    }

    const onChangeBCCTDVKH: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.BCCTDVKH = checked; 
            return updatedForm; 
        });
    }

    const onChangeBCXHHT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.BCXHHT = checked; 
            return updatedForm; 
        });
    }

    const onChangeBCDHTC: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.BCDHTC = checked; 
            return updatedForm; 
        });
    }

    const onChangeXDLBN: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.XDLBN = checked; 
            updatedForm[1].ds.action_XDLBN = updatedForm[1].ds.action_XDLBN || {};
            updatedForm[1].ds.action_XDLBN.phone = checked;
            return updatedForm; 
        });
    }

    const onChangeXDLBN_phone: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[1].QLBN = true;
            updatedForm[1].ds.XDLBN = true; 
            updatedForm[1].ds.action_XDLBN = updatedForm[1].ds.action_XDLBN || {}; // Đảm bảo `action_XDLBN` tồn tại
            updatedForm[1].ds.action_XDLBN.phone = checked;
        
            return updatedForm; 
        });
    }

    //báo cáo dữ liệu
    const onChangeBCDL: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = checked; 
            updatedForm[3].ds.BCTH = checked; 
            updatedForm[3].ds.GT = checked; 
            updatedForm[3].ds.TUOI = checked; 
            updatedForm[3].ds.LBN = checked; 
            updatedForm[3].ds.NTT = checked; 
            updatedForm[3].ds.TTNV = checked; 
            updatedForm[3].ds.BSLT = checked; 
            updatedForm[3].ds.DVKH = checked; 
            updatedForm[3].ds.BCKV = checked; 
            return updatedForm; 
        });
    }

    const onChangeBCTH: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.BCTH = checked; 
            return updatedForm; 
        });
    }

    const onChangeGT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.GT = checked; 
            return updatedForm; 
        });
    }

    const onChangeTUOI: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.TUOI = checked; 
            return updatedForm; 
        });
    }

    const onChangeLBN: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.LBN = checked; 
            return updatedForm; 
        });
    }

    const onChangeNTT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.NTT = checked; 
            return updatedForm; 
        });
    }

    const onChangeTTNV: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.TTNV = checked; 
            return updatedForm; 
        });
    }

    const onChangeBSLT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.BSLT = checked; 
            return updatedForm; 
        });
    }

    const onChangeDVKH: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.DVKH = checked; 
            return updatedForm; 
        });
    }

     const onChangeBCKV: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[3].BCDL = true; 
            updatedForm[3].ds.BCKV = checked; 
            return updatedForm; 
        });
    }

    //cài đặt

    const onChangeCD: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = checked; 
            updatedForm[4].ds.CDBS = checked; 
            updatedForm[4].ds.action_CDBS.create = checked; 
            updatedForm[4].ds.action_CDBS.update = checked; 
            updatedForm[4].ds.action_CDBS.delete = checked; 

            updatedForm[4].ds.TLBT = checked; 
            updatedForm[4].ds.action_TLBT.create = checked; 
            updatedForm[4].ds.action_TLBT.update = checked; 
            updatedForm[4].ds.action_TLBT.delete = checked;

            updatedForm[4].ds.CDLDTYT = checked; 
            updatedForm[4].ds.action_CDLDTYT.create = checked; 
            updatedForm[4].ds.action_CDLDTYT.update = checked; 
            updatedForm[4].ds.action_CDLDTYT.delete = checked;

            updatedForm[4].ds.CDKBV = checked; 
            updatedForm[4].ds.action_CDKBV.create = checked; 
            updatedForm[4].ds.action_CDKBV.update = checked; 
            updatedForm[4].ds.action_CDKBV.delete = checked;

            updatedForm[4].ds.CDCCTK = checked; 
            updatedForm[4].ds.action_CDCCTK.create = checked; 
            updatedForm[4].ds.action_CDCCTK.update = checked; 
            updatedForm[4].ds.action_CDCCTK.delete = checked;
            return updatedForm; 
        });
    }

    const onChangeCDBS: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDBS = checked; 
            updatedForm[4].ds.action_CDBS.create = checked; 
            updatedForm[4].ds.action_CDBS.update = checked; 
            updatedForm[4].ds.action_CDBS.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDBSCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDBS = true; 
            updatedForm[4].ds.action_CDBS.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDBSUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDBS = true; 
            updatedForm[4].ds.action_CDBS.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDBSDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDBS = true; 
            updatedForm[4].ds.action_CDBS.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeTLBT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.TLBT = checked; 
            updatedForm[4].ds.action_TLBT.create = checked; 
            updatedForm[4].ds.action_TLBT.update = checked; 
            updatedForm[4].ds.action_TLBT.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeTLBTCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.TLBT = true; 
            updatedForm[4].ds.action_TLBT.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeTLBTUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.TLBT = true; 
            updatedForm[4].ds.action_TLBT.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeTLBTDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.TLBT = true; 
            updatedForm[4].ds.action_TLBT.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDKBV: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDKBV = checked; 
            updatedForm[4].ds.action_CDKBV.create = checked; 
            updatedForm[4].ds.action_CDKBV.update = checked; 
            updatedForm[4].ds.action_CDKBV.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDKBVCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDKBV = true; 
            updatedForm[4].ds.action_CDKBV.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDKBVUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDKBV = true; 
            updatedForm[4].ds.action_CDKBV.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDKBVDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDKBV = true; 
            updatedForm[4].ds.action_CDKBV.delete = checked; 
            return updatedForm; 
        });
    }

    //

    const onChangeCDCCTK: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDCCTK = checked; 
            updatedForm[4].ds.action_CDCCTK.create = checked; 
            updatedForm[4].ds.action_CDCCTK.update = checked; 
            updatedForm[4].ds.action_CDCCTK.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDCCTKCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDCCTK = true; 
            updatedForm[4].ds.action_CDCCTK.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDCCTKUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDCCTK = true; 
            updatedForm[4].ds.action_CDCCTK.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDCCTKDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[4].CD = true; 
            updatedForm[4].ds.CDCCTK = true; 
            updatedForm[4].ds.action_CDCCTK.delete = checked; 
            return updatedForm; 
        });
    }

    //thông tin cá nhân

    const onChangeTTCT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[5].TTCT = checked; 
            updatedForm[5].ds.SDTTCT = checked; 
            updatedForm[5].ds.TDMK = checked; 
            updatedForm[5].ds.CDTC = checked; 
            return updatedForm; 
        });
    }

    const onChangeSDTTCT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[5].TTCT = true; 
            updatedForm[5].ds.SDTTCT = checked; 
            return updatedForm; 
        });
    }

    const onChangeTDMK: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[5].TTCT = true; 
            updatedForm[5].ds.TDMK = checked; 
            return updatedForm; 
        });
    }

    const onChangeCDTC: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[5].TTCT = true; 
            updatedForm[5].ds.CDTC = checked; 
            return updatedForm; 
        });
    }

    //Quản lý hệ thống

    const onChangeQLHT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = checked; 
            updatedForm[6].ds.QLCN = checked; 
            updatedForm[6].ds.action_QLCN.create = checked; 
            updatedForm[6].ds.action_QLCN.update = checked; 
            updatedForm[6].ds.action_QLCN.delete = checked; 
            updatedForm[6].ds.action_QLCN.see = checked; 
            updatedForm[6].ds.action_QLCN.close = checked; 

            updatedForm[6].ds.QLQ = checked; 
            updatedForm[6].ds.action_QLQ.create = checked; 
            updatedForm[6].ds.action_QLQ.update = checked; 
            updatedForm[6].ds.action_QLQ.delete = checked;

            updatedForm[6].ds.DSBV = checked; 
            updatedForm[6].ds.action_DSBV.create = checked; 
            updatedForm[6].ds.action_DSBV.update = checked; 
            updatedForm[6].ds.action_DSBV.delete = checked;

            updatedForm[6].ds.QLTB = checked; 
            updatedForm[6].ds.action_QLTB.create = checked; 
            updatedForm[6].ds.action_QLTB.update = checked; 
            updatedForm[6].ds.action_QLTB.delete = checked;
            updatedForm[6].ds.action_QLTB.close = checked;

            
            return updatedForm; 
        });
    }

    const onChangeQLCN: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLCN = checked; 
            updatedForm[6].ds.action_QLCN.create = checked; 
            updatedForm[6].ds.action_QLCN.update = checked; 
            updatedForm[6].ds.action_QLCN.delete = checked; 
            updatedForm[6].ds.action_QLCN.see = checked; 
            updatedForm[6].ds.action_QLCN.close = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLCNCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLCN = true; 
            updatedForm[6].ds.action_QLCN.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLCNUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLCN = true; 
            updatedForm[6].ds.action_QLCN.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLCNDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLCN = true; 
            updatedForm[6].ds.action_QLCN.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLCNSee: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLCN = true; 
            updatedForm[6].ds.action_QLCN.see = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLCNClose: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLCN = true; 
            updatedForm[6].ds.action_QLCN.close = checked; 
            return updatedForm; 
        });
    }

    //
    const onChangeQLQ: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLQ = checked; 
            updatedForm[6].ds.action_QLQ.create = checked; 
            updatedForm[6].ds.action_QLQ.update = checked; 
            updatedForm[6].ds.action_QLQ.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLQCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLQ = true; 
            updatedForm[6].ds.action_QLQ.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLQUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLQ = true; 
            updatedForm[6].ds.action_QLQ.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLQDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLQ = true; 
            updatedForm[6].ds.action_QLQ.delete = checked; 
            return updatedForm; 
        });
    }

    //

    const onChangeDSBV: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.DSBV = checked; 
            updatedForm[6].ds.action_DSBV.create = checked; 
            updatedForm[6].ds.action_DSBV.update = checked; 
            updatedForm[6].ds.action_DSBV.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSBVCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.DSBV = true; 
            updatedForm[6].ds.action_DSBV.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSBVUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.DSBV = true; 
            updatedForm[6].ds.action_DSBV.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeDSBVDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.DSBV = true; 
            updatedForm[6].ds.action_DSBV.delete = checked; 
            return updatedForm; 
        });
    }

    //

    const onChangeQLTB: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLTB = checked; 
            updatedForm[6].ds.action_QLTB.create = checked; 
            updatedForm[6].ds.action_QLTB.update = checked; 
            updatedForm[6].ds.action_QLTB.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLTBCreate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLTB = true; 
            updatedForm[6].ds.action_QLTB.create = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLTBUpdate: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLTB = true; 
            updatedForm[6].ds.action_QLTB.update = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLTBDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLTB = true; 
            updatedForm[6].ds.action_QLTB.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeQLTBClose: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[6].QLHT = true; 
            updatedForm[6].ds.QLTB = true; 
            updatedForm[6].ds.action_QLTB.close = checked; 
            return updatedForm; 
        });
    }

    // lịch sử thao tác
    const onChangeLSTT: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[7].LSTT = checked; 
            updatedForm[7].ds.NKHD = checked; 
            updatedForm[7].ds.action_NKHD.delete = checked; 
            updatedForm[7].ds.action_NKHD.see = checked; 
            
            updatedForm[7].ds.NKLDN = checked; 
            updatedForm[7].ds.action_NKLDN.delete = checked; 
            
            return updatedForm; 
        });
    }

    const onChangeNKHD: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[7].LSTT = true; 
            updatedForm[7].ds.NKHD = checked; 
            updatedForm[7].ds.action_NKHD.delete = checked; 
            updatedForm[7].ds.action_NKHD.see = checked; 
            return updatedForm; 
        });
    }

    const onChangeNKHDDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[7].LSTT = true; 
            updatedForm[7].ds.NKHD = true; 
            updatedForm[7].ds.action_NKHD.delete = checked; 
            return updatedForm; 
        });
    }

    const onChangeNKHDSee: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[7].LSTT = true; 
            updatedForm[7].ds.NKHD = true; 
            updatedForm[7].ds.action_NKHD.see = checked; 
            return updatedForm; 
        });
    }

    //
    const onChangeNKLDN: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[7].LSTT = true; 
            updatedForm[7].ds.NKLDN = checked; 
            updatedForm[7].ds.action_NKLDN.delete = checked; 
            updatedForm[7].ds.action_NKLDN.see = checked; 
            return updatedForm; 
        });
    }

    const onChangeNKLDNDelete: CheckboxProps['onChange'] = (e) => {
        const checked = e.target.checked; 
        setForm((prevForm: any[]) => {
            const updatedForm = [...prevForm]; 
            updatedForm[7].LSTT = true; 
            updatedForm[7].ds.NKLDN = true; 
            updatedForm[7].ds.action_NKLDN.delete = checked; 
            return updatedForm; 
        });
    }

    const onClickSelectAll = () => {
        setForm([
            {
                home: true,
                ds: {
                    TKTong: true,
                    BXHang: true,
                    TKKenh: true,
                    TKKhoa: true,
                    TKBenh: true,
                    TKTuvan: true,
                }
            },
            {
                QLBN: true,
                ds: {
                    DSDKH: true,
                    action_DSDKH: {
                        create: true,
                        update: true,
                        delete: true,
                        see: true,
                        viewAllData: true,
                        phone: true ,
                        excel: true,
                        money: true,
                        doctor: true,
                        status: true
                    },
                    CHTKBN: true,
                    LLTVBN: true,
                    BCCTDVKH: true,
                    BCXHHT: true,
                    BCDHTC: true,
                    XDLBN: true,
                    action_XDLBN:{
                        phone: true
                    },
                    SSDLTCN: true,
                   
                }
            },
            {
                TKKTC: true,
                ds: {
                    CTDLM: true,
                    CDDABVM: true,
                    action_CDDABVM: {
                        create: true,
                        update: true,
                        delete: true,
                    },
                    CTDLDT: true,
                    CDDABVDT: true,
                    action_CDDABVDT: {
                        create: true,
                        update: true,
                        delete: true,
                    }
                }
            },
            {
                BCDL:true,
                ds: {
                    BCTH: true,
                    GT: true,
                    TUOI: true,
                    LBN: true,
                    NTT: true,
                    TTNV: true,
                    BSLT: true,
                    DVKH: true,
                    BCKV: true,
                }
            },
            {
                CD:true,
                ds:{
                    CDBS: true,
                    action_CDBS:{
                        create: true,
                        update: true,
                        delete: true,
                    },
                    TLBT:true,
                    action_TLBT:{
                        create: true,
                        update: true,
                        delete: true,
                    },
                    CDLDTYT:true,
                    action_CDLDTYT:{
                        create: true,
                        update: true,
                        delete: true,
                    },
                    CDKBV:true,
                    action_CDKBV:{
                        create: true,
                        update: true,
                        delete: true,
                    },
                    CDCCTK:true,
                    action_CDCCTK:{
                        create: true,
                        update: true,
                        delete: true,
                    }
                }
            },
            {
                TTCT: true,
                ds:{
                    SDTTCT: true,
                    TDMK: true,
                    CDTC: true,
                }
            },
            {
                QLHT: true,
                ds:{
                    QLCN: true,
                    action_QLCN: {
                        create: true,
                        update: true,
                        delete: true,
                        see: true,
                        close: true,
                    },
                    QLQ: true,
                    action_QLQ: {
                        create: true,
                        update: true,
                        delete: true,
                        
                    },
                    DSBV: true,
                    action_DSBV: {
                        create: true,
                        update: true,
                        delete: true,
                    },
                    QLTB: true,
                    action_QLTB: {
                        create: true,
                        update: true,
                        delete: true,
                        close: true,
                    },
                }
            },
            {
                LSTT: true,
                ds:{ 
                    NKHD: true,
                    action_NKHD: {
                        delete: true,
                        see: true,
                    },
                    NKLDN: true,
                    action_NKLDN: {
                        delete: true,
                    }
                }
            }
        ])
    }

    const onClickUnselect = () => {
        setForm([
            {
                home: false,
                ds: {
                    TKTong: false,
                    BXHang: false,
                    TKKenh: false,
                    TKKhoa: false,
                    TKBenh: false,
                    TKTuvan: false,
                }
            },
            {
                QLBN: false,
                ds: {
                    DSDKH: false,
                    action_DSDKH: {
                        create: false,
                        update: false,
                        delete: false,
                        see: false,
                        viewAllData: false,
                        phone: false ,
                        excel: false,
                        money: false,
                        doctor: false,
                        status: false
                    },
                    CHTKBN: false,
                    LLTVBN: false,
                    BCCTDVKH: false,
                    BCXHHT: false,
                    BCDHTC: false,
                    XDLBN: false,
                    action_XDLBN:{
                        phone: false
                    },
                    SSDLTCN: false,
                }
            },
            {
                TKKTC: false,
                ds: {
                    CTDLM: false,
                    CDDABVM: false,
                    action_CDDABVM: {
                        create: false,
                        update: false,
                        delete: false,
                    },
                    CTDLDT: false,
                    CDDABVDT: false,
                    action_CDDABVDT: {
                        create: false,
                        update: false,
                        delete: false,
                    }
                }
            },
            {
                BCDL:false,
                ds: {
                    BCTH: false,
                    GT: false,
                    TUOI: false,
                    LBN: false,
                    NTT: false,
                    TTNV: false,
                    BSLT: false,
                    DVKH: false,
                    BCKV: false,
                }
            },
            {
                CD:false,
                ds:{
                    CDBS: false,
                    action_CDBS:{
                        create: false,
                        update: false,
                        delete: false,
                    },
                    TLBT:false,
                    action_TLBT:{
                        create: false,
                        update: false,
                        delete: false,
                    },
                    CDLDTYT:false,
                    action_CDLDTYT:{
                        create: false,
                        update: false,
                        delete: false,
                    },
                    CDKBV:false,
                    action_CDKBV:{
                        create: false,
                        update: false,
                        delete: false,
                    },
                    CDCCTK:false,
                    action_CDCCTK:{
                        create: false,
                        update: false,
                        delete: false,
                    }
                }
            },
            {
                TTCT: false,
                ds:{
                    SDTTCT: false,
                    TDMK: false,
                    CDTC: false,
                }
            },
            {
                QLHT: false,
                ds:{
                    QLCN: false,
                    action_QLCN: {
                        create: false,
                        update: false,
                        delete: false,
                        see: false,
                        close: false,
                    },
                    QLQ: false,
                    action_QLQ: {
                        create: false,
                        update: false,
                        delete: false,
                        
                    },
                    DSBV: false,
                    action_DSBV: {
                        create: false,
                        update: false,
                        delete: false,
                    },
                    QLTB: false,
                    action_QLTB: {
                        create: false,
                        update: false,
                        delete: false,
                        close: false,
                    },
                }
            },
            {
                LSTT: false,
                ds:{ 
                    NKHD: false,
                    action_NKHD: {
                        delete: false,
                        see: false,
                    },
                    NKLDN: false,
                    action_NKLDN: {
                        delete: false,
                    }
                }
            }
        ])
    }

    const onclickComeBack = () => {
        setForm(JSON.parse(role.menu))
    }

    console.log(form);
    
    return <Fragment>
        <BreadcrumbComponent items={dataBreadcrumb} />
        <Alert className="mt-2" message={
            <div>
                <div>{t("QLHT:goi_y")}:</div>
                <ul style={{ listStyle: 'inside' }} >
                    <li>{t("QLHT:meo_phan_quyen")}</li>
                    <li>{t("QLHT:meo_phan_quyen_1")}</li>
                </ul>
            </div>
        } type="warning" />
        <table style={{width:'100%'}} className="border-collapse border border-slate-400 mt-2 tableSetting ">
            <thead>
                <tr>
                    <th colSpan={4} className="border border-slate-300 text-lg ">{t("QLHT:cai_dat_quyen")}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colSpan={1} className="text-right">{t("QLHT:ten_quyen")} :</td>
                    <td colSpan={3} className="">
                        <Input status={nameErr} value={name} onChange={handleChangeName} className="w-[300px]" placeholder={t("QLHT:nhap_ten_quyen")} />
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]" >
                    <td colSpan={1} rowSpan={50} className="border border-slate-300 text-right">{t("QLHT:chi_tiet_quyen")}:</td>
                </tr>
                <tr>
                    <td  colSpan={4} className="border border-slate-300">
                        <Button onClick={onClickSelectAll} color="primary" variant="solid">{t("QLHT:chon_tat_cả")}  </Button>
                        <Button onClick={onClickUnselect} className="ml-2" color="danger" variant="outlined" >{t("QLHT:bo_chon")}  </Button>
                        {id ? <Button onClick={onclickComeBack} className="ml-2" color="primary" variant="outlined">{t("QLHT:tro_lai")} </Button> :''}
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td  rowSpan={2} className="border border-slate-300 ..."> <Checkbox onChange={onChangeHome} checked={form[0].home} >{t("QLHT:trang_dau")}</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td  colSpan={3} className="border border-slate-300 ..."> 
                        <Checkbox onChange={onChangeTKTong} checked={form[0]?.ds?.TKTong} >{t("QLHT:thong_ke_tong")}</Checkbox>
                        <Checkbox onChange={onChangeBXHang} checked={form[0]?.ds?.BXHang} >{t("QLHT:bang_xep_hang")}</Checkbox>
                        <Checkbox onChange={onChangeTKKenh} checked={form[0]?.ds?.TKKenh} >{t("QLHT:thong_ke_kenh")}</Checkbox>
                        <Checkbox onChange={onChangeTKKhoa} checked={form[0]?.ds?.TKKhoa} >{t("QLHT:thong_ke_khoa")}</Checkbox>
                        <Checkbox onChange={onChangeTKBenh} checked={form[0]?.ds?.TKBenh} >{t("QLHT:thong_ke_benh")}</Checkbox>
                        <Checkbox onChange={onChangeTKTuvan} checked={form[0]?.ds?.TKTuvan} >{t("QLHT:thong_ke_tu_van")}</Checkbox>
                    </td>
                </tr>
                <tr >
                    <td rowSpan={6}  className="border border-slate-300 ...">
                        <Checkbox onChange={onChangeQLBN} checked={form[1].QLBN} >{t("QLHT:quan_ly_benh_nhan")}</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeDSDKH} checked={form[1].ds.DSDKH} >{t("QLHT:danh_sach_dang_ky_hen")}</Checkbox>
                    </td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeDSDKHCreate} checked={form[1].ds.action_DSDKH.create} >{t("QLHT:them_moi")}</Checkbox>
                        <Checkbox onChange={onChangeDSDKHUpdate} checked={form[1].ds.action_DSDKH.update} >{t("QLHT:cap_nhat")}</Checkbox>
                        <Checkbox onChange={onChangeDSDKHDelete} checked={form[1].ds.action_DSDKH.delete}>{t("QLHT:xoa")}</Checkbox>
                        <Checkbox onChange={onChangeDSDKHSee} checked={form[1].ds.action_DSDKH.see}>{t("QLHT:xem_lich_su")}</Checkbox>
                        <Checkbox onChange={onChangeDSDKHViewAllData} checked={form[1].ds.action_DSDKH.viewAllData}>{t("QLHT:xem_tat_ca_du_lieu")}</Checkbox>
                        <Checkbox onChange={onChangeDSDKHViewPhone} checked={form[1].ds.action_DSDKH.phone}>{t("QLHT:xem_SDT")}</Checkbox>
                        <Checkbox onChange={onChangeDSDKHExcel} checked={form[1].ds.action_DSDKH.excel}>{t("QLHT:nhap_excel")}</Checkbox>
                        <Checkbox onChange={onChangeDSDKHMoney} checked={form[1].ds.action_DSDKH.money}>Chi phí</Checkbox>
                        <Checkbox onChange={onChangeDSDKHDoctor} checked={form[1].ds.action_DSDKH.doctor}>Cập nhật bác sĩ</Checkbox>
                        <Checkbox onChange={onChangeDSDKHStatus} checked={form[1].ds.action_DSDKH.status}>Cập nhật trạng thái</Checkbox>
                    </td>
                </tr>
               
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeBCCTDVKH} checked={form[1].ds.BCCTDVKH} >{t("QLHT:bao_cao_chi_tiet_dich_vu_khach_hang")}</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeBCXHHT} checked={form[1].ds.BCXHHT}>{t("QLHT:bao_cao_xu_huong_hang_thang")}</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeBCDHTC} checked={form[1].ds.BCDHTC}>{t("QLHT:bao_cao_do_hoa_tuy_chinh")}</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td  className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeXDLBN} checked={form[1].ds.XDLBN}>{t("QLHT:xuat_du_lieu_benh_nhan")}</Checkbox>
                    </td>
                    <td  className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeXDLBN_phone} checked={form[1].ds?.action_XDLBN?.phone}>xem số điện thoại</Checkbox>
                    </td>
                </tr>
               

                <tr>
                    <td rowSpan={10}  className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeBCDL} checked={form[3].BCDL} >{t("QLHT:bao_cao_du_lieu")}</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeBCTH} checked={form[3].ds.BCTH}>{t("QLHT:bao_cao_tong_hop")}</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeGT} checked={form[3].ds.GT}>{t("QLHT:gioi_tinh")}</Checkbox>
                    </td>
                    
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeTUOI} checked={form[3].ds.TUOI}>{t("QLHT:tuoi")}</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeLBN} checked={form[3].ds.LBN}>{t("QLHT:loại_benh_nhan")}</Checkbox></td>
                    
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeNTT} checked={form[3].ds.NTT}>{t("QLHT:nguon_truyen_thong")}</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeTTNV} checked={form[3].ds.TTNV}>{t("QLHT:tinh_trang_nhap_vien")}</Checkbox></td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeBSLT} checked={form[3].ds.BSLT}>{t("QLHT:bac_si")}</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeDVKH} checked={form[3].ds.DVKH}>{t("QLHT:dich_vu_khach_hang")}</Checkbox></td>
                </tr>
                  <tr>
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeBCKV} checked={form[3].ds.BCKV}>Báo cáo khu vực</Checkbox></td>
                </tr>


                <tr className="bg-[#f2f2f2]">
                    <td rowSpan={5}  className="border border-slate-300 ..." ><Checkbox onChange={onChangeCD} checked={form[4].CD}>{t("QLHT:cai_dat")}</Checkbox></td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeCDBS} checked={form[4].ds.CDBS}>{t("QLHT:cai_dat_bac_si")}</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeCDBSCreate} checked={form[4].ds.action_CDBS.create} >{t("QLHT:them_moi")}</Checkbox>
                        <Checkbox onChange={onChangeCDBSUpdate} checked={form[4].ds.action_CDBS.update}>{t("QLHT:cap_nhat")}</Checkbox>
                        <Checkbox onChange={onChangeCDBSDelete} checked={form[4].ds.action_CDBS.delete}>{t("QLHT:xoa")}</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeTLBT} checked={form[4].ds.TLBT}>{t("QLHT:thiet_lap_benh_tat")}</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeTLBTCreate} checked={form[4].ds.action_TLBT.create} >{t("QLHT:them_moi")}</Checkbox>
                        <Checkbox onChange={onChangeTLBTUpdate} checked={form[4].ds.action_TLBT.update}>{t("QLHT:cap_nhat")}</Checkbox>
                        <Checkbox onChange={onChangeTLBTDelete} checked={form[4].ds.action_TLBT.delete}>{t("QLHT:xoa")}</Checkbox>
                    </td>
                </tr>
               
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeCDKBV} checked={form[4].ds.CDKBV}>{t("QLHT:cai_dat_khoa_benh_vien")}</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                    <Checkbox onChange={onChangeCDKBVCreate} checked={form[4].ds.action_CDKBV.create} >{t("QLHT:them_moi")}</Checkbox>
                        <Checkbox onChange={onChangeCDKBVUpdate} checked={form[4].ds.action_CDKBV.update}>{t("QLHT:cap_nhat")}</Checkbox>
                        <Checkbox onChange={onChangeCDKBVDelete} checked={form[4].ds.action_CDKBV.delete}>{t("QLHT:xoa")}</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeCDCCTK} checked={form[4].ds.CDCCTK}>{t("QLHT:cai_dat_cong_cu_tim_kiem")}</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                    <Checkbox onChange={onChangeCDCCTKCreate} checked={form[4].ds.action_CDCCTK.create} >{t("QLHT:them_moi")}</Checkbox>
                        <Checkbox onChange={onChangeCDCCTKUpdate} checked={form[4].ds.action_CDCCTK.update}>{t("QLHT:cap_nhat")}</Checkbox>
                        <Checkbox onChange={onChangeCDCCTKDelete} checked={form[4].ds.action_CDCCTK.delete}>{t("QLHT:xoa")}</Checkbox>
                    </td>
                </tr>


                <tr >
                    <td rowSpan={4}  className="border border-slate-300 ..." ><Checkbox onChange={onChangeTTCT} checked={form[5].TTCT}>{t("QLHT:thong_tin_cua_toi")}</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeSDTTCT} checked={form[5].ds.SDTTCT}>{t("QLHT:sua_doi_thong_tin_cua_toi")}</Checkbox></td>
                </tr>
                <tr>
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeTDMK} checked={form[5].ds.TDMK}>{t("QLHT:thay_doi_mat_khau")}</Checkbox></td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td colSpan={2} className="border border-slate-300 ..." ><Checkbox onChange={onChangeCDTC} checked={form[5].ds.CDTC}>{t("QLHT:cai_dat_tuy_chon")}</Checkbox></td>
                </tr>


                <tr className="bg-[#f2f2f2]">
                    <td rowSpan={5}  className="border border-slate-300 ..." ><Checkbox onChange={onChangeQLHT} checked={form[6].QLHT}>{t("QLHT:quan_ly_he_thong")}</Checkbox></td>
                </tr>
                <tr>
                    <td  className="border border-slate-300 ..." ><Checkbox  onChange={onChangeQLCN} checked={form[6].ds.QLCN}>{t("QLHT:quan_ly_con_nguoi")}</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeQLCNCreate} checked={form[6].ds.action_QLCN.create}>{t("QLHT:them_moi")}</Checkbox>
                        <Checkbox onChange={onChangeQLCNUpdate} checked={form[6].ds.action_QLCN.update}>{t("QLHT:cap_nhat")}</Checkbox>
                        <Checkbox onChange={onChangeQLCNDelete} checked={form[6].ds.action_QLCN.delete}>{t("QLHT:xoa")}</Checkbox>
                        <Checkbox onChange={onChangeQLCNSee} checked={form[6].ds.action_QLCN.see}>{t("QLHT:xem")}</Checkbox>
                        <Checkbox onChange={onChangeQLCNClose} checked={form[6].ds.action_QLCN.close}>{t("QLHT:dong")}</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeQLQ} checked={form[6].ds.QLQ}>{t("QLHT:quan_ly_quyen")}</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeQLQCreate} checked={form[6].ds.action_QLQ.create}>{t("QLHT:them_moi")}</Checkbox>
                        <Checkbox onChange={onChangeQLQUpdate} checked={form[6].ds.action_QLQ.update}>{t("QLHT:cap_nhat")}</Checkbox>
                        <Checkbox onChange={onChangeQLQDelete} checked={form[6].ds.action_QLQ.delete}>{t("QLHT:xoa")}</Checkbox>
                    </td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeDSBV} checked={form[6].ds.DSBV}>{t("QLHT:danh_sach_benh_vien")}</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeDSBVCreate} checked={form[6].ds.action_DSBV.create}>{t("QLHT:them_moi")}</Checkbox>
                        <Checkbox onChange={onChangeDSBVUpdate} checked={form[6].ds.action_DSBV.update}>{t("QLHT:cap_nhat")}</Checkbox>
                        <Checkbox onChange={onChangeDSBVDelete} checked={form[6].ds.action_DSBV.delete}>{t("QLHT:xoa")}</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeQLTB} checked={form[6].ds.QLTB}>{t("QLHT:quan_ly_thong_bao")}</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeQLTBCreate} checked={form[6].ds.action_QLTB.create}>{t("QLHT:them_moi")}</Checkbox>
                        <Checkbox onChange={onChangeQLTBUpdate} checked={form[6].ds.action_QLTB.update}>{t("QLHT:cap_nhat")}</Checkbox>
                        <Checkbox onChange={onChangeQLTBDelete} checked={form[6].ds.action_QLTB.delete}>{t("QLHT:xoa")}</Checkbox>
                        <Checkbox onChange={onChangeQLTBClose} checked={form[6].ds.action_QLTB.close}>{t("QLHT:dong")}</Checkbox>
                    </td>
                </tr>

                <tr>
                    <td rowSpan={3}  className="border border-slate-300 ..." ><Checkbox onChange={onChangeLSTT} checked={form[7].LSTT} >{t("QLHT:lich_su_thao_tac")}</Checkbox></td>
                </tr>
                <tr>
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeNKHD} checked={form[7].ds.NKHD}>{t("QLHT:nhat_ky_hoat_dong")}</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeNKHDDelete} checked={form[7].ds.action_NKHD.delete}>{t("QLHT:xoa")}</Checkbox>
                        <Checkbox onChange={onChangeNKHDSee} checked={form[7].ds.action_NKHD.see}>{t("QLHT:xem")}</Checkbox>
                    </td>
                </tr>
                <tr className="bg-[#f2f2f2]">
                    <td className="border border-slate-300 ..." ><Checkbox onChange={onChangeNKLDN} checked={form[7].ds.NKLDN}>{t("QLHT:nhat_ky_loi_dang_nhap")}</Checkbox></td>
                    <td className="border border-slate-300 ..." >
                        <Checkbox onChange={onChangeNKLDNDelete} checked={form[7].ds.action_NKLDN.delete}>{t("QLHT:xoa")}</Checkbox>
                    </td>
                </tr>
            </tbody>
            
        </table>
        <div className="flex items-center justify-center mt-2 " >
            <Button onClick={onclickCreate} color="primary" variant="solid" >
              {id ? t("QLHT:cap_nhat") : t("QLHT:them_moi")}  
            </Button>
        </div>
    </Fragment>
}

export default CreateRight