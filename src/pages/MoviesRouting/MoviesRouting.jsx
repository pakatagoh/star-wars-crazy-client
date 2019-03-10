import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MoviesPage from './MoviesPage/MoviesPage';
import MoviePage from './MoviePage/MoviePage';

const MoviesRouting = props => {
  return (
    <Switch>
      <Route exact path="/movies" component={MoviesPage} />
      <Route path="/movies/:slug" component={MoviePage} />
    </Switch>
  );
};

export default MoviesRouting;
