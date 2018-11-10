import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import SignInForm from "./SignInForm";

import { sign_in } from "../../actions/authentication";

class SignInPage extends React.Component {
  submit = data =>
    this.props.sign_in(data).then(() => this.props.history.push("/"));

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <SignInForm submit={this.submit} />
        <br/>
        <Link to="/sign_up" >Sign up</Link>
      </div>
    )
  }
}

SignInPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  sign_in: PropTypes.func.isRequired
};

export default connect(null, { sign_in })(SignInPage);
