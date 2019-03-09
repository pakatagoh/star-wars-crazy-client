import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, wait } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import MoviesPage from './MoviesPage';

function renderWithRouter(ui, { route = '/movies', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('MoviesPage Component', () => {
  test('should display episode titles', () => {
    const { getByText } = renderWithRouter(<MoviesPage />);

    expect(getByText(/star wars episode 1/i)).toBeInTheDocument();
    expect(getByText(/star wars episode 2/i)).toBeInTheDocument();
    expect(getByText(/star wars episode 3/i)).toBeInTheDocument();
    expect(getByText(/star wars episode 4/i)).toBeInTheDocument();
    expect(getByText(/star wars episode 5/i)).toBeInTheDocument();
    expect(getByText(/star wars episode 6/i)).toBeInTheDocument();
    expect(getByText(/star wars episode 7/i)).toBeInTheDocument();
    expect(getByText(/star wars episode 8/i)).toBeInTheDocument();
  });

  test('should display episode posters', () => {
    const { getByAltText } = renderWithRouter(<MoviesPage />);

    expect(getByAltText(/star wars episode 1/i)).toBeInTheDocument();
    expect(getByAltText(/star wars episode 2/i)).toBeInTheDocument();
    expect(getByAltText(/star wars episode 3/i)).toBeInTheDocument();
    expect(getByAltText(/star wars episode 4/i)).toBeInTheDocument();
    expect(getByAltText(/star wars episode 5/i)).toBeInTheDocument();
    expect(getByAltText(/star wars episode 6/i)).toBeInTheDocument();
    expect(getByAltText(/star wars episode 7/i)).toBeInTheDocument();
    expect(getByAltText(/star wars episode 8/i)).toBeInTheDocument();
  });
});
