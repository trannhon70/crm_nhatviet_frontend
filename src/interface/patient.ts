
export interface IPatient {
    name?: string;
    //giới tính
    gender?: string
    //tuổi
    yearOld?: number;
    //số điện thoaị
    phone?:string;
    //nội dung tư ván
    content?: string;
    //bệnh
    diseasesId?: number;
    //khoa
    departmentId?: number
    // nguồn đến
    mediaId?: number
    //thành phố
    cityId?:string
    districtId:string
    //mã chuyên gia
    code?: string
    //thời gian hen
    appointmentTime?: number
    //thời gian nhắt hẹn
    reminderTime?: number
    //ghi chú
    note?: string
    //sua doi thời gian đăng ký
    editregistrationTime?: number
    // trạng thái
    status?: string
    // bác sĩ
    doctorId?: number
    //người tạo
    userId?: number;
    //bệnh viện 
    hospitalId?: number; 
    chat?:string
    //ngày tạo

     //mục điều trị
     treatment?:string
     
     //hồ sơ tiếp nhận
     record?:string

     money?: string
}