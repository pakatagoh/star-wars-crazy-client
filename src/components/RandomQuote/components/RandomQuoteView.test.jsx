import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import RandomQuoteView from './RandomQuoteView';

describe('RandomQuoteView Component', () => {
  test('should display a random quote text, the quote author, and episode', () => {
    const sampleRandomQuote = {
      name: 'pakata',
      text: 'this is something lame',
      episode: '10',
    };

    const { getByText } = render(<RandomQuoteView randomQuote={sampleRandomQuote} />);

    expect(getByText(sampleRandomQuote.name)).toBeInTheDocument();
    expect(getByText(sampleRandomQuote.text)).toBeInTheDocument();
    expect(getByText(sampleRandomQuote.episode)).toBeInTheDocument();
  });
});
