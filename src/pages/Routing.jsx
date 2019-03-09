import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage/container/HomePage';
import EventsPage from './EventsPage/EventsPage';
import LoginPage from './LoginPage/LoginPage';
import SignupPage from './SignupPage/SignupPage';
import MoviesRouting from './MoviesRouting/MoviesRouting';

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/movies" component={MoviesRouting} />
      <Route path="/events" component={EventsPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
    </Switch>
  );
};

export default Routing;
