import { combineReducers } from "redux";

import user from "./reducers/user";
import message from "./reducers/message";

export default combineReducers({
  user,
  message
});
