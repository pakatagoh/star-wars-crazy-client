import React from 'react';
import HomePageView from '../components/HomePageView';

const HomePage = () => {
  const navViewProps = {
    navBrand: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1280px-Star_Wars_Logo.svg.png',
      alt: 'star wars',
      to: '/',
    },
    navItemsLeft: [{ to: '/movies', text: 'Movies' }, { to: '/events', text: 'Events' }],
    navItemsRight: [{ to: '/login', text: 'Login' }, { to: '/signup', text: 'Sign Up' }],
  };

  const homePageViewProps = {
    navViewProps,
  };

  return <HomePageView {...homePageViewProps} />;
};

export default HomePage;
