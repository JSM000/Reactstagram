import { combineReducers } from "redux";
import auth from "./auth";
import profileDB from "./profileDB";

const rootReducer = combineReducers({
  auth,
  profileDB,
});

export default rootReducer;
