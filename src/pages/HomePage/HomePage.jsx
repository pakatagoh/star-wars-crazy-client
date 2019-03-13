import React from 'react';
import Block from './../../components/Block/Block';
import Quiz from './../../components/Quiz/Quiz';
import RandomQuote from './../../components/RandomQuote/RandomQuote';

const HomePage = () => {
  return (
    <main data-testid="home-page">
      <Block container spacer={2}>
        <Quiz />
      </Block>
      <Block container spacer={2}>
        <RandomQuote />
      </Block>
    </main>
  );
};

export default HomePage;
