import { combineReducers } from "redux";
import userReducer from "./user";
import studentsReducer from "./students";

export default combineReducers({
  user: userReducer,
  students: studentsReducer,
});
