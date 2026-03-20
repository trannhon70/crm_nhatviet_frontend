import instance from "../helper/api.helper";
import { IPatient } from "../interface/patient";

export const patiantAPI = {
    createPatiant,
    getPagingPatient,
    deletePatiant,
    getByIdPatiant,
    updatePatiant,
    uploadPatient,
    getThongKeNgayHienTai,
    getThongKeAll,
    getThongKeDangKy,
    getDanhSachXepHangThamKham,
    getThongKeQuaKenh,
    getThongKeKhoa,
    getThongKeBenh,
    getThongKeTuVan,
    getXuatDuLieuBenhNhan,
    getBaoCaoTongHop,
    getThongkeGioitinh,
    getThongkeTuoi,
    getThongkeTheoBenh,
    getThongkeTheoNguonTruyenThong,
    getThongkeTheoTinhTrang,
    getThongkeTheoBacSi,
    getThongkeTheoDichvuKhachHang,
    importFileExcel,
    updatePatientMoney,
    updatePatientDoctorId,
    updatePatientStatus,
    getPagingPatientDetele,
    getBaoCaoKhuVuc,
    updatePatientReason
}

function createPatiant(body: IPatient) {
    return instance.post(`/patient/create`, body);
}

function uploadPatient(form: any, id: number) {
    return instance.post(`/patient/upload/${id}`, form,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
}

function updatePatiant(body: IPatient, id: number) {
    return instance.put(`/patient/update/${id}`, body);
}

function deletePatiant(id: number) {
    return instance.delete(`/patient/delete/${id}`);
}

function getByIdPatiant(id: number) {
    return instance.get(`/patient/get-by-id/${id}`);
}

function getPagingPatient(query: any) {
    return instance.get(`/patient/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&hospitalId=${query.hospitalId}&search=${query.search}&doctorId=${query.doctorId}&status=${query.status}&departmentId=${query.departmentId}&diseasesId=${query.diseasesId}&mediaId=${query.mediaId}&created_at=${query.created_at}&appointmentTime=${query.appointmentTime}&userId=${query.userId}`);
}

function getPagingPatientDetele(query: any) {
    return instance.get(`/patient/get-paging-user-delete?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&hospitalId=${query.hospitalId}&search=${query.search}&created_at=${query.created_at}`);
}


function getThongKeNgayHienTai(hospitalId: number) {
    return instance.get(`/patient/get-thong-ke-ngay-hien-tai?hospitalId=${hospitalId}`);
}

function getThongKeAll(hospitalId: number) {
    return instance.get(`/patient/get-thong-ke-all?hospitalId=${hospitalId}`);
}


function getThongKeDangKy(hospitalId: number) {
    return instance.get(`/patient/thong-ke-dang-ky?hospitalId=${hospitalId}`);
}


function getDanhSachXepHangThamKham(hospitalId: number) {
    return instance.get(`/patient/danh-sach-xep-hang-tham-kham?hospitalId=${hospitalId}`);
}

function getThongKeQuaKenh(hospitalId: number) {
    return instance.get(`/patient/thong-ke-qua-kenh?hospitalId=${hospitalId}`);
}

function getThongKeKhoa(hospitalId: number) {
    return instance.get(`/patient/thong-ke-khoa?hospitalId=${hospitalId}`);
}

function getThongKeBenh(hospitalId: number) {
    return instance.get(`/patient/thong-ke-benh?hospitalId=${hospitalId}`);
}

function getThongKeTuVan(hospitalId: number) {
    return instance.get(`/patient/thong-ke-tu-van?hospitalId=${hospitalId}`);
}

function getXuatDuLieuBenhNhan(query: any) {
    return instance.get(`/patient/xuat-du-lieu-benh-nhan?hospitalId=${query.hospitalId}&pageSize=${query.pageSize}&pageIndex=${query.pageIndex}&created_at=${query.created_at}&appointmentTime=${query.appointmentTime}&doctorId=${query.doctorId}&status=${query.status}&departmentId=${query.departmentId}&diseasesId=${query.diseasesId}&cityId=${query.cityId}&districtId=${query.districtId}`);
}

function getBaoCaoTongHop(query: any) {
    return instance.get(`/patient/bao-cao-tong-hop?hospitalId=${query.hospitalId}`)
}

function getThongkeGioitinh(body: any) {
    return instance.post(`/patient/thong-ke-gioi-tinh`, body)
}

function getThongkeTuoi(body: any) {
    return instance.post(`/patient/thong-ke-tuoi`, body)
}

function getThongkeTheoBenh(body: any) {
    return instance.post(`/patient/thong-ke-theo-benh`, body)
}

function getThongkeTheoNguonTruyenThong(body: any) {
    return instance.post(`/patient/thong-ke-theo-nguon-truyen-thong`, body)
}

function getThongkeTheoTinhTrang(body: any) {
    return instance.post(`/patient/thong-ke-theo-tinh-trang`, body)
}

function getThongkeTheoBacSi(body: any) {
    return instance.post(`/patient/thong-ke-theo-bac-si`, body)
}

function getThongkeTheoDichvuKhachHang(body: any) {
    return instance.post(`/patient/thong-ke-theo-dich-vu-khach-hang`, body)
}

function importFileExcel(body: any) {
    return instance.post(`/patient/import-file-excel`, body)
}

function updatePatientMoney(body: any) {
    return instance.post(`/patient/update-patient-money`, body)
}

function updatePatientDoctorId(body: any) {
    return instance.post(`/patient/update-patient-doctorId`, body)
}

function updatePatientStatus(body: any) {
    return instance.post(`/patient/update-patient-status`, body)
}

function getBaoCaoKhuVuc(query: any) {
    return instance.get(`/patient/bao-cao-khu-vuc?hospitalId=${query.hospitalId}&cityId=${query.cityId}&districtId=${query.districtId}&time=${query.time}`);
}

function updatePatientReason(body: any) {
    return instance.post(`/patient/update-patient-reason`, body)
}