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

export const commentsList = (pagination) => dispatch =>
  api.comments
    .index(pagination)
    .then(comments => dispatch(commentsFetched(comments)));

export const createComment = data => dispatch =>
  api.comments
    .create(data)
    .then(comment => dispatch(commentCreated(comment)));

export const updateComment = (id, data) => dispatch =>
  api.comments
    .update(id, data)
    .then(comment => dispatch(commentUpdated(comment)));

export const deleteComment = data => dispatch =>
  api.comments
    .delete(data)
    .then(comment => dispatch(commentDeleted));
