import api from '../api';
import { USER_LOGGED_IN, MESSAGE } from '../types';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const showMessage = (message) => ({
  type: MESSAGE,
  message
});

export const sign_up = (data) => (dispatch) =>
  api.user.sign_up(data).then(message => {
    dispatch(showMessage(message.data))
  }
);

export const sign_in = (data) => (dispatch) =>
  api.user.sign_in(data)
  .then(user => {
    localStorage.token = user.token.token;
    localStorage.expire_at = user.token.expire_at;
    localStorage.email = user.email;
    localStorage.admin = user.is_admin;
    setAuthorizationHeader(user.token.token);
    dispatch(userLoggedIn(user))
});
