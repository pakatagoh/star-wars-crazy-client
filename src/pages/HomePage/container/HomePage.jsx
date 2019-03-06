import React from 'react';
import HomePageView from '../components/HomePageView';

const HomePage = () => {
  const navProps = {
    navBrand: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1280px-Star_Wars_Logo.svg.png',
      alt: 'star wars',
      to: '/',
    },
  };

  const homePageViewProps = {
    navProps,
  };

  return <HomePageView {...homePageViewProps} />;
};

export default HomePage;
