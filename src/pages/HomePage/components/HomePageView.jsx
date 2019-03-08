import React from 'react';
import NavigationView from '../../../components/Navigation/NavigationView';
import Quiz from './../../../components/Quiz/containers/Quiz';
import FooterView from './../../../components/Footer/FooterView';
import RandomQuote from './../../../components/RandomQuote/containers/RandomQuote';
import Block from './../../../components/Block/Block';
const HomePageView = props => {
  const { navViewProps } = props;
  return (
    <>
      <header>
        <NavigationView {...navViewProps} />
      </header>
      <main data-testid="home-page">
        <Block>
          <RandomQuote />
        </Block>
        <Quiz />
        <FooterView />
      </main>
    </>
  );
};

export default HomePageView;
