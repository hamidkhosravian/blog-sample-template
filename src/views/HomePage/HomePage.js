import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

class HomePage extends React.Component {
  render() {
    const { message } = this.props;

    return (
      <div>
        { message.response && <h3 style={{color: 'green'}}>{message.response} </h3> }
        <h1>HomePage</h1>
      </div>
    )
  }
}

HomePage.propTypes = {
  message: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    message: state.message
  }
}

export default connect(mapStateToProps)(HomePage)
