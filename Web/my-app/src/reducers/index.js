import { combineReducers } from "redux";
import logInStatusReducer from "./logInStatusReducer";


const rootReducer = combineReducers({
  logInStatusReducer,

});

export default rootReducer;