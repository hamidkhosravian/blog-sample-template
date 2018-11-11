import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CommentForm from './CommentForm';
import { commentsList, createComment } from "../../actions/comments";

class CommentPage extends React.Component {
  state = {
    page: 1,
    limit: 5,
    article_id: null,
    comments: []
  }

  submit = data =>
    this.props.createComment(this.props.article_id, data).then((comments) => {
      this.state.comments.unshift(comments.data.comments[comments.length-1])
  });

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

  comments_index = () => {
    const { comments } = this.state;
    const { classes, isAuthenticated } = this.props;

    return (
      <div className={classes.root}>
        <List className={classes.gridList}>
          {comments.map(comment => (
            <ListItem key={comment.id}>
              <ListItemText primary={comment.body} secondary={`comment by: ${comment.created_by}`} />
            </ListItem>
          ))}
        </List>

        <CommentForm submit={this.submit} />
      </div>
    )
  }

  render() {
    const { comments } = this.state;
    console.log(comments);
    return (
      <div>
        {
          comments.length !== 0  ?
          this.comments_index()
          :
          <h3>Comments is empty.</h3>
        }
      </div>
    )
  }
}

CommentPage.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  commentsList: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
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

export default withStyles(styles)(connect(mapStateToProps, { commentsList, createComment })(CommentPage));
