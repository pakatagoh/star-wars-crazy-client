import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import produce from 'immer';
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';
import Block from '../../../components/Block/Block';
import Title from '../../../components/Typography/Title';
import Spinner from './../../../components/Spinner/Spinner';
import ButtonCrawl from './../../../components/Buttons/ButtonCrawl';
import { getUserEvents } from './../../../services/user/userService';
import { UserContext } from './../../../App';
import { deleteEvent } from '../../../services/event/eventService';
import ButtonYellow from './../../../components/Buttons/ButtonYellow';

const StyledCardFooter = styled(CardFooter)`
  &.bg-none {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const MyEventsPage = props => {
  const { history } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState('');
  const { user, isLoading: isUserLoading } = useContext(UserContext);
  const [deleteError, setDeleteError] = useState('');
  const [error, setError] = useState('');

  const fetchUserEvents = async () => {
    const response = await getUserEvents();
    if (response.error) {
      console.error(response.error.message);
      setError(response.error);
      setIsLoading(false);
      return;
    }
    setError('');
    setEvents(response);
    setIsLoading(false);
  };

  const handleDelete = async id => {
    const response = await deleteEvent(id);
    if (response.error) {
      console.error(response.error.message || response.error);
      setDeleteError('Something went wrong when deleting, please try again');
      return;
    }
    setDeleteError('');
    const eventsUpdater = produce(draft => {
      const foundIndex = events.findIndex(event => event.id === id);
      draft.splice(foundIndex, 1);
    });
    setEvents(eventsUpdater);
  };

  useEffect(() => {
    if (!isUserLoading && !user) {
      history.push('/login');
    }
    if (!isUserLoading && user) {
      fetchUserEvents();
    }
  }, [isUserLoading]);

  return (
    <main>
      {isUserLoading ? (
        <Block container spacer={2}>
          <Spinner />
        </Block>
      ) : (
        <>
          {error ? (
            <Block container spacer={2}>
              <Title as="h2">{error}</Title>
            </Block>
          ) : (
            <Block container spacer={2}>
              {isLoading ? (
                <Spinner />
              ) : (
                <>
                  {events.length > 0 ? (
                    <>
                      <Row>
                        <Col sm={6}>
                          <Title>Your Events</Title>
                        </Col>
                        <Col sm={6} className="d-flex justify-content-sm-end mb-4 mb-sm-0">
                          <Link to="/events/new">
                            <ButtonYellow>Create Event</ButtonYellow>
                          </Link>
                        </Col>
                      </Row>
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
                                <StyledCardFooter className="bg-none mt-2 d-flex justify-content-between pl-0 pr-0">
                                  <Link to={`/events/${event.id}/edit`}>
                                    <ButtonCrawl>Edit</ButtonCrawl>
                                  </Link>
                                  <ButtonYellow onClick={() => handleDelete(event.id)}>Delete</ButtonYellow>
                                  {deleteError && <p>{deleteError}</p>}
                                </StyledCardFooter>
                              </CardBody>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </>
                  ) : (
                    <>
                      <Title>You have no events</Title>
                      <Link to="/events/new">
                        <ButtonYellow>Create Event</ButtonYellow>
                      </Link>
                    </>
                  )}
                </>
              )}
            </Block>
          )}
        </>
      )}
    </main>
  );
};

export default MyEventsPage;
