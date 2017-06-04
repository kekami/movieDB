import {
  LIKE_REQUESTING,
  LIKE_REQUEST_SUCCESS,
  LIKE_REQUEST_ERROR,
} from '../constants';

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case LIKE_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [{ body: 'Likeing...', time: new Date() }],
        errors: [],
      };

    // Successful?  Reset the login state.
    case LIKE_REQUEST_SUCCESS:
      return {
        errors: [],
        messages: [],
        requesting: false,
        successful: true,
      };

    // Append the error returned from our api
    // set the success and requesting flags to false
    case LIKE_REQUEST_ERROR:
      return {
        errors: state.errors.concat([{
          body: action.error.toString(),
          time: new Date(),
        }]),
        messages: [],
        requesting: false,
        successful: false,
      };

    default:
      return state;
  }
};

export default likeReducer;
