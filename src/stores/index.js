import 'babel-polyfill';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer as form } from 'redux-form';
import { client, signup, login, movie, search, like } from '../reducers';
import { SignupSaga, LoginSaga, MovieSaga, SearchSaga, LikeSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();

let store;

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

function* IndexSaga() {
  yield [
    SignupSaga(),
    LoginSaga(),
    MovieSaga(),
    SearchSaga(),
    LikeSaga(),
  ];
}

export default {
  configureStore: () => {
    const reducers = combineReducers({
      signup,
      client,
      login,
      form,
      movie,
      search,
      like,
    });

    store = createStore(
      reducers,
      composeSetup(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(IndexSaga);

    return store;
  },

  currentStore: () => store,
};
