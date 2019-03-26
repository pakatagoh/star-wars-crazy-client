import axios from 'axios';

const isDev = process.env.NODE_ENV !== 'production';

const getUrl = isDev => {
  return isDev ? 'http://localhost:8080' : 'https://api-starwarscrazy.herokuapp.com';
};
const baseURL = getUrl(isDev);

const authApi = axios.create({
  baseURL,
  withCredentials: true,
});

export const signup = async data => {
  try {
    const response = await authApi.post('/v1/auth/signup', data);
    return response;
  } catch (error) {
    if (error.response) return error.response.data;
    return { error };
  }
};

export const logout = async () => {
  try {
    const response = await authApi.post('/v1/auth/logout');
    return response;
  } catch (error) {
    if (error.response) return error.response.data;
    return { error };
  }
};
