
import instance from "../helper/api.helper";

export const cityAPI = {
    getAllCity,
    
}

function getAllCity() {
    return instance.get(`/city/get-all`);
}