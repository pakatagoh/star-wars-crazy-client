import axios from 'axios';

const isDev = process.env.NODE_ENV !== 'production';

const getUrl = isDev => {
  return isDev ? 'http://localhost:8080' : 'https://api-starwarscrazy.herokuapp.com';
};
const baseURL = getUrl(isDev);

const scoreApi = axios.create({
  baseURL,
  withCredentials: true,
});

export const saveUserScore = async score => {
  try {
    const response = await scoreApi.post('/v1/scores/', { score });
    return response;
  } catch (error) {
    if (error.response) return error.response.data;
    return { error };
  }
};
