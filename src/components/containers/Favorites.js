import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { unlikeRequesting } from '../../actions/movies';
import styles from '../../styles/Favorites.scss';

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.unlike = this.unlike.bind(this);
  }

  unlike(id) {
    this.props.unlikeRequesting(id);
  }

  render() {
    const { client } = this.props;

    if (client.id === undefined) {
      return <Redirect to="/login" />;
    }

    return (
      <ul className={styles.favorites}>
        {client.likes.map(movie => (
          <li className={styles.favorite} key={movie.id}>
            <span className={styles.title}>{movie.title}</span>
            <button onClick={() => this.unlike(movie.id)}>Unlike</button>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  client: state.client,
});


const mapDispatchToProps = dispatch => ({
  unlikeRequesting: id => dispatch(unlikeRequesting(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);

Favorites.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.string,
  }),
  unlikeRequesting: PropTypes.func,
  // loginRequest: PropTypes.func,
  // login: PropTypes.shape({
  //   requesting: PropTypes.bool,
  //   successful: PropTypes.bool,
  //   messages: PropTypes.array,
  //   errors: PropTypes.array,
  // }),
};
