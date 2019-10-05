import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import Navigation from './Navigation';

const navigationViewProps = {
  navBrand: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1280px-Star_Wars_Logo.svg.png',
    alt: 'star wars',
    to: '/',
  },
  navItemsLeft: [{ to: '/movies', text: 'Movies' }, { to: '/events', text: 'Events' }],
  navItemsRight: [{ to: '/login', text: 'Login' }, { to: '/signup', text: 'Sign Up' }],
};

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Navigation Component', () => {
  test('should display logo', () => {
    const { getByAltText } = renderWithRouter(<Navigation {...navigationViewProps} />);

    expect(getByAltText(/star wars/i)).toBeInTheDocument();
  });

  test('should display left navigation links', () => {
    const { getByText } = renderWithRouter(<Navigation {...navigationViewProps} />);

    expect(getByText(navigationViewProps.navItemsLeft[0].text)).toBeInTheDocument();
    expect(getByText(navigationViewProps.navItemsLeft[1].text)).toBeInTheDocument();
  });

  test('should display navigation links in the hambuger button', () => {
    const { getByText } = renderWithRouter(<Navigation {...navigationViewProps} />);

    expect(getByText(navigationViewProps.navItemsRight[0].text)).toBeInTheDocument();
    expect(getByText(navigationViewProps.navItemsRight[1].text)).toBeInTheDocument();
  });
});
