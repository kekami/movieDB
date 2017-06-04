import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';

import history from '../history';

// Helper for api errors
import { handleApiErrors } from '../lib/api-errors';

import {
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLIENT_UNSET,
} from '../constants';

import {
  setClient,
  unsetClient,
} from '../actions/client';

const loginUrl = '/api/account/login';

function loginApi(email, password) {
  return fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .then(json => json)
    .catch((error) => { throw error; });
}

function* logout() {
  yield put(unsetClient());
  localStorage.removeItem('token');
  history.push('/login');
}

function* loginFlow(email, password) {
  let currentUser;
  try {
    currentUser = yield call(loginApi, email, password);

    yield put(setClient(currentUser));
    yield put({ type: LOGIN_SUCCESS });

    localStorage.setItem('token', currentUser.token);
    history.push('/');
  } catch (error) {
    yield put({ type: LOGIN_ERROR, error });
  } finally {
    if (yield cancelled()) {
      history.push('/login');
    }
  }
}

function* loginWatcher() {
  while (true) {
    const { email, password } = yield take(LOGIN_REQUESTING);

    const task = yield fork(loginFlow, email, password);
    const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);

    if (action.type === CLIENT_UNSET) yield cancel(task);
    yield call(logout);
  }
}

export default loginWatcher;
