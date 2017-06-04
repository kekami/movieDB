import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from '../containers/MainPage';
import Movies from '../containers/Movies';
import Movie from '../containers/Movie';
import SearchResults from '../containers/SearchResults';
import Login from '../presentation/Login';
import Signup from '../presentation/Signup';
import Favorites from '../containers/Favorites';

const Main = () => (
  <div style={{ width: '100%', minHeight: '100vh' }}>
    <Route exact path="/" component={MainPage} />
    <Route path="/movies/popular" component={Movies} />
    <Route path="/movies/toprated" component={Movies} />
    <Route path="/movies/upcoming" component={Movies} />
    <Route path="/movies/search/:searchterm" component={SearchResults} />
    <Route path="/movie/:id" component={Movie} />
    <Route path="/Login" component={Login} />
    <Route path="/Signup" component={Signup} />
    <Route path="/favorites" component={Favorites} />
  </div>
);

export default Main;
