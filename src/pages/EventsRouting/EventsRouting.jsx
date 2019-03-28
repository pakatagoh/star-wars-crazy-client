import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EventsPage from './EventsPage/EventsPage';
import EventPage from './EventPage/EventPage';

const EventsRouting = props => {
  return (
    <Switch>
      <Route exact path="/events" component={EventsPage} />
      <Route path="/events/:slug" component={EventPage} />
    </Switch>
  );
};

export default EventsRouting;
