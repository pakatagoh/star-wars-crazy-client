import React from 'react';

const RandomQuoteView = props => {
  const { randomQuote } = props;
  return <div data-testid="random-quote-view">{randomQuote && randomQuote}</div>;
};

export default RandomQuoteView;
