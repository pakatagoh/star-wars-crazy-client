import axios from 'axios';

const isDev = process.env.NODE_ENV !== 'production';

const getUrl = isDev => {
  return isDev ? 'http://localhost:8080' : 'https://api-starwarscrazy.herokuapp.com';
};
const baseURL = getUrl(isDev);

const movieApi = axios.create({
  baseURL,
});

export const getMovie = async imdbId => {
  const foundMovie = await movieApi.get(`/v1/movies/${imdbId}`);
  if (!foundMovie.data) {
    throw new Error('Something went wrong. Not able to get movies');
  }
  return foundMovie.data;
};
