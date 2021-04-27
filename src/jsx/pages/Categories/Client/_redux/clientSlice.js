import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryClientService } from "../../../../../services/categories/category.service";

export const createList = createAsyncThunk(
  "client/createList",
  async ({ url, values, oraganizeId }) => {
    const response = await categoryClientService.createList(
      url,
      values,
      oraganizeId
    );

    return handleResponse(response);
  }
);

export const createListTarget = createAsyncThunk(
  "client/createList",
  async ({ url, values, oraganizeId }) => {
    const response = await categoryClientService.createListTarget(
      url,
      values,
      oraganizeId
    );
    console.log("response---", response);
    return handleResponse(response);
  }
);

export const getList = createAsyncThunk(
  "client/getList",
  async ({ url, oraganizeId, dmsPage }) => {
    const response = await categoryClientService.getList(url, oraganizeId);
    return {
      ...handleResponse(response),
      dmsPage,
    };
  }
);

export const getListClient = createAsyncThunk(
  "client/getListClient",
  async ({ url, oraganizeId }) => {
    const response = await categoryClientService.getListClient(
      url,
      oraganizeId
    );
    return response.data.data;
  }
);

export const updateList = createAsyncThunk(
  "client/updateList",
  async ({ url, id, values, oraganizeId }) => {
    const response = await categoryClientService.updateList(
      url,
      id,
      values,
      oraganizeId
    );
    console.log("response---", response);
    return handleResponse(response);
  }
);

export const deleteList = createAsyncThunk(
  "client/deleteList",
  async ({ url, id, oraganizeId }) => {
    const response = await categoryClientService.deleteList(
      url,
      id,
      oraganizeId
    );
    return handleResponse(response);
  }
);

const updateState = (state, action) => {
  switch (action.payload.dmsPage) {
    // case 'categoryClientChanel':
    case "categoryClientChannel":
      state.channel = action.payload.data;
      return;
    case "categoryClientType":
      state.type = action.payload.data;
      return;
    case "categoryClientGroup":
      state.group = action.payload.data;
      return;
    case "categoryClientRegion":
      state.region = action.payload.data;
      return;
    default:
      return;
  }
};

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    data: [],
    channel: [],
    type: [],
    group: [],
    region: [],
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

      updateState(state, action);
    },

    [getList.pending]: (state) => {
      state.fetching = true;
    },
    [getList.rejected]: (state, action) => {
      state.error = action.payload;
      state.fetching = false;
    },
    [getList.fulfilled]: (state, action) => {
      state.data = action.payload;

      updateState(state, action);
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

      updateState(state, action);
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

function handleResponse(response) {
  if (response.data.code === -2) {
    return {
      code: -2,
      message: response.data.mess,
    };
  } else {
    return response.data;
  }
}

export default clientSlice.reducer;
