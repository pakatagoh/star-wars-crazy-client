import React, { Component } from 'react';
import Routing from './pages/Routing';
import NavigationView from './components/Navigation/NavigationView';
import Block from './components/Block/Block';
import FooterView from './components/Footer/FooterView';

const navViewProps = {
  navBrand: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1280px-Star_Wars_Logo.svg.png',
    alt: 'star wars',
    to: '/',
  },
  navItemsLeft: [{ to: '/movies', text: 'Movies' }, { to: '/events', text: 'Events' }],
  navItemsRight: [{ to: '/login', text: 'Login' }, { to: '/signup', text: 'Sign Up' }],
};

class App extends Component {
  render() {
    return (
      <>
        <header className="bg-dark">
          <Block container spacer={1} className="px-0">
            <NavigationView {...navViewProps} />
          </Block>
        </header>
        <Routing />
        <FooterView />
      </>
    );
  }
}

export default App;
