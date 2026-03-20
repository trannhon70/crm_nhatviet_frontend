import instance from "../helper/api.helper";
import { IGetPaging } from "../interface/roles";

export const rolesAPI = {
    create,
    getPaging,
    deleteRole,
    getById,
    updateRole,
    getAll
}

function create(data :any) {
    return instance.post("/role/create", data);
}

function deleteRole(id :number) {
    return instance.delete(`/role/delete/${id}`,);
}

function updateRole(id :number, body: any) {
    return instance.put(`/role/update/${id}`,body);
}

function getPaging(query: IGetPaging) {
    return instance.get(`/role/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}`);
}

function getById(id :number) {
    return instance.get(`/role/get-by-id/${id}`,);
}

function getAll() {
    return instance.get(`/role/get-all`);
}