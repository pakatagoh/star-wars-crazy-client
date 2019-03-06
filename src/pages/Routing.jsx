import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage/container/HomePage';

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
};

export default Routing;
