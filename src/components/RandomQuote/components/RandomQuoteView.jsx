import React from 'react';

const RandomQuoteView = props => {
  const { randomQuote } = props;
  return (
    <div data-testid="random-quote-view">
      {randomQuote ? (
        <>
          <p>{randomQuote.name}</p>
          <p>{randomQuote.text}</p>
          <p>{randomQuote.episode}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomQuoteView;
