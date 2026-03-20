import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { noticationAPI } from "../apis/nitication.api"



export const getPagingNotication = createAsyncThunk(
    'notication/getPagingNotication',
    async ( query: any ,thunkAPI ) => {
      const response = await noticationAPI.getPagingNotication(query)
      return response.data.data
    },
  )
interface NoticationState {
    data:any,
    pageSize: number,
    pageIndex: number,
    total: number,
    totalPages: number,
    totalStatus:number,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  }

  const initialState = {
    data: [],
    pageSize: 5,
    pageIndex: 1,
    total: 0,
    totalPages: 0,
    totalStatus:0,
    loading: 'idle',
  } satisfies NoticationState as NoticationState

  const noticationSlice = createSlice({
    name: 'notication',
    initialState,
    reducers: {
    //   setDoctor(state, action) {
    //     state.doctor = action.payload;
    //   },
    },
    extraReducers: (builder) => {
      builder.addCase(getPagingNotication.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pageSize = action.payload.pageSize;
        state.pageIndex = action.payload.pageIndex;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.totalStatus = action.payload.totalStatus;
        state.loading = 'succeeded';
      });
      
    },
  });

  export const {  } = noticationSlice.actions;
    export const noticationReducer = noticationSlice.reducer;