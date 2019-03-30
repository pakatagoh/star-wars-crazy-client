import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import Title from './../../../components/Typography/Title';
import Block from '../../../components/Block/Block';
import Paragraph from './../../../components/Typography/Paragraph';
import Subtitle from './../../../components/Typography/Subtitle';
import { UserContext } from './../../../App';
import { getEvent, updateEventAttendance } from '../../../services/event/eventService';
import Spinner from './../../../components/Spinner/Spinner';
import ButtonCrawl from '../../../components/Buttons/ButtonCrawl';
import { Link } from 'react-router-dom';

const StyledImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const StyledAvatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50% 50%;
  object-fit: cover;
  object-position: center;
`;

const EventPage = props => {
  const { id } = props.match.params;
  const [isLoading, setIsLoading] = useState(true);
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [isAttending, setIsAttending] = useState(false);
  const { user, updateUser, isLoading: userLoading } = useContext(UserContext);

  const getAttendance = attendees => {
    if (!user) return false;
    if (attendees.length === 0) return false;
    return attendees.some(attendee => attendee.id === user.id);
  };

  const fetchEvent = async () => {
    try {
      const response = await getEvent(id);
      if (response.error) {
        console.error(response.error.message);
        setError('Something went wrong, unable to load event');
        setIsLoading(false);
        return;
      }
      setError('');
      setEvent(response);
      getAttendance(response.attendees);

      const attending = getAttendance(response.attendees);
      setIsAttending(attending);
      setIsLoading(false);
      return;
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleAttendance = async () => {
    try {
      const response = await updateEventAttendance(id);
      if (response.error) {
        console.error(response.error);
        setError(response.error.message);
        return;
      }
      const { updatedEvent, updatedUserEvents } = response;
      setEvent(updatedEvent);
      updateUser({ ...user, events: updatedUserEvents });
      setIsAttending(!isAttending);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!userLoading) {
      fetchEvent();
    }
  }, [userLoading]);

  return (
    <main>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      ) : error ? (
        <Block container spacer={2}>
          <Title as="h2">{error}</Title>
        </Block>
      ) : (
        <>
          <Block container spacer={2}>
            <Row className="align-items-center">
              <Col sm={6} className="order-1 order-sm-0">
                <StyledImageWrapper>
                  <StyledImage
                    src={event.imageUrl}
                    alt={event.name}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80';
                    }}
                  />
                </StyledImageWrapper>
              </Col>
              <Col sm={6} className="order-0 order-sm-1">
                <Title as="h1" className="text-center">
                  {event.name}
                </Title>
              </Col>
            </Row>
          </Block>
          <Block container spacer={2}>
            <Row className="align-items-center mb-3">
              <Col xs={6}>
                {user && !isAttending ? (
                  <ButtonCrawl onClick={handleAttendance}>Attend</ButtonCrawl>
                ) : user && isAttending ? (
                  <ButtonCrawl onClick={handleAttendance}>Attending</ButtonCrawl>
                ) : (
                  <Link to="/login">
                    <ButtonCrawl>Login to attend</ButtonCrawl>
                  </Link>
                )}
              </Col>
              <Col xs={6}>
                <Subtitle as="h5">Organizer</Subtitle>
                <div className="d-flex">
                  <div className="mr-3">
                    <StyledAvatar src={event.organizer.imageUrl} alt={event.organizer.firstName} />
                  </div>
                  <div>
                    <p>{event.organizer.firstName}</p>
                    <a href={`mailto:${event.organizer.email}`}>Contact {event.organizer.firstName}</a>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <Title as="h4">About the Event</Title>
                <Paragraph>{event.description}</Paragraph>
              </Col>
              <Col sm={6}>
                <Title as="h4">Details</Title>
                <Subtitle as="h5">Starts</Subtitle>
                <p>{event.eventStart}</p>
                <Subtitle as="h5">Ends</Subtitle>
                <p>{event.eventEnd}</p>
              </Col>
            </Row>
          </Block>
        </>
      )}
    </main>
  );
};

export default EventPage;
