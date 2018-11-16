import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';

class CommentForm extends React.Component {
  state = {
      comment: {
        body: ""
      },
      errors: {},
      open: true
  };

  componentDidMount = () =>{
    if(this.props.comment){
      console.log(this.props.comment);
      this.setState({comment: this.props.comment})
    }
  }

  onChange = e =>
    this.setState({
      comment: { ...this.state.comment, [e.target.name]: e.target.value }
  });

  onSubmit = () => {
    const errors = this.validate(this.state.comment);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      const comment = this.state.comment
      this.setState({ comment: { body: "" } })

      this.props
        .submit(comment)
        .catch(err =>
          this.setState({ errors: err.response.data, open: true })
        );
    }
  };

  validate = comment => {
    const errors = {};
    if (!comment.body) errors.body = "Please enter your body";
    return errors;
  };

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  showErrorResponse = () => {
    const { errors } = this.state;

    return (
      <div style={{width: '100%'}}>
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
    const { comment, errors } = this.state;
    const { classes } = this.props;

    return (
      <div>
        {
          errors.response &&
          this.showErrorResponse()
        }
        <div>
          <FormControl>
            <TextField
              id="body" label="Body" error={!!errors.body}
              multiline name="body" autoComplete="body" margin="normal"
              variant="outlined" value={comment.body} fullWidth
              onChange={this.onChange}/>
            {
              errors.body &&
              <FormHelperText style={{ color: 'red' }}>{errors.body}</FormHelperText>
            }
          </FormControl>
        </div>
        <br/>
        <div>
          <Button variant="contained" color="primary" className={classes.button} onClick={this.onSubmit}>
            Save
            <SaveIcon className={classes.rightIcon} />
          </Button>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
});

CommentForm.propTypes = {
  submit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  comment: PropTypes.object
};

export default withRouter(withStyles(styles)(CommentForm));
