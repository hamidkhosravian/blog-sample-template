import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import SignUpForm from "./SignUpForm";

import { sign_up } from "../../actions/authentication";

class SignUpPage extends React.Component {
  submit = data =>
    this.props.sign_up(data).then(() => this.props.history.push("/"));

  render() {
    return (
      <div>
        <h1>Sign Up</h1>
        <SignUpForm submit={this.submit} />
        <br/>
        <Link to="/sign_in" >Sign In</Link>
      </div>
    )
  }
}

SignUpPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  sign_up: PropTypes.func.isRequired
};

export default connect(null, { sign_up })(SignUpPage);
