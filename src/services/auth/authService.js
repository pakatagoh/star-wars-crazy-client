import axios from 'axios';

const isDev = process.env.NODE_ENV !== 'production';

const getUrl = isDev => {
  return isDev ? 'http://localhost:8080' : 'https://api-starwarscrazy.herokuapp.com';
};
const baseURL = getUrl(isDev);

const authApi = axios.create({
  baseURL,
});

export const signup = async data => {
  const response = await authApi.post('/v1/auth/signup', data);

  if (response && response.data) {
    return {
      data: response.data,
    };
  }

  throw new Error('Something went wrong during signup with server');
};
