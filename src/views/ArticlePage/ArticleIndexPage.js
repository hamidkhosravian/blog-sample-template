import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import { articlesList, createArticle } from "../../actions/articles";

class ArticleIndexPage extends React.Component {
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }

  state = {
    page: 1,
    limit: 10,
    articles: []
  }

  componentDidMount = () =>{
      this.onInit(this.props);
  }

  onInit = props => {
      this.setState({ page: this.state.page });
      this.handleGetAllIndex(this.state.page);
  };

  handleGetAllIndex = (page) => {
    this.props.articlesList({limit: this.state.limit, page: page})
      .then(articles => {
        this.updateArticleState(articles)
      });
  }

  updateArticleState = (articles) => {
    this.setState({ articles: articles.data });
  }

  routeChange = (id) => {
    this.props.history.push(`articles/${id}`);
  }

  articlePage = () => this.props.history.push('/article/new')

  articles_index = () => {
    const { articles } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <GridList className={classes.gridList}>
          {articles.map(article => (
            <GridListTile onClick={e => this.routeChange(article.id)} key={article.id}>
              <GridListTileBar
                className={classes.gridList}
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
    const { isAuthenticated } = this.props;

    return (
      <div>

        { isAuthenticated &&
          <Button variant="contained" onClick={this.articlePage}>
            New
          </Button>
        }

        {
          articles.length !== 0  ?
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
  articlesList: PropTypes.func.isRequired,
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
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
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

export default withRouter(withStyles(styles)(connect(mapStateToProps, { articlesList, createArticle })(ArticleIndexPage)));
