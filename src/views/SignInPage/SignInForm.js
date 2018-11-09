import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";

import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class SignInForm extends React.Component {
  state = {
      data: {
        email: "",
        password: ""
      },
      errors: {},
      open: true
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
  });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data, open: true })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Email is wrong";
    if (!data.password) errors.password = "Please enter your password";
    return errors;
  };

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  showErrorResponse = () => {
    const { errors } = this.state;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={errors.response[0]}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }

  render() {
    const { data, errors } = this.state;

    return (
      <div>
        {
          errors.response &&
          this.showErrorResponse()
        }
        <div>
          <FormControl>
            <TextField
              id="email" label="Email" error={!!errors.email}
              type="email" name="email" autoComplete="email" margin="normal"
              variant="outlined"
              onChange={this.onChange}/>
            {
              errors.email &&
              <FormHelperText style={{ color: 'red' }}>{errors.email}</FormHelperText>
            }
          </FormControl>
        </div>
        <div>
          <FormControl>
            <TextField
              id="password" label="Password" error={!!errors.password}
              type="password" name="password" autoComplete="password" margin="normal"
              variant="outlined" value={data.password}
              onChange={this.onChange}/>
            {
              errors.password &&
              <FormHelperText style={{ color: 'red' }}>{errors.password}</FormHelperText>
            }
          </FormControl>
        </div>
        <br/>
        <div>
          <Button variant="contained" color="primary" onClick={this.onSubmit}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }
}

SignInForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignInForm;
