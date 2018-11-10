import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import InfoIcon from '@material-ui/icons/Info';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

import { showArticle, updateArticle, deleteArticle } from "../../actions/articles";

class ArticlePage extends React.Component {
  state = {
    article: null,
    open: false,
  };

  componentDidMount = () =>{
      this.onInit(this.props);
  }

  onInit = props => {
      this.handleGetArticle();
  };

  handleGetArticle = () => {
    this.props.showArticle(this.props.match.params.id).
      then(article => {
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
    this.props.deleteArticle(id).
      then(article => {
        this.props.history.push("/")
      }).catch(error => this.setState({ error: error }));
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

  render() {
    const { article } = this.state;
    const { message, classes, isAuthenticated, isAdmin } = this.props;

    return (
      <div>
        <Link to="/">Home Page</Link>
        <br/>
        { message.response && <h3 style={{ color: 'blue' }}>{message.response} </h3> }

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
              isAuthenticated && (isAdmin || article.is_owner) &&
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
  message: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    isAdmin: !!state.user.is_admin,
    message: state.message
  }
}

export default withRouter(withStyles(styles)(
  connect(mapStateToProps, { showArticle, updateArticle, deleteArticle })(ArticlePage))
);
