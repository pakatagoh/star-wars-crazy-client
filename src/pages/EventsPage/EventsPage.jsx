import React from 'react';
import Title from './../../components/Typography/Title';
import Block from './../../components/Block/Block';
import { Row, Col } from 'reactstrap';

const events = [
  {
    name: 'Event 1 name',
    description:
      'event 1 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
    eventStart: '28 March 2019 10:00 eventStart 1',
    eventEnd: '28 March 2019 17:00 eventEnd 1',
    organizer: 'user 1',
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
    name: 'Event 2 name',
    description:
      'event 2 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
    eventStart: '28 March 2019 10:00 eventStart 2',
    eventEnd: '28 March 2019 17:00 eventEnd 2',
    organizer: 'user 2',
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
    name: 'Event 3 name',
    description:
      'event 3 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
    eventStart: '28 March 2019 10:00 eventStart 3',
    eventEnd: '28 March 2019 17:00 eventEnd 3',
    organizer: 'user 1',
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
    name: 'Event 4 name',
    description:
      'event 4 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
    eventStart: '28 March 2019 10:00 eventStart 4',
    eventEnd: '28 March 2019 17:00 eventEnd 4',
    organizer: 'user 3',
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
    name: 'Event 5 name',
    description:
      'event 5 description Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem officia, voluptate molestias obcaecati laudantium libero tempore voluptatem corrupti saepe. Dicta!',
    eventStart: '28 March 2019 10:00 eventStart 5',
    eventEnd: '28 March 2019 17:00 eventEnd 5',
    organizer: 'user 2',
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
  return (
    <main>
      <Block container spacer={2}>
        <Title as="h1">Events</Title>
      </Block>
      <Block container spacer={2}>
        <Row>
          {events.map(event => (
            <Col sm={6} md={3}>
              {event.name}
            </Col>
          ))}
        </Row>
      </Block>
    </main>
  );
};

export default EventsPage;
