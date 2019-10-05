import React, { useState, useEffect } from 'react';
import { capitalize } from 'lodash';
import Title from '../Typography/Title';
import Subtitle from '../Typography/Subtitle';
import Overline from '../Typography/Overline';
import { getQuote } from '../../services/randomQuotes/randomQuotesService';

const RandomQuote = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const handleQuote = async () => {
      try {
        const foundQuote = await getQuote();
        setQuote(foundQuote);
      } catch (error) {
        console.error(error);
      }
    };
    handleQuote();
  }, []);

  return (
    <div data-testid="random-quote-view">
      {quote ? (
        <div className="row">
          <div className="col col-sm-auto">
            <Title as="h4">Random Quote</Title>
          </div>
          <div className="col-auto col-sm">
            <Title as="h3">{quote.text}</Title>
            <div>
              <Subtitle>{capitalize(quote.name.toLowerCase())}</Subtitle>
              <Overline>EPISODE {quote.episode}</Overline>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RandomQuote;
