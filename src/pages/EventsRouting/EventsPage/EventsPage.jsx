import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { produce } from 'immer';
import styled from 'styled-components';
import { Row, Col, Card, CardBody, CardTitle, CardText, CardImg, CardFooter } from 'reactstrap';
import Title from '../../../components/Typography/Title';
import Block from '../../../components/Block/Block';
import ButtonCrawl from './../../../components/Buttons/ButtonCrawl';
import { UserContext } from './../../../App';
import { getEvents, updateEventAttendance } from '../../../services/event/eventService';
import Spinner from './../../../components/Spinner/Spinner';

const StyledCardFooter = styled(CardFooter)`
  &.bg-none {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const EventsPage = props => {
  const { user, isLoading: userLoading, updateUser } = useContext(UserContext);
  const [events, setEvents] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const addAttendanceAndOrganizer = events => {
    const eventsWithAttendenceAndOrganizer = events.map(event => {
      if (event.organizer.id === user.id) {
        event.isOrganizer = true;
      } else {
        event.isOrganizer = false;
      }

      if (event.attendees.length === 0) {
        event.isAttending = false;
        return event;
      }
      event.isAttending = event.attendees.some(attendee => attendee.id === user.id);

      return event;
    });
    setEvents(eventsWithAttendenceAndOrganizer);
  };

  const fetchEvents = async () => {
    try {
      const response = await getEvents();
      if (response.error) {
        console.error(response.error.message);
        setError(response.error);
        setIsLoading(false);
        return;
      }
      setError('');
      setEvents(response);
      if (user) {
        addAttendanceAndOrganizer(response);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleAttendance = async eventId => {
    try {
      const response = await updateEventAttendance(eventId);
      if (response.error) {
        console.error(response.error);
        setError(response.error.message);
        return;
      }
      const { updatedEvent, updatedUserEvents } = response;
      const eventsUpdater = produce(draft => {
        const foundIndex = draft.findIndex(event => event.id === updatedEvent.id);
        draft.splice(foundIndex, 1);
        if (updatedEvent.organizer.id === user.id) {
          updatedEvent.isOrganizer = true;
        } else {
          updatedEvent.isOrganizer = false;
        }
        if (updatedEvent.length === 0) updatedEvent.isAttending = false;
        updatedEvent.isAttending = updatedEvent.attendees.some(attendee => attendee.id === user.id);
        draft.push(updatedEvent);
      });
      setEvents(eventsUpdater);
      updateUser({ ...user, events: updatedUserEvents });
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!userLoading) {
      fetchEvents();
    }
  }, [userLoading]);

  return (
    <main>
      <Block container spacer={2}>
        <Title as="h1">Events</Title>
      </Block>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      ) : (
        <Block container spacer={2}>
          {error ? (
            <Title as="h2">{error}</Title>
          ) : (
            <>
              {events.length > 0 ? (
                <Row>
                  {events.map(event => (
                    <Col key={event.id} md={6} lg={4} className="mb-4">
                      <Card className="bg-dark h-100">
                        <CardImg
                          top
                          width="100%"
                          src={event.imageUrl}
                          alt={event.name}
                          onError={e => {
                            e.target.onerror = null;
                            e.target.src =
                              'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80';
                          }}
                        />
                        <CardBody className="d-flex flex-column justify-content-between">
                          <div>
                            <CardTitle className="font-weight-bold h3">{event.name}</CardTitle>
                            <CardText>{event.description}</CardText>
                          </div>
                          <StyledCardFooter className="bg-none mt-2">
                            {user && event.isOrganizer ? (
                              <Link to={`/events/${event.id}/edit`}>
                                <ButtonCrawl>Edit</ButtonCrawl>
                              </Link>
                            ) : user && !event.isAttending ? (
                              <ButtonCrawl onClick={() => handleAttendance(event.id)}>Attend</ButtonCrawl>
                            ) : user && event.isAttending ? (
                              <ButtonCrawl onClick={() => handleAttendance(event.id)}>Attending</ButtonCrawl>
                            ) : (
                              <Link to="/login">
                                <ButtonCrawl>Login to attend</ButtonCrawl>
                              </Link>
                            )}
                            <Link to={`/events/${event.id}`}>
                              <ButtonCrawl>Details</ButtonCrawl>
                            </Link>
                          </StyledCardFooter>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <Title as="h2">No events available</Title>
              )}
            </>
          )}
        </Block>
      )}
    </main>
  );
};

export default EventsPage;
