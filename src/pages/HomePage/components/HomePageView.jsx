import React from 'react';
import NavigationView from '../../../components/Navigation/NavigationView';
import QuizView from './../../../components/Quiz/QuizView';
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
        <QuizView />
        <FooterView />
      </main>
    </>
  );
};

export default HomePageView;
