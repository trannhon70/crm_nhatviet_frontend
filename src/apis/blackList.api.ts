import instance from "../helper/api.helper";

export const BlackListAPI = {
    create,
    getPaging,
    deleteBlackList,
   
}

function create(data :any) {
    return instance.post("/phone-blacklist/create", data);
}

function deleteBlackList(id :number) {
    return instance.delete(`/phone-blacklist/delete/${id}`,);
}


function getPaging(query: any) {
    return instance.get(`/phone-blacklist/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}`);
}
