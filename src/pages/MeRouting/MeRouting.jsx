import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MyEventsPage from './MyEventsPage/MyEventsPage';
import PageNotFound from './../PageNotFound/PageNotFound';

const MeRouting = props => {
  return (
    <Switch>
      <Route path="/me/events" component={MyEventsPage} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default MeRouting;
