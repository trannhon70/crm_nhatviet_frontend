import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_VN from "../locales/vn/home.json";
// import HOME_EN from "../locales/en/home.json";
import HOME_TQ from "../locales/tq/home.json";

import PROFILE_TQ from "../locales/tq/profile.json";
import PROFILE_VN from "../locales/vn/profile.json";

import DSDangKyHen_TQ from "../locales/tq/DSDangKyHen.json";
import DSDangKyHen_VN from "../locales/vn/DSDangKyHen.json";

import BCCTDVKH_TQ from "../locales/tq/BCCTDVKH.json";
import BCCTDVKH_VN from "../locales/vn/BCCTDVKH.json";

import BaoCaoDuLieu_TQ from "../locales/tq/bacCaoDuLieu.json";
import BaoCaoDuLieu_VN from "../locales/vn/bacCaoDuLieu.json";

import SETTING_TQ from "../locales/tq/setting.json";
import SETTING_VN from "../locales/vn/setting.json";

import QLHT_TQ from "../locales/tq/QLHT.json";
import QLHT_VN from "../locales/vn/QLHT.json";

import history_TQ from "../locales/tq/history.json";
import history_VN from "../locales/vn/history.json";


export const resources = {
  // en: {
  //   home: HOME_EN,
  //   product:''
  // },
  vi: {
    home: HOME_VN,
    product:'',
    profile: PROFILE_VN,
    DSDangKyHen: DSDangKyHen_VN,
    BCCTDVKH: BCCTDVKH_VN,
    baoCaoDuLieu: BaoCaoDuLieu_VN,
    setting: SETTING_VN,
    QLHT: QLHT_VN,
    history:history_VN
  },
  tq: {
    home: HOME_TQ,
    product:'',
    profile: PROFILE_TQ,
    DSDangKyHen: DSDangKyHen_TQ,
    BCCTDVKH: BCCTDVKH_TQ,
    baoCaoDuLieu: BaoCaoDuLieu_TQ,
    setting: SETTING_TQ,
    QLHT: QLHT_TQ,
    history:history_TQ
  }
};

export const defaultNS = 'home'
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi",
    ns:['home', 'product', 'profile', 'DSDangKyHen', 'BCCTDVKH', 'baoCaoDuLieu', 'setting', 'history'],
    fallbackLng: 'vi' , 
    defaultNS,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;