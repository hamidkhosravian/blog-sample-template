import api from "../api";
import {
  ARTICLES_FETCHED, ARTICLES_SHOWED,
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

export const fetchArticles = (pagination) => dispatch =>
  api.articles
    .index(pagination)
    .then(articles => dispatch(articlesFetched(articles)));

export const showArticle = () => dispatch =>
  api.articles
    .show()
    .then(articles => dispatch(articleShowed(articles)));

export const createArticle = data => dispatch =>
  api.articles
    .create(data)
    .then(article => dispatch(articleCreated(article)));

export const updateArticle = data => dispatch =>
  api.articles
    .update(data)
    .then(article => dispatch(articleUpdated(article)));

export const deleteArticle = data => dispatch =>
  api.articles
    .delete(data)
    .then(article => dispatch(articleDeleted));
