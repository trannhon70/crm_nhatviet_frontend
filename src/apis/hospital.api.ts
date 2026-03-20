import instance from "../helper/api.helper";
import { IGetPaging } from "../interface/roles";

export const hospitalAPI = {
    getPaging,
    getAllHospital,
    getByIdHospital,
    createHospital,
    updateHospital,
    deleteHospital,
    getThongKechiTietDichVuKhachHang,
    getBaoCaoXuHuongHangThang,
    getBaoCaoDoHoaTuyChinh
}

function getPaging(query: IGetPaging) {
    return instance.get(`/hospital/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}`);
}

function getAllHospital() {
    return instance.get(`/hospital/get-all`);
}

function getByIdHospital(id: number) {
    return instance.get(`/hospital/get-by-id/${id}`)
}

function createHospital(body: any) {
    return instance.post(`/hospital/create`, body)
}

function updateHospital(id: number, body: any) {
    return instance.put(`/hospital/update/${id}`, body)
}

function deleteHospital(id: number) {
    return instance.delete(`/hospital/delete/${id}`)
}

// thong-ke-chi-tiet-dich-vu-khach-hang
function getThongKechiTietDichVuKhachHang () {
    return instance.get(`/hospital/thong-ke-chi-tiet-dich-vu-khach-hang`);
}

function getBaoCaoXuHuongHangThang (hospitalId: number) {
    return instance.get(`/hospital/bao-cao-xu-huong-hang-thang?hospitalId=${hospitalId}`);
}

function getBaoCaoDoHoaTuyChinh (body: any) {
    return instance.post(`/hospital/bao-cao-do-hoa-tuy-chinh`, body);
}