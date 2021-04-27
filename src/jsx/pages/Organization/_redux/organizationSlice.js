import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clientService } from '../../../../services/client/client.service';
import { personnelService } from '../../../../services/personnel/personnel.service';
import parseErrorFromServer from '../../../../utils/parseErrorFromServer';

export const createOrganizationList = createAsyncThunk(
  'organization/createList',
  async ({ url, values, oraganizeId }) => {
    const response = await clientService.createList(url, values, oraganizeId);
    console.log('createList', response);
    return response.data;
  }
);

export const getOrganizationListUser = createAsyncThunk(
  'organization/getListUser',
  async ({ role, oraganizeId }) => {
    const response = await personnelService.getListUser(role, oraganizeId);
    if (response.data.code === -2) {
      return {
        code: -2,
        message: 'Invalid token',
      };
    }
    return response.data.data;
  }
);

export const getOrganizationListPersonnel = createAsyncThunk(
  'organization/getListPersonnel',
  async ({ id, oraganizeId }) => {
    const response = await personnelService.getListPersonnel(id, oraganizeId);
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
  async ({ url, id, oraganizeId }) => {
    const response = await clientService.getClientDetail(url, id, oraganizeId);
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

export const createUser = createAsyncThunk(
  'organization/createUser',
  async ({ values, oraganizeId }) => {
    const response = await personnelService.createUser(values, oraganizeId);
    if (response.data.code !== 0) {
      return parseErrorFromServer(response.data);
    }
    return response.data.data;
  }
);

export const deleteUser = createAsyncThunk(
  'organization/deleteUser',
  async ({ userId, oraganizeId }) => {
    const response = await personnelService.deleteUser(userId, oraganizeId);
    if (response.data.code !== 0) {
      return parseErrorFromServer(response.data);
    }
    return response.data.data;
  }
);

export const addUserToTree = createAsyncThunk(
  'organization/addUserToTree',
  async ({ values, oraganizeId }) => {
    const response = await personnelService.addUserToTree(values, oraganizeId);
    if (response.data.code !== 0) {
      return parseErrorFromServer(response.data);
    }
    return response.data.data;
  }
);

export const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
    data: [],
    fetching: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    // create list
    // [createList.pending]: (state) => {
    //   state.fetching = true;
    // },
    // [createList.rejected]: (state, action) => {
    //   state.fetching = false;
    //   state.error = action.payload;
    // },
    // [createList.fulfilled]: (state, action) => {
    //   state.data = action.payload;
    //   state.fetching = false;
    // },

    // get list
    [getOrganizationListUser.pending]: (state) => {
      state.fetching = true;
    },
    [getOrganizationListUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.fetching = false;
    },
    [getOrganizationListUser.fulfilled]: (state, action) => {
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

    // create user
    [createUser.pending]: (state) => {
      state.fetching = true;
    },
    [createUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.fetching = false;
    },
    [createUser.fulfilled]: (state, action) => {
      state.fetching = false;
    },

    // delete user
    [deleteUser.pending]: (state) => {
      state.fetching = true;
    },
    [deleteUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.fetching = false;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.fetching = false;
    },

    // add user to tree
    [addUserToTree.pending]: (state) => {
      state.fetching = true;
    },
    [addUserToTree.rejected]: (state, action) => {
      state.error = action.payload;
      state.fetching = false;
    },
    [addUserToTree.fulfilled]: (state, action) => {
      state.fetching = false;
    },
  },
});

export default organizationSlice.reducer;
