import React from 'react';
import { Redirect } from 'react-router-dom';

const MainPage = () => (
  <Redirect to="/movies/popular" />
);

export default MainPage;
