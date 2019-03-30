import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MyEventsPage from './MyEventsPage/MyEventsPage';

const MeRouting = props => {
  return (
    <Switch>
      <Route path="/me/events" component={MyEventsPage} />
    </Switch>
  );
};

export default MeRouting;
