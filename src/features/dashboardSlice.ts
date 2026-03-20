import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { patiantAPI } from "../apis/patient.api";

export const getThongKeDangKy = createAsyncThunk(
    'dashboard/getThongKeDangKy',
    async ( hospitalId: number ,thunkAPI ) => {
      const response = await patiantAPI.getThongKeDangKy(hospitalId)
      return response.data.data
    },
  )

  export const getDanhSachXepHangThamKham = createAsyncThunk(
    'dashboard/getDanhSachXepHangThamKham',
    async ( hospitalId: number ,thunkAPI ) => {
      const response = await patiantAPI.getDanhSachXepHangThamKham(hospitalId)
      return response.data.data
    },
  )

  export const getThongKeQuaKenh = createAsyncThunk(
    'dashboard/getThongKeQuaKenh',
    async ( hospitalId: number ,thunkAPI ) => {
      const response = await patiantAPI.getThongKeQuaKenh(hospitalId)
      return response.data.data
    },
  )

  export const getThongKeKhoa = createAsyncThunk(
    'dashboard/getThongKeKhoa',
    async ( hospitalId: number ,thunkAPI ) => {
      const response = await patiantAPI.getThongKeKhoa(hospitalId)
      return response.data.data
    },
  )

  export const getThongKeBenh = createAsyncThunk(
    'dashboard/getThongKeBenh',
    async ( hospitalId: number ,thunkAPI ) => {
      const response = await patiantAPI.getThongKeBenh(hospitalId)
      return response.data.data
    },
  )
  export const getThongKeTuVan = createAsyncThunk(
    'dashboard/getThongKeTuVan',
    async ( hospitalId: number ,thunkAPI ) => {
      const response = await patiantAPI.getThongKeTuVan(hospitalId)
      return response.data.data
    },
  )

interface DashboardState {
    ThongKeDangKy: any,
    DanhSachXepHang: any,
    ThongKeQuaKenh: any,
    ThongKeKhoa: any,
    ThongKeBenh: any,
    ThongKeTuVan: any,

    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    
  }

  const initialState = {
    ThongKeDangKy: {},
    DanhSachXepHang: {},
    ThongKeQuaKenh: [],
    ThongKeKhoa: [],
    ThongKeBenh: [],
    ThongKeTuVan: [],
    loading: 'idle',
  
  } satisfies DashboardState as DashboardState


  const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
      setThongKeDangKy(state, action) {
        state.ThongKeDangKy = action.payload;
      },
      setDanhSachXepHangThamKham(state, action) {
        state.DanhSachXepHang = action.payload;
      },
      setThongKeQuaKenh(state, action) {
        state.ThongKeQuaKenh = action.payload;
      },
      setThongKeKhoa(state, action) {
        state.ThongKeKhoa = action.payload;
      },
      setThongKeBenh(state, action) {
        state.ThongKeBenh = action.payload;
      },
      setThongKeTuVan(state, action) {
        state.ThongKeBenh = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder.addCase(getThongKeDangKy.fulfilled, (state, action) => {
        state.ThongKeDangKy = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getDanhSachXepHangThamKham.fulfilled, (state, action) => {
        state.DanhSachXepHang = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getThongKeQuaKenh.fulfilled, (state, action) => {
        state.ThongKeQuaKenh = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getThongKeKhoa.fulfilled, (state, action) => {
        state.ThongKeKhoa = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getThongKeBenh.fulfilled, (state, action) => {
        state.ThongKeBenh = action.payload;
        state.loading = 'succeeded';
      })

      builder.addCase(getThongKeTuVan.fulfilled, (state, action) => {
        state.ThongKeTuVan = action.payload;
        state.loading = 'succeeded';
      })

    },
  });

  export const { setThongKeDangKy, setDanhSachXepHangThamKham, setThongKeQuaKenh, setThongKeKhoa, setThongKeBenh, setThongKeTuVan } = dashboardSlice.actions;
  export const dashboardReducer = dashboardSlice.reducer;