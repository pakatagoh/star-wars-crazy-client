import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HomePage from './HomePage';

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('HomePageView Component', () => {
  test('should display Quiz Form', async () => {
    const quizTestId = 'quiz-view';
    const { getByTestId } = renderWithRouter(<HomePage />);

    await wait(() => {
      expect(getByTestId(quizTestId)).toBeInTheDocument();
    });
  });

  test('should display Random Quote View Component', async () => {
    const randomQuoteTestId = 'random-quote-view';

    const { getByTestId } = renderWithRouter(<HomePage />);

    await wait(() => {
      expect(getByTestId(randomQuoteTestId)).toBeInTheDocument();
    });
  });
});
