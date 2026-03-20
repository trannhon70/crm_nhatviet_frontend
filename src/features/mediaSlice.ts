import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mediaAPI } from "../apis/media.api";


export const getPagingMedia = createAsyncThunk(
    'media/getPagingMedia',
    async ( query: any ,thunkAPI ) => {
      const response = await mediaAPI.getPaging(query)
      return response.data.data
    },
  )

  export const getByIdMedia = createAsyncThunk(
    'media/getByIdMedia',
    async ( id: number ,thunkAPI ) => {
      const response = await mediaAPI.getByIdMedia(id)
      return response.data.data
    },
  )

interface MediaState {
    data:any,
    pageSize: number,
    pageIndex: number,
    total: number,
    totalPages: number,
    media: any,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
  }

  const initialState = {
    data: [],
    pageSize: 5,
    pageIndex: 1,
    total: 0,
    totalPages: 0,
    media: {},
    loading: 'idle',
  } satisfies MediaState as MediaState

  const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
      setMedia(state, action) {
        state.media = action.payload;
      },
    },
    extraReducers: (builder) => {
      
      builder.addCase(getPagingMedia.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.pageSize = action.payload.pageSize;
        state.pageIndex = action.payload.pageIndex;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
        state.loading = 'succeeded';
      });

      builder.addCase(getByIdMedia.fulfilled, (state, action)=>{
        state.media = action.payload
        state.loading = 'succeeded';
      })
      
    },
  });

  export const { setMedia } = mediaSlice.actions;
    export const mediaReducer = mediaSlice.reducer;