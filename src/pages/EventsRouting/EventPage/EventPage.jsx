import React from 'react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import Title from './../../../components/Typography/Title';
import Block from '../../../components/Block/Block';
import Paragraph from './../../../components/Typography/Paragraph';
import Subtitle from './../../../components/Typography/Subtitle';

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
  const { eventId } = props.location.state;

  const event = {
    id: 1,
    name: 'Event 1 name',
    slug: 'event-1-name',
    description:
      'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
    eventStart: '28 March 2019 10:00 eventStart 1',
    eventEnd: '28 March 2019 17:00 eventEnd 1',
    organizer: {
      firstName: 'Pakata Goh',
      lastName: 'boy',
      email: 'organizerboy@gmail.com',
      imageUrl: 'https://avatars1.githubusercontent.com/u/37908805?s=460&v=4',
    },
    imageUrl:
      'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
    capacity: 10,
    attendees: [
      {
        firstName: 'pakata',
        lastName: 'goh',
        email: 'pakatagohlh@gmail.com',
        imageUrl: 'http://image.com',
      },
      {
        firstName: 'nicholas',
        lastName: 'teng',
        email: 'nicholas@gmail.com',
        imageUrl: 'http://image.com',
      },
    ],
  };
  const isAvailable = event.attendees.length < event.capacity ? 'Still Available' : 'Sold Out';
  return (
    <main>
      <Block container spacer={2}>
        <Row className="align-items-center">
          <Col sm={6} className="order-1 order-sm-0">
            <StyledImageWrapper>
              <StyledImage src={event.imageUrl} alt={event.name} />
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
        <div>
          <Title as="h4">About the Event</Title>
          <Paragraph>{event.description}</Paragraph>
        </div>
        <div>
          <Title as="h4">Details</Title>
          <Row>
            <Col sm={6} md={4}>
              <Subtitle as="h5">Starts</Subtitle>
              <p>{event.eventStart}</p>
              <Subtitle as="h5">Ends</Subtitle>
              <p>{event.eventEnd}</p>
            </Col>
            <Col sm={6} md={4}>
              <Subtitle as="h5">Capacity</Subtitle>
              <p>{event.capacity}</p>
              <Subtitle as="h5">Availability</Subtitle>
              <p>{isAvailable}</p>
            </Col>
            <Col md={4}>
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
        </div>
      </Block>
    </main>
  );
};

export default EventPage;
