import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import CommentPage from "../CommentPage/CommentPage";

import { showArticle, updateArticle, deleteArticle } from "../../actions/articles";

class ArticlePage extends React.Component {
  state = {
    article: null,
    open: false,
    openDialog: true
  };

  componentDidMount = () =>{
      this.onInit(this.props);
  }

  onInit = props => {
      this.handleGetArticle();
  };

  handleGetArticle = () => {
    this.props.showArticle(this.props.match.params.id)
      .then(article => {
        this.updateArticleState(article)
      }).catch(error => this.props.history.push('/'));
  }

  handleUpdateArticle = () => {
    const id = this.props.match.params.id
    this.props.history.push({
      pathname: `/articles/${id}/edit`,
      article: this.state.article
    })
  }

  handleDeleteArticle = () => {
    const id = this.props.match.params.id
    this.props.deleteArticle(id)
      .then(article => {
        this.props.history.push("/")
      }).catch(error => {
        this.setState({ open: false, openDialog: true, errors: error.response.data })
      });
  }

  updateArticleState = (article) => {
    this.setState({ article: article.data });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleCloseDialog = (event, reason) => {
    this.setState({ openDialog: false });
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
          open={this.state.openDialog}
          autoHideDuration={6000}
          onClose={this.handleClose}
          message={errors.response[0]}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleCloseDialog}
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
    const { message, classes, isAuthenticated, isAdmin } = this.props;

    return (
      <div>
        <Link to="/">Home Page</Link>
        <br/>
        <div>
          { message && <h3 style={{ color: 'blue' }}>{message.response} </h3> }
        </div>

        <div>
          { errors && this.showErrorResponse() }
        </div>

        {
          article &&
          <div>
            <h2>{article.title}</h2>
            <br/>
            <span>{article.body}</span>
            <br/>
            <span>created at: {article.created_at}</span>
            <br/>
            <span>created by: {article.created_at}</span>
            {
              isAuthenticated && (JSON.parse(isAdmin) === true || article.is_owner) &&
              <div>
                <Button variant="contained" color="primary" onClick={this.handleUpdateArticle} className={classes.button}>
                  Edit
                  <SaveIcon className={classes.rightIcon} />
                </Button>

                <Button variant="contained" color="secondary" onClick={this.handleClickOpen} className={classes.button}>
                  Delete
                  <DeleteIcon className={classes.rightIcon} />
                </Button>

                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this Article?"}</DialogTitle>
                  <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleDeleteArticle} color="primary" autoFocus>
                      Yes
                    </Button>
                  </DialogActions>
              </Dialog>
              </div>
            }
            <br/>
            <CommentPage article_id={article.id}/>
          </div>
        }
      </div>
    )
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

ArticlePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  updateArticle: PropTypes.func.isRequired,
  deleteArticle: PropTypes.func.isRequired,
  showArticle: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    isAdmin: state.user.is_admin,
    message: state.message
  }
}

export default withRouter(withStyles(styles)(
  connect(mapStateToProps, { showArticle, updateArticle, deleteArticle })(ArticlePage))
);
