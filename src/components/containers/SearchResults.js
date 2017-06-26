import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { searchRequesting } from '../../actions/search';
import MovieList from '../presentation/MovieList';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    const { page } = this.state;
    this.props.searchRequesting(this.props.searchterm, page);
  }

  componentWillReceiveProps(nextProps) {
    const { page } = this.state;
    if (nextProps.searchterm !== this.props.searchterm) {
      this.props.searchRequesting(nextProps.searchterm, page);
    }
  }

  previousPage() {
    const { page } = this.state;
    if (this.state.page > 1) {
      this.props.searchRequesting(this.props.searchterm, page - 1);
      this.setState({
        page: page - 1,
      });
    }
  }

  nextPage() {
    const { page } = this.state;
    this.props.searchRequesting(this.props.searchterm, page + 1);
    this.setState({
      page: page + 1,
    });
  }

  render() {
    const { page } = this.state;
    const { isRequesting } = this.props;

    return (
      <MovieList
        isRequesting={isRequesting}
        previous={this.previousPage}
        next={this.nextPage}
        page={page}
        movies={this.props.searchResults}
      />
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.search.searchResults,
  isRequesting: state.search.requesting,
  searchterm: state.search.searchterm,
});

const mapDispatchToProps = dispatch => ({
  searchRequesting: (searchterm, page) => dispatch(searchRequesting(searchterm, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);

SearchResults.propTypes = {
  searchRequesting: PropTypes.func,
  isRequesting: PropTypes.bool,
  searchResults: PropTypes.Requireable,
  searchterm: PropTypes.string,
};
