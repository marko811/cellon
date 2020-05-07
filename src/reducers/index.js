import { combineReducers } from "redux";
import commonReducer from "./commonReducer";
import authReducer from "./auth";
import serviceReducer from "./service";

export default combineReducers({
  auth: authReducer,
  service: serviceReducer,
  commonReducer,
});
