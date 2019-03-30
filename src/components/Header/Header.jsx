import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Block from '../Block/Block';
import Navigation from './../Navigation/Navigation';
import { UserContext } from './../../App';
import { logout } from '../../services/auth/authService';

const Header = props => {
  const { history, location } = props;
  const { user, updateUser } = useContext(UserContext);

  const navViewProps = {
    navBrand: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1280px-Star_Wars_Logo.svg.png',
      alt: 'star wars',
      to: '/',
    },
    navItemsLeft: [{ to: '/movies', text: 'Movies' }, { to: '/events', text: 'Events' }],
    navItemsRight: [],
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.statusText === 'OK') {
        updateUser(null);
        localStorage.removeItem('user');
        history.push('/');
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  navViewProps.navItemsRight = [{ to: '/login', text: 'Login' }, { to: '/signup', text: 'Sign Up' }];

  if (user) {
    navViewProps.navItemsRight = [{ to: '/me/events', text: 'Your Events' }, { type: 'button', text: 'Logout' }];
  }
  return (
    <header className="bg-dark">
      <Block container spacer={1} className="px-0">
        <Navigation {...navViewProps} handleLogout={handleLogout} />
      </Block>
    </header>
  );
};

export default withRouter(Header);
