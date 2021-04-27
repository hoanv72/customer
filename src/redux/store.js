import { configureStore } from "@reduxjs/toolkit";
import clientReducer from "../jsx/pages/Categories/Client/_redux/clientSlice";
import customerReducer from "../jsx/pages/Client/_redux/customerSlice";
import personnelReducer from "../jsx/pages/Organization/_redux/organizationSlice";
import authReducer from "./authSlice";
import notificationReducer from "./notificationSlice";
import { reducer as toastrReducer } from "react-redux-toastr";
const store = configureStore({
  reducer: {
    client: clientReducer,
    auth: authReducer,
    customer: customerReducer,
    personnel: personnelReducer,
    notification: notificationReducer,
    toastr: toastrReducer,
  },
});

export default store;
