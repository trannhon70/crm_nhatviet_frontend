import instance from "../helper/api.helper";
import { IGetPaging } from "../interface/roles";
import { ILogin, IUser } from "../interface/users";

export const userAPI = {
    login,
    getByIdUser,
    UpdateUserId,
    create,
    getPaging,
    deleteUser,
    activeUser,
    unActiveUser,
    fecthByIdUser,
    logout,
    resetPassword,
    getAllUserOnline
};

function login(data : ILogin) {
    return instance.post("/user/login", data);
}

function resetPassword(id: number, body: any) {
    return instance.put(`/user/reset-password/${id}`, body);
}

function logout() {
    return instance.post("/user/logout");
}

function create(body : IUser) {
    return instance.post("/user/create", body);
}

function deleteUser(id: number) {
    return instance.delete(`/user/delete-user/${id}`);
}

function getPaging(query: IGetPaging) {
    return instance.get(`/user/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}&isshow=${query.isshow}&language=${query.language}`);
}

function getByIdUser() {
    return instance.get("/user/get-by-user");
}

function fecthByIdUser(id: number) {
    return instance.get(`/user/get-by-id/${id}`);
}


function UpdateUserId(id: number, body: any) {
    return instance.put(`/user/update-user/${id}`, body);
}

function activeUser(id: number) {
    return instance.put(`/user/active-user/${id}`);
}

function unActiveUser(id: number) {
    return instance.put(`/user/un-active-user/${id}`);
}

function getAllUserOnline() {
    return instance.get(`/user/get-user-online`);
}