import {
  MOVIES_REQUESTING,
  MOVIES_REQUEST_SUCCESS,
  MOVIES_REQUEST_ERROR,
  MOVIE_DETAILS_REQUESTING,
  MOVIE_DETAILS_REQUEST_SUCCESS,
  MOVIE_DETAILS_REQUEST_ERROR,
  LIKE_REQUESTING,
  LIKE_REQUEST_SUCCESS,
  LIKE_REQUEST_ERROR,
  UNLIKE_REQUESTING,
  UNLIKE_REQUEST_SUCCESS,
  UNLIKE_REQUEST_ERROR,
} from '../constants';

  // Movies request actions
export const moviesRequest = (type, page) => ({
  type: MOVIES_REQUESTING,
  payload: {
    type,
    page,
  },
});

export const moviesRequestSuccess = data => ({
  type: MOVIES_REQUEST_SUCCESS,
  payload: {
    data,
  },
});

export const moviesRequestError = error => ({
  type: MOVIES_REQUEST_ERROR,
  error,
});

  // Movie details request actions
export const movieDetailsRequesting = id => ({
  type: MOVIE_DETAILS_REQUESTING,
  payload: {
    id,
  },
});

export const movieDetailsRequestSuccess = data => ({
  type: MOVIE_DETAILS_REQUEST_SUCCESS,
  payload: {
    data,
  },
});

export const movieDetailsRequestError = error => ({
  type: MOVIE_DETAILS_REQUEST_ERROR,
  error,
});

  // Like request actions
export const likeRequesting = (id, title) => ({
  type: LIKE_REQUESTING,
  id,
  title,
});

export const likeRequestSuccess = () => ({
  type: LIKE_REQUEST_SUCCESS,
});

export const likeRequestError = error => ({
  type: LIKE_REQUEST_ERROR,
  error,
});

  // Unlike request actions
export const unlikeRequesting = id => ({
  type: UNLIKE_REQUESTING,
  id,
});

export const unlikeRequestSuccess = () => ({
  type: UNLIKE_REQUEST_SUCCESS,
});

export const unlikeRequestError = error => ({
  type: UNLIKE_REQUEST_ERROR,
  error,
});
