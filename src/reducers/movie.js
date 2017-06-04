import {
  MOVIES_REQUESTING,
  MOVIES_REQUEST_SUCCESS,
  MOVIES_REQUEST_ERROR,
  MOVIE_DETAILS_REQUESTING,
  MOVIE_DETAILS_REQUEST_SUCCESS,
  MOVIE_DETAILS_REQUEST_ERROR,
} from '../constants';

const initialState = {
  movies: {},
  requesting: false,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVIES_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: [],
      };

    case MOVIES_REQUEST_SUCCESS:
      return {
        ...state,
        movies: action.payload.data.movies,
        requesting: false,
        successful: true,
        messages: [{
          body: 'Movies awesomely fetched!',
          time: new Date(),
        }],
        errors: [],
      };

    case MOVIES_REQUEST_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat[{
          body: action.error.toString(),
          time: new Date(),
        }],
      };

    case MOVIE_DETAILS_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: [],
      };

    case MOVIE_DETAILS_REQUEST_SUCCESS:
      return {
        ...state,
        movieDetails: action.payload.data.details,
        requesting: false,
        successful: true,
        messages: [{
          body: 'Movies awesomely fetched!',
          time: new Date(),
        }],
        errors: [],
      };

    case MOVIE_DETAILS_REQUEST_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat[{
          body: action.error.toString(),
          time: new Date(),
        }],
      };

    default:
      return state;
  }
};

export default movieReducer;
