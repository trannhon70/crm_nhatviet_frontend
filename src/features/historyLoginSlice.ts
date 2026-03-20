import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { historyLoginAPI } from "../apis/historyLogin.api";

export const getPagingHistoryLogin = createAsyncThunk(
    'doctor/getPagingHistoryLogin',
    async ( query: any ,thunkAPI ) => {
      const response = await historyLoginAPI.getPaging(query)
      return response.data.data
    },
  )

interface historyLoginState {
    data:any,
    pageSize: number,
    pageIndex: number,
    total: number,
    totalPages: number,
    
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  }

  const initialState = {
    data: [],
    pageSize: 5,
    pageIndex: 1,
    total: 0,
    totalPages: 0,
    loading: 'idle',
  } satisfies historyLoginState as historyLoginState

  const historyLoginSlice = createSlice({
    name: 'doctor',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
     
      
      builder.addCase(getPagingHistoryLogin.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pageSize = action.payload.pageSize;
        state.pageIndex = action.payload.pageIndex;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.loading = 'succeeded';
      });
      
    },
  });

  export const {  } = historyLoginSlice.actions;
    export const historyLoginReducer = historyLoginSlice.reducer;