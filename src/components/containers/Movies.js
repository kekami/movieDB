import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { moviesRequest } from '../../actions/movies';
import MovieList from '../presentation/MovieList';

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      type: this.props.location.pathname.split('/')[2],
    };

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    const { page, type } = this.state;
    this.props.moviesRequest(type, page);
  }

  previousPage() {
    const { page, type } = this.state;
    if (this.state.page > 1) {
      this.props.moviesRequest(type, page - 1);
      this.setState({
        page: page - 1,
      });
    }
  }

  nextPage() {
    const { page, type } = this.state;
    this.props.moviesRequest(type, page + 1);
    this.setState({
      page: page + 1,
    });
  }

  render() {
    const { page } = this.state;
    const { isRequesting, movies } = this.props;

    return (
      <MovieList
        isRequesting={isRequesting}
        previous={this.previousPage}
        next={this.nextPage}
        page={page}
        movies={movies}
      />
    );
  }
}

const mapStateToProps = state => ({
  isRequesting: state.movie.requesting,
  movies: state.movie.movies.results,
});

const mapDispatchToProps = dispatch => ({
  moviesRequest: (type, page) => dispatch(moviesRequest(type, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);

Movies.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  moviesRequest: PropTypes.func,
  isRequesting: PropTypes.bool,
  movies: PropTypes.array,
};
