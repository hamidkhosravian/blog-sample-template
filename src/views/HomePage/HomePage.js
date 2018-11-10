import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ArticleIndexPage from '../ArticlePage/ArticleIndexPage';

class HomePage extends React.Component {
  render() {
    const { message, isAuthenticated } = this.props;

    return (
      <div>
        { message.response && <h3 style={{color: 'green'}}>{message.response} </h3> }
        <h1 style={{margin: 4}}>HomePage</h1>
        { !isAuthenticated &&
          <div>
            <div>
              <Button style={{margin: 4}} variant="contained" color="primary" href="/sign_in">
                Sign In
              </Button>
              <Button style={{margin: 4}} variant="contained" color="secondary" href="/sign_up">
                Sign In
              </Button>
            </div>
          </div>
        }

        <div style={{margin: 24}}>
          <ArticleIndexPage />
        </div>
      </div>
    )
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  message: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    message: state.message
  }
}

export default connect(mapStateToProps)(HomePage)
