
import instance from "../helper/api.helper";
import { IGetPaging } from "../interface/roles";

export const departmentAPI = {
    getAllByIdHospital,
    createDepartment,
    getPagingDepartment,
    deleteDepartment,
    getByIdDepartment,
    updateDepartment
}

function getAllByIdHospital(id: number) {
    return instance.get(`/department/get-all/${id}`);
}

function createDepartment (body: any){
    return instance.post(`/department/create`, body);
}

function deleteDepartment (id: number){
    return instance.delete(`/department/delete/${id}`);
}
function updateDepartment (id: number, body: any){
    return instance.put(`/department/update/${id}`,body);
}
function getPagingDepartment (query: IGetPaging){
    
    return instance.get(`/department/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}&hospitalId=${query.hospitalId}`);
}

function getByIdDepartment(id: number){
    return instance.get(`/department/get-by-id/${id}`);
}