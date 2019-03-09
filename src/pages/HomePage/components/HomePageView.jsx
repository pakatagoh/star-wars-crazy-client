import React from 'react';
import Quiz from './../../../components/Quiz/containers/Quiz';
import RandomQuote from './../../../components/RandomQuote/containers/RandomQuote';
import Block from './../../../components/Block/Block';

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
