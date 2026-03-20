import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BlackListAPI } from '../apis/blackList.api'
import { IGetPaging } from '../interface/roles'

export const fetchGetPaging = createAsyncThunk(
    'blackList/getPaging',
    async ( query: IGetPaging ,thunkAPI ) => {
      const response = await BlackListAPI.getPaging(query)
      return response.data.data
    },
  )

  interface BlackListState {
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
   
  } satisfies BlackListState as BlackListState

  const blacklistSlice = createSlice({
      name: 'blackList',
      initialState,
      reducers: {
       
      },
      extraReducers: (builder) => {
        builder.addCase(fetchGetPaging.fulfilled, (state, action) => {
          state.data = action.payload.data;
          state.pageSize = action.payload.pageSize;
          state.pageIndex = action.payload.pageIndex;
          state.total = action.payload.total;
          state.totalPages = action.payload.totalPages;
          state.loading = 'succeeded';
        });
        
       
      },
    });
  
    export const {  } = blacklistSlice.actions;
    export const blackListReducer = blacklistSlice.reducer;