import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import styles from '../../styles/MovieList.scss';

const MovieList = (props) => {
  const path = props.location.pathname.split('/')[2];
  let header;
  switch (path) {
    case 'popular':
      header = 'Popular Movies';
      break;
    case 'toprated':
      header = 'Top Rated Movies';
      break;
    case 'upcoming':
      header = 'Upcoming Movies';
      break;
    default:
      header = 'Search Results';
  }

  // if (props.isRequesting) {
  //   return (
  //     <div className={styles["movieList--loading"]}>
  //       <h1 className={styles.movieList__loading}>Loading</h1>
  //     </div>
  //   );
  // }

  return (
    <div className={styles.movieList}>
      {/*<h1 className={styles["movieList__header"]}>{header}</h1>*/}
      <nav className={styles["movieList__navigation"]}>
        <button onClick={props.previous} disabled={props.page < 2}>Previous</button>
        <button onClick={props.next}>Next</button>
      </nav>

      {
        props.isRequesting ? 
          <div className={styles["movieList--loading"]}>
            <h1 className={styles.movieList__loading}>Loading</h1>
          </div>
          :
          null
      }
      <div className={styles["movieList__list"]}>
        {props.movies && props.movies
          .filter(movie => movie.poster_path)
          .map(movie => (
            <div className={styles["movieList__movieCard"]} key={movie.id}>
              <Link to={`/movie/${movie.id}`}><img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt="Card" /></Link>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default withRouter(MovieList);

MovieList.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  isRequesting: PropTypes.bool,
  previous: PropTypes.func,
  next: PropTypes.func,
  movies: PropTypes.array,
  page: PropTypes.number,
};
