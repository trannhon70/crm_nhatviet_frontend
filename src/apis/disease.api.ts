
import instance from "../helper/api.helper";
import { IGetPaging } from "../interface/roles";

export const diseaseAPI = {
    createdisease,
    getPagingDisease,
    deleteDisease,
    getByIdDisease,
    updateDisease,
    getByIdDepartment,
    getAllDisease
}

function createdisease (body: any){
    return instance.post(`/disease/create`, body);
}

function deleteDisease (id: number){
    return instance.delete(`/disease/delete/${id}`);
}

function updateDisease (id: number, body: any){
    return instance.put(`/disease/update/${id}`,body);
}
function getPagingDisease (query: IGetPaging){
    
    return instance.get(`/disease/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}&hospitalId=${query.hospitalId}&isshow=${query.isshow}`);
}

function getByIdDisease (id: number){
    return instance.get(`/disease/get-by-id/${id}`);
}

function getByIdDepartment (query: any){
    return instance.get(`/disease/get-by-id-department?hospitalId=${query.hospitalId}&departmentId=${query.departmentId}`);
}

function getAllDisease (id: any){
    return instance.get(`/disease/get-all?hospitalId=${id}`);
}