import dayjs from "dayjs";
import { useTranslation } from "react-i18next";



export const Languege = () => {
  const { t } = useTranslation(['profile']);
  return [
      { id: '1', value: 'vi', label: t("profile:tieng_viet") },
      { id: '2', value: 'tq', label: t("profile:tieng_trung") },
  ];
};
export const GENDER = [
    {id: '1', value:'NAM', label: 'NAM'},
    {id: '2', value:'NỮ', label: 'NỮ'},
    {id: '3', value:'KHÔNG XÁC ĐỊNH', label: 'KHÔNG XÁC ĐỊNH'},
]

export const STATUS = () => {
  
  return [
    {id: '1', value:'CHỜ ĐỢI', label: 'CHỜ ĐỢI'},
    {id: '4', value:'KHÔNG XÁC ĐỊNH', label: 'KHÔNG XÁC ĐỊNH'},
    {id: '2', value:'ĐÃ ĐẾN', label: 'ĐÃ ĐẾN'},
    {id: '3', value:'CHƯA ĐẾN', label: 'CHƯA ĐẾN'},
    
]
}


export const TIME = [
  { id: 1, value: "week", label: "Tuần" },
  { id: 2, value: "month", label: "Tháng" },
  { id: 3, value: "quarter", label: "Quí" },
  { id: 4, value: "year", label: "Năm" },
]

export function telephoneCheck(phone: any) {
    const isphone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/.test(phone);
   return isphone;
  }

  export const getDaysInQuarter = (year: number, month: number) => {
    let startOfQuarter, endOfQuarter;
  
    // Xác định Quý của tháng
    if (month >= 0 && month <= 2) { // Quý 1
      startOfQuarter = dayjs(`${year}-01-01`);
      endOfQuarter = dayjs(`${year}-03-31`);
    } else if (month >= 3 && month <= 5) { // Quý 2
      startOfQuarter = dayjs(`${year}-04-01`);
      endOfQuarter = dayjs(`${year}-06-30`);
    } else if (month >= 6 && month <= 8) { // Quý 3
      startOfQuarter = dayjs(`${year}-07-01`);
      endOfQuarter = dayjs(`${year}-09-30`);
    } else { // Quý 4
      startOfQuarter = dayjs(`${year}-10-01`);
      endOfQuarter = dayjs(`${year}-12-31`);
    }
  
    // Lấy tất cả các ngày trong quý
    const daysInQuarter = [];
    let currentDay = startOfQuarter;
  
    while (currentDay.isBefore(endOfQuarter) || currentDay.isSame(endOfQuarter, 'day')) {
      daysInQuarter.push(currentDay.format('YYYY-MM-DD'));
      currentDay = currentDay.add(1, 'day');
    }
  
    return daysInQuarter;
  };

  export const getMonthsInYear = (year: number) => {
    const months = [];
    
    // Lặp qua các tháng trong năm
    for (let month = 0; month < 12; month++) {
      const monthYear = dayjs(new Date(year, month, 1)).format('YYYY-MM');
      months.push(monthYear);
    }
    
    return months;
  };
  

 export const formatPhoneNumber = (phone : any) => {
  if (!phone) {
    return ""; // Trả về chuỗi rỗng nếu phone bị undefined hoặc null
  }

  if (phone.length >= 4) {
    return `****${phone.slice(4)}`;
  }
  return phone; // Trả lại số ban đầu nếu không đủ 3 chữ số
  };


