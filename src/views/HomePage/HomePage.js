import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  render() {
    const { message, isAuthenticated } = this.props;

    return (
      <div>
        { message.response && <h3 style={{color: 'green'}}>{message.response} </h3> }
        <h1>HomePage</h1>
        { !isAuthenticated &&
          <div>
            <div>
              <Link style={{margin: 8}} to="/sign_in" >Sign In</Link>
              <Link style={{margin: 8}} to="/sign_up" >Sign Up</Link>
            </div>
          </div>
        }
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
