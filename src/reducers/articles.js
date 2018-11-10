import { createSelector } from "reselect";
import { ARTICLES_FETCHED, ARTICLES_SHOWED, ARTICLE_CREATED, ARTICLE_UPDATED, ARTICLE_DELETED } from "../types";

export default function articles(state = {}, action = {}) {
  switch (action.type) {
    case ARTICLES_FETCHED:
      return { ...state, ...action.data };
    case ARTICLES_SHOWED:
      return { ...state, ...action.data };
    case ARTICLE_CREATED:
      return { ...state, ...action.data };
    case ARTICLE_UPDATED:
      return { ...state, ...action.data };
    case ARTICLE_DELETED:
      return state;
    default:
      return state;
  }
}
