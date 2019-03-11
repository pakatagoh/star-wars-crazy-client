import React from 'react';
import RandomQuote from './../../../components/RandomQuote/containers/RandomQuote';
import Block from './../../../components/Block/Block';
import Quiz from './../../../components/Quiz/Quiz';

const HomePageView = props => {
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

export default HomePageView;
