
import instance from "../helper/api.helper";

export const districtAPI = {
    getDistrictByIdCity,
    
}

function getDistrictByIdCity(id: number) {
    return instance.get(`/district/get-by-id/${id}`);
}