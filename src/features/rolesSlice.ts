
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { rolesAPI } from '../apis/roles.api'
import { IGetPaging } from '../interface/roles'

export const fetchGetPaging = createAsyncThunk(
    'roles/getPaging',
    async ( query: IGetPaging ,thunkAPI ) => {
      const response = await rolesAPI.getPaging(query)
      return response.data.data
    },
  )

  export const fetchGetById = createAsyncThunk(
    'roles/getByid',
    async ( id: number ,thunkAPI ) => {
      const response = await rolesAPI.getById(id)
      return response.data.data
    },
  )

  export const getAllRole = createAsyncThunk(
    'roles/getAll',
    async ( thunkAPI ) => {
      const response = await rolesAPI.getAll()
      return response.data.data
    },
  )

  interface RoleState {
    data:any,
    pageSize: number,
    pageIndex: number,
    total: number,
    totalPages: number,
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    role: any,
    allRole: any
  }

  const initialState = {
    data: [],
    pageSize: 5,
    pageIndex: 1,
    total: 0,
    totalPages: 0,
    loading: 'idle',
    role: {},
    allRole: []
  } satisfies RoleState as RoleState


  const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
      setRoleData(state, action) {
        state.role = action.payload;
      },
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
      
      builder.addCase(fetchGetById.fulfilled, (state, action) => {
        state.role = action.payload; 
        state.loading = 'succeeded';
      });

      builder.addCase(getAllRole.fulfilled, (state, action) => {
        state.allRole = action.payload;
        state.loading = 'succeeded';
      })
    },
  });

  export const { setRoleData } = rolesSlice.actions;
  export const rolesReducer = rolesSlice.reducer;