import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clientService } from '../../../../services/client/client.service';

export const createList = createAsyncThunk(
  'customer/createList',
  async ({ url, values, oraganizeId }) => {
    const response = await clientService.createList(url, values, oraganizeId);
    return response.data;
  }
);
export const getList = createAsyncThunk(
  'customer/getList',
  async ({ url, oraganizeId }) => {
    const response = await clientService.getList(url, oraganizeId);
    if (response.data.code === -2) {
      return {
        code: -2,
        message: 'Invalid token',
      };
    }
    return response.data.data;
  }
);

export const getClientDetail = createAsyncThunk(
  'customer/getClientDetail',
  async ({ id, oraganizeId }) => {
    const response = await clientService.getClientDetail(id, oraganizeId);
    return response.data.data;
  }
);

export const updateList = createAsyncThunk(
  'customer/updateList',
  async ({ url, id, values, oraganizeId }) => {
    const response = await clientService.updateList(
      url,
      id,
      values,
      oraganizeId
    );
    return response.data;
  }
);

export const deleteList = createAsyncThunk(
  'customer/deleteList',
  async ({ url, id, oraganizeId }) => {
    const response = await clientService.deleteList(url, id, oraganizeId);
    return response.data;
  }
);

export const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    data: [],
    fetching: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    // create list
    [createList.pending]: (state) => {
      state.fetching = true;
    },
    [createList.rejected]: (state, action) => {
      state.fetching = false;
      state.error = action.payload;
    },
    [createList.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.fetching = false;
    },

    // get list
    [getList.pending]: (state) => {
      state.fetching = true;
    },
    [getList.rejected]: (state, action) => {
      state.error = action.payload;
      state.fetching = false;
    },
    [getList.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.fetching = false;
    },
    // get client detail
    [getClientDetail.pending]: (state) => {
      state.fetching = true;
    },
    [getClientDetail.rejected]: (state, action) => {
      state.error = action.payload;
      state.fetching = false;
    },
    [getClientDetail.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.fetching = false;
    },
    // update list
    [updateList.pending]: (state) => {
      state.fetching = true;
    },
    [updateList.rejected]: (state, action) => {
      state.error = action.payload;
      state.fetching = false;
    },
    [updateList.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.fetching = false;
    },

    // delete list
    [deleteList.pending]: (state) => {
      state.fetching = true;
    },
    [deleteList.rejected]: (state, action) => {
      state.error = action.payload;
      state.fetching = false;
    },
    [deleteList.fulfilled]: (state, action) => {
      state.fetching = false;
    },
  },
});

export default customerSlice.reducer;
