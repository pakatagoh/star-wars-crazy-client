import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EventsPage from './EventsPage/EventsPage';
import EventPage from './EventPage/EventPage';
import EventPageNew from './EventPageNew/EventPageNew';
import EventPageEdit from './EventPageEdit/EventPageEdit';
import PageNotFound from './../PageNotFound/PageNotFound';

const EventsRouting = props => {
  return (
    <Switch>
      <Route path="/events/new" component={EventPageNew} />
      <Route path="/events/:id/edit" component={EventPageEdit} />
      <Route path="/events/:id" component={EventPage} />
      <Route exact path="/events" component={EventsPage} />
      <Route component={PageNotFound} />
    </Switch>
  );
};

export default EventsRouting;
