import React from 'react';
import {
  Router,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import history from './history';
import store from './stores';
import Home from './components/layouts/Home';
import './styles/App.scss';

const App = () => (
  <Provider store={store.configureStore()}>
    <Router history={history}>
      <Route to="/" component={Home} />
    </Router>
  </Provider>
);

export default App;
