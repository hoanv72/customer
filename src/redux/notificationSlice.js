import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    type: 'success',
    message: 'This is the notification. Currently, it has some bugs, I will fix it soon',
    show: false,
    duration: 3000,
  },
  reducers: {
    setNotification: (state, action) => {
      return { ...action.payload };
    },
  },
  extraReducers: {},
});
// Action creators are generated for each case reducer function
export const { setNotification } = notificationSlice.actions;
const { reducer: authReducer } = notificationSlice;
export default authReducer;
