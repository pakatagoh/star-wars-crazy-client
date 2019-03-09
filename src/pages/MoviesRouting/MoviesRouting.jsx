import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MoviesPage from './MoviesPage/MoviesPage';
import MoviePage from './MoviePage/MoviePage';

const MoviesRouting = () => {
  return (
    <Switch>
      <Route exact path="/movies" component={MoviesPage} />
      <Route path="/movies/:id" render={props => <MoviePage {...props} />} />
    </Switch>
  );
};

export default MoviesRouting;
