import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, wait } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';

import MoviePage from './MoviePage';

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('MoviePage Component', () => {
  test('should display sidebar nav of star wars episodes', () => {
    const { getByText } = renderWithRouter(<MoviePage />, { route: '/movies/episode-1' });

    expect(getByText(/episode 1/i)).toBeInTheDocument();
    expect(getByText(/episode 2/i)).toBeInTheDocument();
    expect(getByText(/episode 3/i)).toBeInTheDocument();
    expect(getByText(/episode 4/i)).toBeInTheDocument();
    expect(getByText(/episode 5/i)).toBeInTheDocument();
    expect(getByText(/episode 6/i)).toBeInTheDocument();
    expect(getByText(/episode 7/i)).toBeInTheDocument();
  });
});
