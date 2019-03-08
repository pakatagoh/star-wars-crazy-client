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
      <header className="bg-dark">
        <Block container spacer={1} className="px-0">
          <NavigationView {...navViewProps} />
        </Block>
      </header>
      <main data-testid="home-page">
        <Block container spacer={2}>
          <RandomQuote />
        </Block>
        <Block container>
          <Quiz />
        </Block>
        <FooterView />
      </main>
    </>
  );
};

export default HomePageView;
