import instance from "../helper/api.helper";

export const historyLoginAPI = {
    getPaging,
    deleteHistory
}

function getPaging(query: any) {
    return instance.get(`/history-login/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}&action=${query.action}`);
}

function deleteHistory (id: number){
    return instance.delete(`/history-login/delete/${id}`);
}