import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  movieDetailsRequesting,
  likeRequesting,
  unlikeRequesting,
} from '../../actions/movies';
import styles from '../../styles/Movie.scss';

class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.location.pathname.split('/')[2],
    };

    this.goBack = this.goBack.bind(this);
    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
  }
  componentDidMount() {
    const { id } = this.state;
    this.props.movieDetailsRequesting(id);
  }

  goBack() {
    this.props.history.goBack();
  }

  like() {
    const currentMovie = this.props.movieDetails;
    this.props.likeRequesting(currentMovie.id, currentMovie.title);
  }

  unlike() {
    const currentMovie = this.props.movieDetails;
    this.props.unlikeRequesting(currentMovie.id);
  }

  render() {
    const currentMovie = this.props.movieDetails;
    if (this.props.isRequesting || !currentMovie) {
      return <h1>Loading</h1>;
    }

    const isLoggedIn = this.props.client.id !== undefined;
    let liked;
    if (this.props.client.likes) {
      if (this.props.client.likes.map(movie => movie.id).indexOf(currentMovie.id) !== -1) {
        liked = true;
      }
    }

    let button;
    if (isLoggedIn) {
      button = liked ?
        <button onClick={this.unlike}>Unlike</button> :
        <button onClick={this.like}>Like</button>;
    }

    return (
      <div>
        <button onClick={this.goBack}>Go Back</button>
        <div className={styles.container}>
          <img src={`https://image.tmdb.org/t/p/w320${currentMovie.poster_path}`} alt="" />
          <div className={styles.movieData}>
            <h1>{currentMovie.title}</h1>
            <p>{currentMovie.overview}</p>
            {button}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isRequesting: state.movie.requesting,
  movieDetails: state.movie.movieDetails,
  client: state.client,
});

const mapDispatchToProps = dispatch => ({
  movieDetailsRequesting: id => dispatch(movieDetailsRequesting(id)),
  likeRequesting: (id, title) => dispatch(likeRequesting(id, title)),
  unlikeRequesting: id => dispatch(unlikeRequesting(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);

Movie.propTypes = {
  client: PropTypes.shape({
    likes: PropTypes.array,
    id: PropTypes.string,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  movieDetailsRequesting: PropTypes.func,
  likeRequesting: PropTypes.func,
  unlikeRequesting: PropTypes.func,
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  movieDetails: PropTypes.object,
  isRequesting: PropTypes.bool,
};
