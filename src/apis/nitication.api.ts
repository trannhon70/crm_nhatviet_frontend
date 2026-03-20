import instance from "../helper/api.helper";

export const noticationAPI = {
    getPagingNotication,
    updateStatus,
    checkAllNotication
}

function getPagingNotication(query: any) {
    return instance.get(`/notication/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&hospitalId=${query.hospitalId}`);
}

function updateStatus (id: number, body: any) {
    return instance.put(`/notication/update-status/${id}`,body)
}

function checkAllNotication ( body: any) {
    return instance.post(`/notication/check-all`,body)
}