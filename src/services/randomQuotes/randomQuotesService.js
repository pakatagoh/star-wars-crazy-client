import { quotes } from './randomQuotes';

export const getQuote = () => {
  const randomNumber = Math.floor(Math.random() * quotes.length);
  return Promise.resolve(quotes[randomNumber]);
};
