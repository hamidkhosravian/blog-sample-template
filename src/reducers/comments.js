import { COMMENTS_FETCHED, COMMENT_CREATED, COMMENT_UPDATED, COMMENT_DELETED } from "../types";

export default function articles(state = {}, action = {}) {
  switch (action.type) {
    case COMMENTS_FETCHED:
      return { ...state, ...action.data };
    case COMMENT_CREATED:
      return { ...state, ...action.data };
    case COMMENT_UPDATED:
      return { ...state, ...action.data };
    case COMMENT_DELETED:
      return state;
    default:
      return state;
  }
}
