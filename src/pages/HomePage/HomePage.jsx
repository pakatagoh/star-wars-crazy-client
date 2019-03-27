import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Block from './../../components/Block/Block';
import Quiz from './../../components/Quiz/Quiz';
import RandomQuote from './../../components/RandomQuote/RandomQuote';
import Leaderboard from '../../components/Leaderboard/Leaderboard';

const HomePage = () => {
  return (
    <main data-testid="home-page">
      <Container>
        <Row>
          <Col md={3}>
            <Block spacer={2}>
              <Leaderboard />
            </Block>
          </Col>
          <Col md={9}>
            <Block spacer={2}>
              <Quiz />
            </Block>
            <Block spacer={2}>
              <RandomQuote />
            </Block>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default HomePage;
