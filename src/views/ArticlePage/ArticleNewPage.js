import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import ArticleForm from "./ArticleForm";

import { createArticle } from "../../actions/articles";

class ArticleNewPage extends React.Component {
  state = {
  };

  submit = data =>
    this.props.createArticle(data).then(() =>
      this.handleToBackView()
    );

  handleToBackView = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h1>Edit Article</h1>
        <ArticleForm submit={this.submit} cancel={this.handleToBackView}/>
        <br/>
      </div>
    )
  }
}

ArticleNewPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.object.isRequired,
  createArticle: PropTypes.func.isRequired
};

export default connect(null, { createArticle })(ArticleNewPage);
