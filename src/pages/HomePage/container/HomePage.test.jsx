import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, wait } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import HomePage from './HomePage';

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('HomePageView Component', () => {
  test('should display Navigation Bar on page', () => {
    const navigationTestId = 'navigation-bar';

    const { getByTestId } = renderWithRouter(<HomePage />);

    expect(getByTestId(navigationTestId)).toBeInTheDocument();
  });

  test('should display Quiz Form', () => {
    const quizTestId = 'quiz-view';
    const { getByTestId } = renderWithRouter(<HomePage />);

    expect(getByTestId(quizTestId)).toBeInTheDocument();
  });

  test('should display Footer Component', () => {
    const footerTestId = 'footer';

    const { getByTestId } = renderWithRouter(<HomePage />);

    expect(getByTestId(footerTestId)).toBeInTheDocument();
  });

  test('should display Random Quote View Component', async () => {
    const randomQuoteTestId = 'random-quote-view';

    const { getByTestId } = renderWithRouter(<HomePage />);

    await wait(() => {
      expect(getByTestId(randomQuoteTestId)).toBeInTheDocument();
    });
  });
});
