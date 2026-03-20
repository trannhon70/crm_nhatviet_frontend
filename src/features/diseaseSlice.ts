import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { diseaseAPI } from "../apis/disease.api"
import { IGetPaging } from "../interface/roles"



export const getPagingDisease = createAsyncThunk(
    'disease/getPagingDisease',
    async ( query: IGetPaging ,thunkAPI ) => {
      const response = await diseaseAPI.getPagingDisease(query)
      return response.data.data
    },
  )

  export const getByIdDisease = createAsyncThunk(
    'disease/getByIdDisease',
    async ( id: number ,thunkAPI ) => {
      const response = await diseaseAPI.getByIdDisease(id)
      return response.data.data
    },
  )

  export const getAllDisease = createAsyncThunk(
    'disease/getAllDisease',
    async ( id: number ,thunkAPI ) => {
      const response = await diseaseAPI.getAllDisease(id)
      return response.data.data
    },
  )

  interface DiseaseState {
    data:any,
    pageSize: number,
    pageIndex: number,
    total: number,
    totalPages: number,
    disease: any,
    dataAll: any
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  }

  const initialState = {
    data: [],
    pageSize: 5,
    pageIndex: 1,
    total: 0,
    totalPages: 0,
    disease:{},
    dataAll: [],
    loading: 'idle',
  } satisfies DiseaseState as DiseaseState


  const diseaseSlice = createSlice({
    name: 'disease',
    initialState,
    reducers: {
      setDisease(state, action) {
        state.disease = action.payload;
      },
    },
    extraReducers: (builder) => {
     
      
      builder.addCase(getPagingDisease.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pageSize = action.payload.pageSize;
        state.pageIndex = action.payload.pageIndex;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.loading = 'succeeded';
      });
      builder.addCase(getByIdDisease.fulfilled, (state, action)=>{
        state.disease = action.payload
        state.loading = 'succeeded';
      })

      builder.addCase(getAllDisease.fulfilled, (state, action)=>{
        state.dataAll = action.payload
        state.loading = 'succeeded';
      })
    },
  });

    export const { setDisease } = diseaseSlice.actions;
    export const diseaseReducer = diseaseSlice.reducer;