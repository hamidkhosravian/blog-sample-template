import api from "../api";
import {
  MESSAGE, COMMENTS_FETCHED, COMMENT_CREATED, COMMENT_UPDATED, COMMENT_DELETED
} from "../types";

// data.entities.comments
const commentsFetched = data => ({
  type: COMMENTS_FETCHED,
  data
});

const commentCreated = data => ({
  type: COMMENT_CREATED,
  data
});

const commentUpdated = data => ({
  type: COMMENT_UPDATED,
  data
});

const commentDeleted = () => ({
  type: COMMENT_DELETED
});

export const showMessage = (message) => ({
  type: MESSAGE,
  message
});

export const commentsList = (article_id, pagination) => dispatch =>
  api.comments
    .index(article_id, pagination)
    .then(comments => dispatch(commentsFetched(comments)));

export const createComment = (article_id, data) => dispatch =>
  api.comments
    .create(article_id, data)
    .then(comment => dispatch(commentCreated(comment)));

export const updateComment = (article_id, id, data) => dispatch =>
  api.comments
    .update(article_id, id, data)
    .then(comment => dispatch(commentUpdated(comment)));

export const deleteComment = (article_id, id) => dispatch =>
  api.comments
    .delete(article_id, id)
    .then(comment => dispatch(commentDeleted));
