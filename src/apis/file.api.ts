import instance from "../helper/api.helper";

export const fileAPI = {
  
    deleteFile
}


function deleteFile (id: number){
    return instance.delete(`/file/delete/${id}`);
}