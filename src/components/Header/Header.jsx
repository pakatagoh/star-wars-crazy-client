import React from 'react';
import Block from '../Block/Block';
import Navigation from './../Navigation/Navigation';

const navViewProps = {
  navBrand: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1280px-Star_Wars_Logo.svg.png',
    alt: 'star wars',
    to: '/',
  },
  navItemsLeft: [{ to: '/movies', text: 'Movies' }, { to: '/events', text: 'Events' }],
  navItemsRight: [{ to: '/login', text: 'Login' }, { to: '/signup', text: 'Sign Up' }],
};
const Header = () => {
  return (
    <header className="bg-dark">
      <Block container spacer={1} className="px-0">
        <Navigation {...navViewProps} />
      </Block>
    </header>
  );
};

export default Header;
