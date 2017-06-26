import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { search } from '../../actions/search';
import styles from '../../styles/NavBar.scss';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchterm: '',
    };

    this.update = this.update.bind(this);
    this.search = this.search.bind(this);
  }

  update(event) {
    this.setState({
      searchterm: event.target.value,
    });
  }

  search(event) {
    event.preventDefault();
    this.props.search(this.state.searchterm);
    this.props.history.push(`/movies/search/${this.state.searchterm}`);
  }

  render() {
    return (
      <form onSubmit={this.search}>
        <span className={styles.icon}><i className="fa fa-search" aria-hidden="true" /></span>
        <input
          onChange={this.update}
          className={styles.search}
          type="text"
          value={this.state.searchterm}
          placeholder="Search movies"
        />
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  search: searchterm => dispatch(search(searchterm)),
});

export default withRouter(connect(null, mapDispatchToProps)(Search));

Search.propTypes = {
  search: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};
