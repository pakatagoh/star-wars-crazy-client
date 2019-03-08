import React from 'react';
import NavigationView from '../../../components/Navigation/NavigationView';
import Quiz from './../../../components/Quiz/containers/Quiz';
import FooterView from './../../../components/Footer/FooterView';
import RandomQuote from './../../../components/RandomQuote/containers/RandomQuote';
const HomePageView = props => {
  const { navProps } = props;
  return (
    <>
      <header>
        <NavigationView {...navProps} />
      </header>
      <main data-testid="home-page" className="container">
        <RandomQuote />
        <Quiz />
        <FooterView />
      </main>
    </>
  );
};

export default HomePageView;
