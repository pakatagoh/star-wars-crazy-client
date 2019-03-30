import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Block from '../../../components/Block/Block';
import Title from '../../../components/Typography/Title';
import { UserContext } from './../../../App';
import { getUserEvents } from './../../../services/user/userService';
import Spinner from './../../../components/Spinner/Spinner';
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import ButtonCrawl from './../../../components/Buttons/ButtonCrawl';

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
        <Block container spacer={2}>
          {error ? (
            <Title as="h2">{error}</Title>
          ) : (
            <>
              <Title>Your Events</Title>
              <Block container spacer={2}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Row>
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
                              <Link to={`/events/${event.id}/edit`}>
                                <ButtonCrawl>Edit</ButtonCrawl>
                              </Link>
                            </StyledCardFooter>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                )}
              </Block>
            </>
          )}
        </Block>
      )}
    </main>
  );
};

export default MyEventsPage;
