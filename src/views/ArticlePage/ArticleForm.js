import React from "react";
import PropTypes from "prop-types";
import Validator from "validator";
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

class ArticleForm extends React.Component {
  state = {
      article: {
        title: "",
        body: ""
      },
      errors: {},
      open: true
  };

  componentDidMount = () =>{
    if(this.props.article){
      this.setState({article: this.props.article})
    }
  }

  onChange = e =>
    this.setState({
      article: { ...this.state.article, [e.target.name]: e.target.value }
  });

  onSubmit = () => {
    const errors = this.validate(this.state.article);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.props
        .submit(this.state.article)
        .catch(err =>
          this.setState({ errors: err.response.data, open: true })
        );
    }
  };

  validate = article => {
    const errors = {};
    if (!article.title) errors.title = "Please enter your title";
    if (!article.body) errors.body = "Please enter your body";
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
    const { article, errors } = this.state;
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
              id="title" label="Title" error={!!errors.title}
              name="title" autoComplete="title" margin="normal"
              variant="outlined" fullWidth value={article.title}
              onChange={this.onChange}/>
            {
              errors.title &&
              <FormHelperText style={{ color: 'red' }}>{errors.title}</FormHelperText>
            }
          </FormControl>
        </div>
        <div>
          <FormControl>
            <TextField
              id="body" label="Body" error={!!errors.body}
              multiline name="body" autoComplete="body" margin="normal"
              variant="outlined" value={article.body} fullWidth
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

          <Button variant="contained" color="secondary" onClick={this.props.cancel} className={classes.button}>
            Cancel
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

ArticleForm.propTypes = {
  submit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  article: PropTypes.object
};

export default withRouter(withStyles(styles)(ArticleForm));
