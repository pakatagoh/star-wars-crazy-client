import React from 'react';
import NavigationView from '../Navigation/NavigationView';
import Block from '../Block/Block';

const navViewProps = {
  navBrand: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1280px-Star_Wars_Logo.svg.png',
    alt: 'star wars',
    to: '/',
  },
  navItemsLeft: [{ to: '/movies', text: 'Movies' }, { to: '/events', text: 'Events' }],
  navItemsRight: [{ to: '/login', text: 'Login' }, { to: '/signup', text: 'Sign Up' }],
};
const HeaderView = () => {
  return (
    <header className="bg-dark">
      <Block container spacer={1} className="px-0">
        <NavigationView {...navViewProps} />
      </Block>
    </header>
  );
};

export default HeaderView;
