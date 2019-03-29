import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Card, CardBody, CardTitle, CardText, CardImg, CardFooter } from 'reactstrap';
import Title from '../../../components/Typography/Title';
import Block from '../../../components/Block/Block';
import ButtonCrawl from './../../../components/Buttons/ButtonCrawl';
import { UserContext } from './../../../App';
import { getEvents } from '../../../services/event/eventService';
import Spinner from './../../../components/Spinner/Spinner';

const StyledCardFooter = styled(CardFooter)`
  &.bg-none {
    background-color: rgba(0, 0, 0, 0);
  }
`;

const EventsPage = props => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main>
      <Block container spacer={2}>
        <Row className="align-items-center mb-3">
          <Col sm={6}>
            <Title as="h1">Events</Title>
          </Col>
          {user && !error && (
            <Col sm={6} className="d-flex justify-content-sm-end">
              <Link to="/events/new">
                <ButtonCrawl>Create Event</ButtonCrawl>
              </Link>
            </Col>
          )}
        </Row>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        ) : (
          <Row>
            {error ? (
              <Title as="h2">{error}</Title>
            ) : (
              <>
                {events.map(event => (
                  <Col key={event.id} md={6} lg={4} className="mb-4">
                    <Card className="bg-dark h-100">
                      <CardImg top width="100%" src={event.imageUrl} alt={event.name} />
                      <CardBody className="d-flex flex-column justify-content-between">
                        <div>
                          <CardTitle>{event.name}</CardTitle>
                          <CardText>{event.description}</CardText>
                        </div>
                        <StyledCardFooter className="bg-none mt-2">
                          {user ? (
                            <ButtonCrawl>Attend</ButtonCrawl>
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
              </>
            )}
          </Row>
        )}
      </Block>
    </main>
  );
};

export default EventsPage;
