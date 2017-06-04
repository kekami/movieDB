import {
  SEARCH,
  SEARCH_REQUESTING,
  SEARCH_REQUEST_SUCCESS,
  SEARCH_REQUEST_ERROR,
} from '../constants';

export const search = searchterm => ({
  type: SEARCH,
  payload: {
    searchterm,
  },
});

export const searchRequesting = (searchterm, page) => ({
  type: SEARCH_REQUESTING,
  payload: {
    searchterm,
    page,
  },
});

export const searchRequestSuccess = data => ({
  type: SEARCH_REQUEST_SUCCESS,
  payload: {
    data,
  },
});

export const searchRequestError = error => ({
  type: SEARCH_REQUEST_ERROR,
  error,
});

