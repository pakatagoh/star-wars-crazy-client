import React from 'react';
import { capitalize } from 'lodash';
import Title from './../../Typography/Title';
import Subtitle from '../../Typography/Subtitle';
import Overline from '../../Typography/Overline';

const RandomQuoteView = props => {
  const { randomQuote } = props;
  return (
    <div data-testid="random-quote-view">
      {randomQuote ? (
        <div className="row">
          <div className="col col-sm-auto">
            <Title as="h4">Random Quote</Title>
          </div>
          <div className="col-auto col-sm">
            <Title as="h3">{randomQuote.text}</Title>
            <div>
              <Subtitle>{capitalize(randomQuote.name.toLowerCase())}</Subtitle>
              <Overline>EPISODE {randomQuote.episode}</Overline>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomQuoteView;
