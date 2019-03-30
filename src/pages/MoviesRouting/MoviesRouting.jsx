import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MoviesPage from './MoviesPage/MoviesPage';
import MoviePage from './MoviePage/MoviePage';
import PageNotFound from './../PageNotFound/PageNotFound';

const MoviesRouting = props => {
  return (
    <Switch>
      <Route exact path="/movies" component={MoviesPage} />
      <Route path="/movies/:slug" component={MoviePage} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default MoviesRouting;
