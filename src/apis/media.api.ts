import instance from "../helper/api.helper";

export const mediaAPI = {
    getAllMedia,
    getPaging,
    createMedia,
    getByIdMedia,
    updateMedia,
    deleteMedia
}

function getAllMedia (id: number){
    return instance.get(`/media/get-all/${id}`);
}

function getPaging(query: any) {
    return instance.get(`/media/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}&hospitalId=${query.hospitalId}`);
}

function createMedia (body: any){
    return instance.post(`/media/create`, body);
}

function getByIdMedia (id: number){
    return instance.get(`/media/get-by-id/${id}`);
}

function updateMedia (id: number, body: any){
    return instance.put(`/media/update/${id}`, body);
}

function deleteMedia (id: number){
    return instance.delete(`/media/delete/${id}`);
}