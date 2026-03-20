import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { departmentAPI } from "../apis/department.api"
import { IGetPaging } from "../interface/roles"


export const getAllByIdHospital = createAsyncThunk(
    'department/getAllByIdHospital',
    async ( id: number ,thunkAPI ) => {
      const response = await departmentAPI.getAllByIdHospital(id)
      return response.data.data
    },
  )

  export const getPagingDepartment = createAsyncThunk(
    'department/getPagingDepartment',
    async ( query: IGetPaging  ,thunkAPI ) => {
      const response = await departmentAPI.getPagingDepartment(query)
      return response.data.data
    },
  )

  export const getByIdDepartment = createAsyncThunk(
    'department/getByIdDepartment',
    async ( id: number  ,thunkAPI ) => {
      const response = await departmentAPI.getByIdDepartment(id)
      return response.data.data
    },
  )

  interface DepartmentState {
    data:any,
    pageSize: number,
    pageIndex: number,
    total: number,
    totalPages: number,
    dataAll:any,
    department: any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  }

  const initialState = {
    data: [],
    pageSize: 5,
    pageIndex: 1,
    total: 0,
    totalPages: 0,
    dataAll: [],
    department:{},
    loading: 'idle',
  } satisfies DepartmentState as DepartmentState


  const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
      setDepartment(state, action) {
        state.department = action.payload;
      },
    },
    extraReducers: (builder) => {
     
      builder.addCase(getPagingDepartment.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pageSize = action.payload.pageSize;
        state.pageIndex = action.payload.pageIndex;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.loading = 'succeeded';
      });
      builder.addCase(getAllByIdHospital.fulfilled, (state, action) => {
        state.dataAll = action.payload;
        state.loading = 'succeeded';
      });
      builder.addCase(getByIdDepartment.fulfilled, (state, action) => {
        state.department = action.payload;
        state.loading = 'succeeded';
      })
    },
  });

    export const { setDepartment } = departmentSlice.actions;
    export const departmentReducer = departmentSlice.reducer;