import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from '../services/user.service';

function handleToken() {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  if (user === null) {
    return false;
  }
  if (user.oraganize === undefined) {
    localStorage.removeItem('user');
    return false;
  }

  return true;
}

function handleInitialId() {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  if (user === null) {
    return null;
  }
  if (user.oraganize === undefined) {
    localStorage.removeItem('user');
    return null;
  }

  return user.oraganize[0].id;
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }) => {
    const response = await userService.login(username, password);
    return response;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await userService.logout(
    JSON.parse(localStorage.getItem('user')).token
  );
  return response;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    current: {},
    loading: false,
    loggingIn: false,
    error: '',
    loggedIn: handleToken(),
    organizationId: handleInitialId(),
  },
  reducers: {
    changeOrganizationId: (state, action) => {
      state.organizationId = action.payload.organizationId;
    },
  },
  extraReducers: {
    // login
    [login.pending]: (state) => {
      state.loggingIn = true;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload.data));
      state.current = action.payload;
      state.organizationId = action.payload.data.oraganize[0].id;
      state.loading = false;
      state.loggedIn = true;
      state.error = '';
    },

    // logout
    [logout.rejected]: (state, action) => {
      state.loading = false;
      state.loggedIn = false;
      state.error = '';
      localStorage.removeItem('user');
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false;
      state.loggedIn = false;
      state.error = '';
      localStorage.removeItem('user');
    },
  },
});
// Action creators are generated for each case reducer function
export const { changeOrganizationId } = authSlice.actions;
const { reducer: authReducer } = authSlice;
export default authReducer;
