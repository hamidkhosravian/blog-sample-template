import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CommentForm from './CommentForm';
import { commentsList, createComment, updateComment } from "../../actions/comments";

class CommentPage extends React.Component {

    create_submit = data =>
      this.props.createComment(this.props.article_id, data).then((comment) => {
        const comments = this.state.comments
        comments.unshift(comment.data);
        this.setState({ comments: comments });
    });

    update_submit = (i, data) =>
      this.props.updateComment(this.props.article_id, this.state.data.id, data).then((comment) => {
        this.state.comments[this.state.comment_index] = comment.data;
        const comments = this.state.comments;
        this.setState({ comments: comments });
    });

  state = {
    page: 1,
    limit: 5,
    article_id: null,
    comments: [],
    comment_index: null
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
      });
  }

  updateCommentState = (comments) => {
    this.setState({ comments: comments.data });
  }
  //
  // handleUpdateComment = (index, comment) => {
  //   this.setState({ comment_index: index, comment_form: <CommentForm submit={this.update_submit} comment={comment}/> });
  // }

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
              <div>
                <Button color="primary" className={classes.button} onClick={e => this.handleUpdateComment(index, comment)}>
                  Update
                </Button>

                <Button color="secondary" onClick={this.props.cancel} className={classes.button}>
                  Cancel
                </Button>
              </div>
            }
            </div>
          ))}
        </List>
      </div>
    )
  }

  render() {
    const { comments } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <div>
        {
          comments.length !== 0  ?
          this.comments_index()
          :
          <h3>Comments is empty.</h3>
        }
        {
          isAuthenticated &&
          <CommentForm submit={this.create_submit} />
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
  commentsList: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired
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

export default withStyles(styles)(connect(mapStateToProps, { commentsList, createComment, updateComment })(CommentPage));
