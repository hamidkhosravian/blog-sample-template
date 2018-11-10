import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import InfoIcon from '@material-ui/icons/Info';
import GridList from '@material-ui/core/GridList';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { fetchArticles } from "../../actions/articles";

class ArticleIndexPage extends React.Component {

  state = {
    page: 1,
    limit: 10,
    articles: []
  }

  componentDidMount = () =>{
      this.onInit(this.props);
  }

  onInit = props => {
      this.setState({ page: this.state.page, fetching: true });
      this.handleGetAllIndex(this.state.page);
  };

  handleGetAllIndex = (page) => {
    fetchArticles({limit: this.state.limit, page: page}).
      then(articles => {
        this.updateArticleState(articles)
      });
  }

  updateArticleState = (articles) => {
      this.setState({ articles: articles });
  }

  articles_index = () => {
    const { articles } = this.state;
    const { isAdmin, classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">Article List</ListSubheader>
          </GridListTile>
          {articles.map(article => (
            <GridListTile key={article.id}>
              <img src={article.image } alt={article.title} />
              <GridListTileBar
                title={article.title}
                subtitle={<span>by: {article.created_by}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }

  render() {
    const { articles } = this.state;
    const { message, isAuthenticated } = this.props;

    return (
      <div>
        {
          articles.length === 0  ?
          this.articles_index()
          :
          <h3>Articles is empty.</h3>
        }
      </div>
    )
  }
}

ArticleIndexPage.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchArticles: PropTypes.func.isRequired,
  message: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    isAdmin: state.user.admin,
    message: state.message
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

export default withStyles(styles)(connect(mapStateToProps, { fetchArticles })(ArticleIndexPage));
