import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardTitle, CardText, CardImg } from 'reactstrap';
import Title from '../../../components/Typography/Title';
import Block from '../../../components/Block/Block';
import ButtonCrawl from './../../../components/Buttons/ButtonCrawl';
import { UserContext } from './../../../App';

const events = [
  {
    id: 1,
    name: 'Event 1 name',
    slug: 'event-1-name',
    description:
      'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
    eventStart: '28 March 2019 10:00 eventStart 1',
    eventEnd: '28 March 2019 17:00 eventEnd 1',
    organizer: 'user 1',
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
  },
  {
    id: 2,
    name: 'Event 2 name',
    slug: 'event-2-name',
    description:
      'event 2 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
    eventStart: '28 March 2019 10:00 eventStart 2',
    eventEnd: '28 March 2019 17:00 eventEnd 2',
    organizer: 'user 2',
    imageUrl:
      'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
    capacity: 8,
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
  },
  {
    id: 3,
    name: 'Event 3 name',
    slug: 'event-3-name',
    description:
      'event 3 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
    eventStart: '28 March 2019 10:00 eventStart 3',
    eventEnd: '28 March 2019 17:00 eventEnd 3',
    organizer: 'user 1',
    imageUrl:
      'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
    capacity: 15,
    attendees: [
      {
        firstName: 'pakata',
        lastName: 'goh',
        email: 'pakatagohlh@gmail.com',
        imageUrl: 'http://image.com',
      },
    ],
  },
  {
    id: 4,
    name: 'Event 4 name',
    slug: 'event-4-name',
    description:
      'event 4 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
    eventStart: '28 March 2019 10:00 eventStart 4',
    eventEnd: '28 March 2019 17:00 eventEnd 4',
    organizer: 'user 3',
    imageUrl:
      'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
    capacity: 20,
    attendees: [
      {
        firstName: 'nicholas',
        lastName: 'teng',
        email: 'nicholas@gmail.com',
        imageUrl: 'http://image.com',
      },
    ],
  },
  {
    id: 5,
    name: 'Event 5 name',
    slug: 'event-5-name',
    description:
      'event 5 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
    eventStart: '28 March 2019 10:00 eventStart 5',
    eventEnd: '28 March 2019 17:00 eventEnd 5',
    organizer: 'user 2',
    imageUrl:
      'https://images.unsplash.com/photo-1472457897821-70d3819a0e24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2098&q=80',
    capacity: 27,
    attendees: [
      {
        firstName: 'nicholas',
        lastName: 'teng',
        email: 'nicholas@gmail.com',
        imageUrl: 'http://image.com',
      },
    ],
  },
];

const EventsPage = props => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <Block container spacer={2}>
        <Title as="h1">Events</Title>
        <Row>
          {events.map(event => (
            <Col key={event.id} md={6} lg={4}>
              <Card className="bg-dark">
                <CardImg top width="100%" src={event.imageUrl} alt={event.name} />
                <CardBody>
                  <CardTitle>{event.name}</CardTitle>
                  <CardText>{event.description}</CardText>
                  {user ? (
                    <ButtonCrawl>Attend</ButtonCrawl>
                  ) : (
                    <Link to="/login">
                      <ButtonCrawl>Login to attend</ButtonCrawl>
                    </Link>
                  )}
                  <Link to={{ pathname: `/events/${event.slug}`, state: { eventId: event.id } }}>
                    <ButtonCrawl>Details</ButtonCrawl>
                  </Link>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Block>
    </main>
  );
};

export default EventsPage;
