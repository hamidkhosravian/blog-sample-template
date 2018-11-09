import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types'

import GuestRoute from "./routes/GuestRoute.js";

import HomePage from "./views/HomePage/HomePage.js";
import SignUpPage from "./views/SignUpPage/SignUpPage.js";
import SignInPage from "./views/SignInPage/SignInPage.js";

const App = ({ location }) => (
  <div>
    <Route location={location} path="/" exact component={HomePage}></Route>
    <GuestRoute location={location} path="/sign_up" exact component={SignUpPage}></GuestRoute>
    <GuestRoute location={location} path="/sign_in" exact component={SignInPage}></GuestRoute>
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App;
