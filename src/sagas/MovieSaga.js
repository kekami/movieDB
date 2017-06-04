import { call, put, takeLatest } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';
import {
  MOVIES_REQUESTING,
  MOVIE_DETAILS_REQUESTING,
} from '../constants';

import {
  moviesRequestSuccess,
  moviesRequestError,
  movieDetailsRequestSuccess,
  movieDetailsRequestError,
} from '../actions/movies';

function handleRequest(request) {
  return request
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error; });
}

function movieRequestApi(type, page) {
  const url = `/api/movies/${type}?page=${page}`;
  const request = fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleRequest(request);
}

function* movieRequestFlow(action) {
  try {
    const { type, page } = action.payload;
    const movies = yield call(movieRequestApi, type, page);

    yield put(moviesRequestSuccess(movies));
  } catch (error) {
    yield put(moviesRequestError(error));
  }
}

function movieDetailsRequestApi(id) {
  const url = `/api/movie/${id}`;
  const request = fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return handleRequest(request);
}

function* movieDetailsRequestFlow(action) {
  try {
    const { id } = action.payload;
    const movieDetails = yield call(movieDetailsRequestApi, id);

    yield put(movieDetailsRequestSuccess(movieDetails));
  } catch (error) {
    yield put(movieDetailsRequestError(error));
  }
}

function* moviesWatcher() {
  yield [
    takeLatest(MOVIES_REQUESTING, movieRequestFlow),
    takeLatest(MOVIE_DETAILS_REQUESTING, movieDetailsRequestFlow),
  ];
}

export default moviesWatcher;
