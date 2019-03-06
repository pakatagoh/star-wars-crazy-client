import React from 'react';
import NavigationView from '../../../components/Navigation/NavigationView';
import QuizView from './../../../components/Quiz/QuizView';
import FooterView from './../../../components/Footer/FooterView';
const HomePageView = props => {
  const { navProps } = props;
  return (
    <>
      <header>
        <NavigationView {...navProps} />
      </header>
      <main data-testid="home-page" className="container">
        <QuizView />
        <FooterView />
      </main>
    </>
  );
};

export default HomePageView;
