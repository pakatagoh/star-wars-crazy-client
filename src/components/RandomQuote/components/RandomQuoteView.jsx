import React from 'react';
import Title from './../../Typography/Title';

const RandomQuoteView = props => {
  const { randomQuote } = props;
  return (
    <div data-testid="random-quote-view">
      {randomQuote ? (
        <>
          <Title as="h3">{randomQuote.name}</Title>
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
