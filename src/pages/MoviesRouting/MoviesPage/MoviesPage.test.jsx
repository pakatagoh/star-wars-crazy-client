import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Theme from '../../../theme/Theme';
import MoviesPage from './MoviesPage';

function renderWithRouter(ui, { route = '/movies', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(
      <Theme>
        <Router history={history}>{ui}</Router>
      </Theme>
    ),
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
