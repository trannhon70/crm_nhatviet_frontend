import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './counterSlice';
import { usersReducer } from '../features/usersSlice';
import { rolesReducer } from '../features/rolesSlice';
import { hospitalReducer } from '../features/hospitalSlice';
import { departmentReducer } from '../features/departmentSlice';
import { diseaseReducer } from '../features/diseaseSlice';
import { doctorReducer } from '../features/doctorSlice';
import { patientReducer } from '../features/patientSlice';
import { dashboardReducer } from '../features/dashboardSlice';
import { historyLoginReducer } from '../features/historyLoginSlice';
import { mediaReducer } from '../features/mediaSlice';
import { noticationReducer } from '../features/noticationSlice';
import { dataReportReducer } from '../features/dataReportSlice';
import { blackListReducer } from '../features/phoneBlackListSlice';


export const store = configureStore({
  reducer: {
    counter: counterSlice,
    users: usersReducer,
    roles: rolesReducer,
    hospital: hospitalReducer,
    department: departmentReducer,
    disease: diseaseReducer,
    doctor:doctorReducer,
    patient:patientReducer,
    dashboard: dashboardReducer,
    historyLogin: historyLoginReducer,
    media: mediaReducer,
    notication: noticationReducer,
    dataReport: dataReportReducer,
    blackList: blackListReducer,
  },
});

// Định nghĩa RootState và AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
