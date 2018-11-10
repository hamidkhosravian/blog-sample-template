import api from "../api";
import {
  MESSAGE, ARTICLES_FETCHED, ARTICLES_SHOWED,
  ARTICLE_CREATED, ARTICLE_UPDATED, ARTICLE_DELETED
} from "../types";

// data.entities.articles
const articlesFetched = data => ({
  type: ARTICLES_FETCHED,
  data
});

const articleShowed = data => ({
  type: ARTICLES_SHOWED,
  data
});

const articleCreated = data => ({
  type: ARTICLE_CREATED,
  data
});

const articleUpdated = data => ({
  type: ARTICLE_UPDATED,
  data
});

const articleDeleted = () => ({
  type: ARTICLE_DELETED
});

export const showMessage = (message) => ({
  type: MESSAGE,
  message
});

export const articlesList = (pagination) => dispatch =>
  api.articles
    .index(pagination)
    .then(articles => dispatch(articlesFetched(articles)));

export const showArticle = (id) => dispatch =>
  api.articles
    .show(id)
    .then(articles => dispatch(articleShowed(articles)))
    .catch(message => {
      dispatch(showMessage({response: "Article not found!"}))
    });

export const createArticle = data => dispatch =>
  api.articles
    .create(data)
    .then(article => dispatch(articleCreated(article)));

export const updateArticle = (id, data) => dispatch =>
  api.articles
    .update(id, data)
    .then(article => dispatch(articleUpdated(article)));

export const deleteArticle = data => dispatch =>
  api.articles
    .delete(data)
    .then(article => dispatch(articleDeleted));
