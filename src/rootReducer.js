import { combineReducers } from "redux";

import user from "./reducers/user";
import message from "./reducers/message";
import articles from "./reducers/articles";
import comments from "./reducers/comments";

export default combineReducers({
  user,
  message,
  articles,
  comments,
});
