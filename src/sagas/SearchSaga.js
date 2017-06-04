import { call, put, takeLatest } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';
import {
  SEARCH_REQUESTING,
} from '../constants';

import {
  searchRequestSuccess,
  searchRequestError,
} from '../actions/search';

function handleRequest(request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error; });
}

function searchRequestApi(searchterm, page) {
  const url = '/api/movies/search';
  const request = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      searchterm,
      page,
    }),
  });

  return handleRequest(request);
}

function* searchRequestFlow(action) {
  try {
    const { searchterm, page } = action.payload;
    const movies = yield call(searchRequestApi, searchterm, page);

    yield put(searchRequestSuccess(movies));
  } catch (error) {
    yield put(searchRequestError(error));
  }
}

function* searchWatcher() {
  yield [
    takeLatest(SEARCH_REQUESTING, searchRequestFlow),
  ];
}

export default searchWatcher;
