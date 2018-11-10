import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import ArticleForm from "./ArticleForm";

import { updateArticle } from "../../actions/articles";

class ArticleEditPage extends React.Component {
  state = {
  };

  submit = data =>
    this.props.updateArticle(this.props.match.params.id, data).then(() =>
      this.handleToBackView()
    );

  handleToBackView = () => {
    const { id } = this.props.match.params
    this.props.history.push(`/articles/${id}`)
  }

  render() {
    const { article } = this.props.location

    return (
      <div>
        <h1>Edit Article</h1>
        <ArticleForm submit={this.submit} cancel={this.handleToBackView} article={article}/>
        <br/>
      </div>
    )
  }
}

ArticleEditPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  location: PropTypes.object.isRequired,
  updateArticle: PropTypes.func.isRequired
};

export default connect(null, { updateArticle })(ArticleEditPage);
