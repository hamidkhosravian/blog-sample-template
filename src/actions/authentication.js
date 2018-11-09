import api from '../api';
import { USER_LOGGED_IN, MESSAGE } from '../types';

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
