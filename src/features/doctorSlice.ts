import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IGetPaging } from "../interface/roles"
import { doctorAPI } from "../apis/doctor.api"


export const getPagingDoctor = createAsyncThunk(
    'doctor/getPagingDoctor',
    async ( query: IGetPaging ,thunkAPI ) => {
      const response = await doctorAPI.getPagingDoctor(query)
      return response.data.data
    },
  )

  export const getByIdDoctor = createAsyncThunk(
    'doctor/getByIdDoctor',
    async ( id: number ,thunkAPI ) => {
      const response = await doctorAPI.getByIdDoctor(id)
      return response.data.data
    },
  )

  interface DoctorState {
    data:any,
    pageSize: number,
    pageIndex: number,
    total: number,
    totalPages: number,
    doctor:any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  }

  const initialState = {
    data: [],
    pageSize: 5,
    pageIndex: 1,
    total: 0,
    totalPages: 0,
    doctor:{},
    loading: 'idle',
  } satisfies DoctorState as DoctorState

  const doctorSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
      setDoctor(state, action) {
        state.doctor = action.payload;
      },
    },
    extraReducers: (builder) => {
     
      
      builder.addCase(getPagingDoctor.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pageSize = action.payload.pageSize;
        state.pageIndex = action.payload.pageIndex;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.loading = 'succeeded';
      });
      builder.addCase(getByIdDoctor.fulfilled, (state, action)=>{
        state.doctor = action.payload
        state.loading = 'succeeded';
      })
    },
  });

  export const { setDoctor } = doctorSlice.actions;
    export const doctorReducer = doctorSlice.reducer;