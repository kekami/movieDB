import { call, put, takeLatest } from 'redux-saga/effects';
import { handleApiErrors } from '../lib/api-errors';
import {
  LIKE_REQUESTING,
  LIKE_REQUEST_SUCCESS,
  LIKE_REQUEST_ERROR,
  UNLIKE_REQUESTING,
  UNLIKE_REQUEST_SUCCESS,
  UNLIKE_REQUEST_ERROR,
} from '../constants';

import {
  setClient,
} from '../actions/client';

function likeApi(id, title) {
  return fetch(`/api/movie/${id}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token') || undefined,
    },
    body: JSON.stringify({ id, title }),
  })
    .then(handleApiErrors) // we'll make this in a second
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error; });
}

function* likeFlow(action) {
  try {
    const { id, title } = action;

    const currentUser = yield call(likeApi, id, title);

    yield put(setClient(currentUser));
    yield put({ type: LIKE_REQUEST_SUCCESS });
  } catch (error) {
    yield put({ type: LIKE_REQUEST_ERROR, error });
  }
}

function unlikeApi(id) {
  return fetch(`/api/movie/${id}/unlike`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token') || undefined,
    },
    body: JSON.stringify({ id }),
  })
    .then(handleApiErrors) // we'll make this in a second
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error; });
}

function* unlikeFlow(action) {
  try {
    const { id } = action;
    const currentUser = yield call(unlikeApi, id);

    yield put(setClient(currentUser));
    yield put({ type: UNLIKE_REQUEST_SUCCESS });
  } catch (error) {
    yield put({ type: UNLIKE_REQUEST_ERROR, error });
  }
}

function* likeWatcher() {
  yield [
    takeLatest(LIKE_REQUESTING, likeFlow),
    takeLatest(UNLIKE_REQUESTING, unlikeFlow),
  ];
}

export default likeWatcher;
