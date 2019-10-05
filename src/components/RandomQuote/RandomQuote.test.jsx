import React from 'react';
import { render, waitForElement, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RandomQuote from './RandomQuote';
import * as randomQuoteService from '../../services/randomQuotes/randomQuotesService';

describe('RandomQuote Container', () => {
  const sampleRandomQuote = {
    name: 'pakata',
    text: 'this is something lame',
    episode: '10',
  };
  beforeEach(() => {
    jest.spyOn(randomQuoteService, 'getQuote').mockImplementation(() => Promise.resolve(sampleRandomQuote));
  });

  afterEach(() => {
    randomQuoteService.getQuote.mockRestore();
  });

  test('should call getQuote service once', async () => {
    const { getByText } = render(<RandomQuote />);

    const element = await waitForElement(() => getByText(new RegExp(sampleRandomQuote.name, 'i')));
    expect(element).toBeInTheDocument();
    expect(randomQuoteService.getQuote.mock.calls.length).toEqual(1);
  });

  test('should display a random quote text, the quote author, and episode', async () => {
    const { getByText } = render(<RandomQuote />);

    await wait(() => [
      expect(getByText(new RegExp(sampleRandomQuote.name, 'i'))).toBeInTheDocument(),
      expect(getByText(sampleRandomQuote.text)).toBeInTheDocument(),
      expect(getByText(new RegExp(sampleRandomQuote.episode, 'i'))).toBeInTheDocument(),
    ]);
  });
});
