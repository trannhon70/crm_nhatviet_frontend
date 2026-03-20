import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { cityAPI } from "../apis/city.api"
import { districtAPI } from "../apis/district.api"
import { departmentAPI } from "../apis/department.api"
import { diseaseAPI } from "../apis/disease.api"
import { mediaAPI } from "../apis/media.api"
import { doctorAPI } from "../apis/doctor.api"
import { patiantAPI } from "../apis/patient.api"
import { historyPatiantAPI } from "../apis/historyPatient.api"


export const fetchCity = createAsyncThunk(
    'patient/fetchCity',
    async ( _ ,thunkAPI ) => {
        const response = await cityAPI.getAllCity()
        return response.data.data
      },
  )

  export const fetchDistrictbyIdCity = createAsyncThunk(
    'patient/fetchDistrictbyIdCity',
    async ( id: number ,thunkAPI ) => {
        const response = await districtAPI.getDistrictByIdCity(id)
        return response.data.data
      },
  )

  export const getAllByIdHospital = createAsyncThunk(
    'patient/getAllByIdHospital',
    async ( id: number ,thunkAPI ) => {
        const response = await departmentAPI.getAllByIdHospital(id)
        return response.data.data
      },
  )

  export const getByIdDepartment = createAsyncThunk(
    'patient/getByIdDepartment',
    async (query:any ,thunkAPI ) => {
        const response = await diseaseAPI.getByIdDepartment(query)
        return response.data.data
      },
  )

  export const getAllMedia = createAsyncThunk(
    'patient/getAllMedia',
    async ( id: number, thunkAPI ) => {
        const response = await mediaAPI.getAllMedia(id)
        return response.data.data
      },
  )

  export const getAllDoctor = createAsyncThunk(
    'patient/getAllDoctor',
    async (id: number, thunkAPI ) => {
        const response = await doctorAPI.getAllDoctor(id)
        return response.data.data
      },
  )

  export const getPagingPatient = createAsyncThunk(
    'patient/getPagingPatient',
    async ( query: any, thunkAPI ) => {
        const response = await patiantAPI.getPagingPatient(query)
        return response.data.data
      },
  )

  export const getPagingPatientDetele = createAsyncThunk(
    'patient/getPagingPatientDetele',
    async ( query: any, thunkAPI ) => {
        const response = await patiantAPI.getPagingPatientDetele(query)
        return response.data.data
      },
  )

  export const getByIdPatient = createAsyncThunk(
    'patient/getByIdPatient',
    async ( id: number, thunkAPI ) => {
        const response = await patiantAPI.getByIdPatiant(id)
        return response.data.data
      },
  )

  export const getAllHistoryPatiant = createAsyncThunk(
    'patient/getAllHistoryPatiant',
    async ( id: number, thunkAPI ) => {
        const response = await historyPatiantAPI.getAllHistoryPatiant(id)
        return response.data.data
      },
  )

  export const getThongKeNgayHienTai = createAsyncThunk(
    'patient/getThongKeNgayHienTai',
    async ( hospitalId: number, thunkAPI ) => {
        const response = await patiantAPI.getThongKeNgayHienTai(hospitalId)
        return response.data.data
      },
  )

  export const getThongKeAll = createAsyncThunk(
    'patient/getThongKeAll',
    async ( hospitalId: number, thunkAPI ) => {
        const response = await patiantAPI.getThongKeAll(hospitalId)
        return response.data.data
      },
  )

  export const getXuatDuLieuBenhNhan = createAsyncThunk(
    'patient/getXuatDuLieuBenhNhan',
    async ( query: any, thunkAPI ) => {
        const response = await patiantAPI.getXuatDuLieuBenhNhan(query)
        return response.data.data
      },
  )


  interface PatientState {
    data:any,
    dataExport: any,
    dataDelete: any,
    pageSize: number,
    pageIndex: number,
    total: number,
    daden: number,
    chuaden: number,
    totalPages: number,
    city: any,
    district:any,
    department:any,
    diseasses:any,
    media: any,
    doctor:any,
    patient:any,
    history:any,
    thongKeTheoNgayHienTai: any,
    thongkeAll: any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  }

  const initialState = {
    data: [],
    dataExport: [],
    dataDelete: [],
    pageSize: 5,
    pageIndex: 1,
    total: 0,
    daden: 0,
    chuaden: 0,
    totalPages: 0,
    city: [],
    district:[],
    department:[],
    diseasses: [],
    media: [],
    doctor:[],
    patient: {},
    history: [],
    thongKeTheoNgayHienTai: {},
    thongkeAll: {},
    loading: 'idle',
  } satisfies PatientState as PatientState

  const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
      setPatient(state, action) {
        state.patient = action.payload;
      },
      setDoctorIdReducer(state, action) {
        state.data = state.data.map((item: any) => {
          if (item.id === action.payload.patientId) {
            return {
              ...item,
              doctorId: action.payload.doctorId,
            };
          }
          return item;
        });
      },

      setStatusReducer(state, action) {
        state.data = state.data.map((item: any) => {
          if (item.id === action.payload.patientId) {
            return {
              ...item,
              status: action.payload.status,
            };
          }
          return item;
        });
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getPagingPatient.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pageSize = action.payload.pageSize;
        state.pageIndex = action.payload.pageIndex;
        state.total = action.payload.total;
        state.daden = action.payload.daden;
        state.chuaden = action.payload.chuaden;
        state.totalPages = action.payload.totalPages;
        state.loading = 'succeeded';
      });

      builder.addCase(getPagingPatientDetele.fulfilled, (state, action) => {
        
        state.dataDelete = action.payload.data;
        state.pageSize = action.payload.pageSize;
        state.pageIndex = action.payload.pageIndex;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.loading = 'succeeded';
      });
      
      builder.addCase(fetchCity.fulfilled, (state, action) => {
        state.city = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(fetchDistrictbyIdCity.fulfilled, (state, action) => {
        state.district = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getAllByIdHospital.fulfilled, (state, action) => {
        state.department = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getByIdDepartment.fulfilled, (state, action) => {
        state.diseasses = action.payload;
        state.loading = 'succeeded';
      })


      builder.addCase(getAllMedia.fulfilled, (state, action) => {
        state.media = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getAllDoctor.fulfilled, (state, action) => {
        state.doctor = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getByIdPatient.fulfilled, (state, action) => {
        state.patient = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getAllHistoryPatiant.fulfilled, (state, action) => {
        state.history = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getThongKeNgayHienTai.fulfilled, (state, action) => {
        state.thongKeTheoNgayHienTai = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getThongKeAll.fulfilled, (state, action) => {
        state.thongkeAll = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getXuatDuLieuBenhNhan.fulfilled, (state, action) => {
        state.dataExport = action.payload.data;
        state.pageSize = action.payload.pageSize;
        state.pageIndex = action.payload.pageIndex;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.loading = 'succeeded';
      })
    },
  });

  export const { setPatient, setDoctorIdReducer, setStatusReducer } = patientSlice.actions;
  export const patientReducer = patientSlice.reducer;