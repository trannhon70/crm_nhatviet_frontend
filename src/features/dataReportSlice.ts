
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { patiantAPI } from '../apis/patient.api'

export const getBaoCaoTongHop = createAsyncThunk(
    'report/getBaoCaoTongHop',
    async ( query: any ,thunkAPI ) => {
      const response = await patiantAPI.getBaoCaoTongHop(query)
      return response.data.data
    },
  )

  export const getThongkeGioitinh = createAsyncThunk(
    'report/getThongkeGioitinh',
    async ( body: any ,thunkAPI ) => {
      const response = await patiantAPI.getThongkeGioitinh(body)
      return response.data.data
    },
  )

  export const getThongkeTuoi = createAsyncThunk(
    'report/getThongkeTuoi',
    async ( body: any ,thunkAPI ) => {
      const response = await patiantAPI.getThongkeTuoi(body)
      return response.data.data
    },
  )

  export const getThongkeTheoBenh = createAsyncThunk(
    'report/getThongkeTheoBenh',
    async ( body: any ,thunkAPI ) => {
      const response = await patiantAPI.getThongkeTheoBenh(body)
      return response.data.data
    },
  )

  export const getThongkeTheoNguonTruyenThong = createAsyncThunk(
    'report/getThongkeTheoNguonTruyenThong',
    async ( body: any ,thunkAPI ) => {
      const response = await patiantAPI.getThongkeTheoNguonTruyenThong(body)
      return response.data.data
    },
  )

  export const getThongkeTheoTinhTrang = createAsyncThunk(
    'report/getThongkeTheoTinhTrang',
    async ( body: any ,thunkAPI ) => {
      const response = await patiantAPI.getThongkeTheoTinhTrang(body)
      return response.data.data
    },
  )
  export const getThongkeTheoBacSi = createAsyncThunk(
    'report/getThongkeTheoBacSi',
    async ( body: any ,thunkAPI ) => {
      const response = await patiantAPI.getThongkeTheoBacSi(body)
      return response.data.data
    },
  )

  export const getThongkeTheoDichvuKhachHang = createAsyncThunk(
    'report/getThongkeTheoDichvuKhachHang',
    async ( body: any ,thunkAPI ) => {
      const response = await patiantAPI.getThongkeTheoDichvuKhachHang(body)
      return response.data.data
    },
  )

  export const getBaoCaoKhuVuc = createAsyncThunk(
    'report/getBaoCaoKhuVuc',
    async ( body: any ,thunkAPI ) => {
      const response = await patiantAPI.getBaoCaoKhuVuc(body)
      return response.data.data
    },
  )
interface dataReportState {
    resultYear:any,
    resultMonth: any,
    gender: any,
    tuoi: any,
    TKTB: any,
    TKMedia: any,
    TKStatus: any,
    TKDoctor: any,
    TKDVKH: any,
    TKBCKV: any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  }

  const initialState = {
    resultYear: [],
    resultMonth: [],
    gender: [],
    tuoi: [],
    TKTB: [],
    TKMedia: [],
    TKStatus: [],
    TKDoctor: [],
    TKDVKH: [],
    TKBCKV: [],
    loading: 'idle',
  } satisfies dataReportState as dataReportState

  const dataReportSlice = createSlice({
    name: 'dataReport',
    initialState,
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder.addCase(getBaoCaoTongHop.fulfilled, (state, action) => {
        state.resultYear = action.payload.resultYear;
        state.resultMonth = action.payload.resultMonth;
        state.loading = 'succeeded';
      });

      builder.addCase(getThongkeGioitinh.fulfilled, (state, action) => {
        state.gender = action.payload;
        state.loading = 'succeeded';
      });

      builder.addCase(getThongkeTuoi.fulfilled, (state, action) => {
        state.tuoi = action.payload;
        state.loading = 'succeeded';
      });

      builder.addCase(getThongkeTheoBenh.fulfilled, (state, action) => {
        state.TKTB = action.payload;
        state.loading = 'succeeded';
      });

      builder.addCase(getThongkeTheoNguonTruyenThong.fulfilled, (state, action) => {
        state.TKMedia = action.payload;
        state.loading = 'succeeded';
      });

      builder.addCase(getThongkeTheoTinhTrang.fulfilled, (state, action) => {
        state.TKStatus = action.payload;
        state.loading = 'succeeded';
      });
      
      builder.addCase(getThongkeTheoBacSi.fulfilled, (state, action) => {
        state.TKDoctor = action.payload;
        state.loading = 'succeeded';
      });

      builder.addCase(getThongkeTheoDichvuKhachHang.fulfilled, (state, action) => {
        state.TKDVKH = action.payload;
        state.loading = 'succeeded';
      });

       builder.addCase(getBaoCaoKhuVuc.fulfilled, (state, action) => {
        state.TKBCKV = action.payload;
        state.loading = 'succeeded';
      });
      
    },
  });
  export const {  } = dataReportSlice.actions;
  export const dataReportReducer = dataReportSlice.reducer;