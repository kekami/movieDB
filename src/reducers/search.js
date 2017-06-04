import {
  SEARCH,
  SEARCH_REQUESTING,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_REQUEST_ERROR,
} from '../constants';

const initialState = {
  searchResults: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        searchterm: action.payload.searchterm,
      };

    case SEARCH_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [{ body: 'Logging in...', time: new Date() }],
        errors: [],
      };

    case SEARCH_REQUEST_SUCCESS:
      return {
        ...state,
        searchResults: action.payload.data.results.results,
        requesting: false,
        successful: true,
        messages: [{
          body: 'Movies awesomely fetched!',
          time: new Date(),
        }],
        errors: [],
      };

    case SEARCH_REQUEST_ERROR:
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

export default searchReducer;
