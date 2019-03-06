import React from 'react';
import { render, wait } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import HomePageView from './HomePageView';

const navProps = {
  navBrand: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1280px-Star_Wars_Logo.svg.png',
    alt: 'star wars',
    to: '/',
  },
};

const sampleProps = {
  navProps,
};

describe('HomePageView Component', () => {
  test('should display Navigation Bar on page', () => {
    const navigationTestId = 'navigation-bar';

    const { getByTestId } = render(<HomePageView {...sampleProps} />);

    expect(getByTestId(navigationTestId)).toBeInTheDocument();
  });

  test('should display Quiz Form', () => {
    const quizTestId = 'quiz-view';
    const { getByTestId } = render(<HomePageView {...sampleProps} />);

    expect(getByTestId(quizTestId)).toBeInTheDocument();
  });

  test('should display Footer Component', () => {
    const footerTestId = 'footer';

    const { getByTestId } = render(<HomePageView {...sampleProps} />);

    expect(getByTestId(footerTestId)).toBeInTheDocument();
  });

  test('should display Random Quote View Component', async () => {
    const randomQuoteTestId = 'random-quote-view';

    const { getByTestId } = render(<HomePageView {...sampleProps} />);

    await wait(() => {
      expect(getByTestId(randomQuoteTestId)).toBeInTheDocument();
    });
  });
});
