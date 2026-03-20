import instance from "../helper/api.helper";
import { IGetPaging } from "../interface/roles";

function createdoctor (body: any){
    return instance.post(`/doctor/create`, body);
}

function getAllDoctor (id: number){
    return instance.get(`/doctor/get-all/${id}`);
}
function getPagingDoctor (query: IGetPaging){
    
    return instance.get(`/doctor/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}&hospitalId=${query.hospitalId}`);
}

function deletedoctor (id: number){
    return instance.delete(`/doctor/delete/${id}`);
}

function getByIdDoctor(id: number){
    return instance.get(`/doctor/get-by-id/${id}`);
}

function updateDoctor (id: number, body: any){
    return instance.put(`/doctor/update/${id}`,body);
}

export const doctorAPI = {
    createdoctor,
    getPagingDoctor,
    deletedoctor,
    getByIdDoctor,
    updateDoctor,
    getAllDoctor
}