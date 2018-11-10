import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types'

import UserRoute from "./routes/UserRoute";
import GuestRoute from "./routes/GuestRoute";

import HomePage from "./views/HomePage/HomePage";
import SignUpPage from "./views/SignUpPage/SignUpPage";
import SignInPage from "./views/SignInPage/SignInPage";
import ArticleIndexPage from "./views/ArticlePage/ArticleIndexPage";

const App = ({ location }) => (
  <div>
    <Route location={location} path="/" exact component={HomePage}></Route>
    <GuestRoute location={location} path="/sign_up" exact component={SignUpPage}></GuestRoute>
    <GuestRoute location={location} path="/sign_in" exact component={SignInPage}></GuestRoute>
    <Route location={location} path="/articles" exact component={ArticleIndexPage}></Route>
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default App;
