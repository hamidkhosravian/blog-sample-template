import React from 'react';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, BrowserRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import rootReducer from './rootReducer';
import * as serviceWorker from './serviceWorker';
import { userLoggedIn } from "./actions/authentication";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";

const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.token){
  const user = {
   token: localStorage.token
  };
  setAuthorizationHeader(localStorage.token);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App}/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
