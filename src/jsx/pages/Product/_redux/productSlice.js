import {createSlice} from "@reduxjs/toolkit";

const initialProductState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  productForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const ProductsSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getCustomerById
    ProductFetched: (state, action) => {
      const { task } = action.payload
      state.actionsLoading = false;
      state.listLoading = false;
      state.accountForEdit = task;
      state.error = null;
    },

    // findCustomers
    productsFetched: (state, action) => {
      const {  data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = data;
      state.totalCount = data.length;
    },
    // createCustomer
    productsCreated: (state, action) => {
      state.ewactionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.data);
    },
    // updateContact
    accountUpdated: (state, action) => {
      const { data } = action.payload
      const { entities } = state
      const index = entities.findIndex((item) => item._id === data._id)
      if (index !== -1) {
        const newList = [
          ...entities.slice(0, index),
          data,
          ...entities.slice(index+1)
        ]
        return {
          ...state,
          entities :newList
        }
      }
      state.error = null;
      state.actionsLoading = false;
      return {
        ...state
      }
    },
    // deleteCustomer
    customerDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteCustomers
    customersDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // customersUpdateState
    customersStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
