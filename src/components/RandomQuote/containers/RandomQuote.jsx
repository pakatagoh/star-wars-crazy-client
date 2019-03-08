import React, { useState, useEffect } from 'react';
import RandomQuoteView from '../components/RandomQuoteView';
import { getQuote } from './../../services/randomQuotes/randomQuotesService';

const RandomQuote = () => {
  const [quote, setQuote] = useState('');

  const handleQuote = async () => {
    try {
      const foundQuote = await getQuote();
      setQuote(foundQuote);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleQuote();
  }, []);

  return <RandomQuoteView randomQuote={quote} />;
};

export default RandomQuote;
