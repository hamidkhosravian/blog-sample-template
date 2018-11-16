import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import CommentForm from './CommentForm';
import { commentsList, createComment, deleteComment} from "../../actions/comments";

class CommentPage extends React.Component {

  submit = data =>
    this.props.createComment(this.props.article_id, data).then((comment) => {
      const comments = this.state.comments
      comments.unshift(comment.data);
      this.setState({ comments: comments });
  }).catch(error => {
    this.setState({ open: false, openDialog: true, errors: error.response.data })
  });

  state = {
    page: 1,
    limit: 5,
    open: false,
    openDialog: true,
    article_id: null,
    comment_id: null,
    comment_index: null,
    comments: []
  }

  componentDidMount = () =>{
      this.onInit(this.props);
  }

  onInit = props => {
      this.setState({ page: this.state.page });
      this.handleGetAllIndex(this.state.page);
  };

  handleGetAllIndex = (page) => {
    this.props.commentsList(this.props.article_id, {limit: this.state.limit, page: page})
      .then(comments => {
        this.updateCommentState(comments)
      }).catch(error => {
        this.setState({ open: false, openDialog: true, errors: error.response.data })
      });
  }

  handleDeleteComment = () => {
    this.props.deleteComment(this.props.article_id, this.state.comment_id)
      .then(() => {
        const comments = this.state.comments
        comments.splice( this.state.comment_index, 1 );
        this.handleClose();
        this.setState({ comments: comments });
      }).catch(error => {
        this.setState({ open: false, openDialog: true, errors: error.response.data, comment_id: null, comment_index: null })
      });
  }

  updateCommentState = (comments) => {
    this.setState({ comments: comments.data });
  }

  openDeleteDialog = (id, index) => {
    this.setState({ open: true, comment_id: id, comment_index: index });
  };

  handleClose = () => {
    this.setState({ open: false, comment_id: null, comment_index: null });
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

  comments_index = () => {
    const { comments } = this.state;
    const { classes, isAuthenticated, isAdmin } = this.props;

    return (
      <div className={classes.root}>
        <List className={classes.gridList}>
          {comments.map((comment, index) => (
            <div style={{margin: 8}} key={comment.id}>
              <ListItem>
                <ListItemText primary={comment.body} secondary={`comment by: ${comment.created_by}`} />
              </ListItem>

            {
              isAuthenticated && (JSON.parse(isAdmin) === true || comment.is_owner) &&
              <Button color="secondary" onClick={e => this.openDeleteDialog(comment.id, index)} className={classes.button}>
                Delete
              </Button>
            }

            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this Comment?"}</DialogTitle>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleDeleteComment} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>

            </div>
          ))}
        </List>
      </div>
    )
  }

  render() {
    const { comments, errors } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <div>
        <div>
          { errors && this.showErrorResponse() }
        </div>

        {
          comments.length !== 0  ?
          this.comments_index()
          :
          <h3>Comments is empty.</h3>
        }
        {
          isAuthenticated &&
          <CommentForm submit={this.submit} />
        }
      </div>
    )
  }
}

CommentPage.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  commentsList: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired,
  createComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    isAdmin: state.user.is_admin,
    message: state.message
  }
}

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: 24
  },
  gridList: {
    width: '100%',
    height: '100%'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

export default withStyles(styles)(connect(mapStateToProps, { commentsList, createComment, deleteComment})(CommentPage));
