

import instance from "../helper/api.helper";


export const historyPatiantAPI = {
    getAllHistoryPatiant
}

function getAllHistoryPatiant(id: number) {
    return instance.get(`/history-patient/get-all/${id}`);
}